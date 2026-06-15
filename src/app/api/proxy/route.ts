import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp, MAX_BODY_SIZE } from "@/lib/rate-limit";

const API = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "";

// Proxy sensitive backend calls through the server so the backend URL and endpoints aren't directly exposed
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed: notLimited } = rateLimit(`proxy:${ip}`, 30, 60000);
  if (!notLimited) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // Check body size
  const contentLength = parseInt(req.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  const { endpoint, method = "POST", body } = await req.json();

  // Whitelist allowed endpoints
  const allowedEndpoints = [
    "/api/orders",
    "/api/inventory/reduce",
    "/api/coupons/validate",
    "/api/customers",
    "/api/newsletter",
    "/api/contact",
    "/api/products",
  ];

  // Allow dynamic customer endpoints
  const isDynamicAllowed = /^\/api\/customers\/[^/]+\/(address|order|used-coupon|can-use-coupon)$/.test(endpoint)
    || /^\/api\/customers\/[^/]+\/address\/[^/]+$/.test(endpoint)
    || /^\/api\/customers\/[^/]+$/.test(endpoint)
    || /^\/api\/coupons\/use\/[^/]+$/.test(endpoint);

  if (!allowedEndpoints.includes(endpoint) && !isDynamicAllowed) {
    return NextResponse.json({ error: "Endpoint not allowed" }, { status: 403 });
  }

  // Special handling for contact form — forward to Web3Forms
  if (endpoint === "/api/contact") {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: process.env.WEB3FORMS_KEY, ...body }),
      });
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }
  }

  try {
    const fetchOptions: RequestInit = {
      method: method === "GET" ? "GET" : method,
      headers: { "Content-Type": "application/json" },
    };
    if (method !== "GET" && method !== "DELETE" && body) {
      fetchOptions.body = JSON.stringify(body);
    }
    const res = await fetch(`${API}${endpoint}`, fetchOptions);
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
