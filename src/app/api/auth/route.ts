import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp, MAX_BODY_SIZE } from "@/lib/rate-limit";

const API = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "";

// Simple hash function (SHA-256) for passwords
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + (process.env.AUTH_SALT || ""));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`auth:${ip}`, 10, 60000); // 10 attempts per minute
  if (!allowed) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }
  const contentLength = parseInt(req.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }
  const { action, email, password, name } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);

  if (action === "signup") {
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    // Create customer on backend
    const res = await fetch(`${API}/api/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, hashedPassword }),
    });
    if (!res.ok) return NextResponse.json({ error: "Account creation failed" }, { status: 400 });
    const data = await res.json();

    return NextResponse.json({ success: true, customer: data.customer });
  }

  if (action === "login") {
    // Fetch customer and verify password hash
    const res = await fetch(`${API}/api/customers/${encodeURIComponent(email)}`);
    if (!res.ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const { found, customer } = await res.json();
    if (!found) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // Verify hash (stored on backend) or fallback for legacy accounts
    if (customer.hashedPassword && customer.hashedPassword !== hashedPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ success: true, customer });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
