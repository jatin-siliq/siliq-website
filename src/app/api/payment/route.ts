import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { rateLimit, getClientIp, MAX_BODY_SIZE } from "@/lib/rate-limit";

const KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY || "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

// Create a Razorpay order server-side (prevents client-side amount tampering)
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`payment:${ip}`, 5, 60000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many payment attempts" }, { status: 429 });
  }
  const contentLength = parseInt(req.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }
  const { action, amount, orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  if (action === "create") {
    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify({ amount, currency: "INR", receipt: orderId || `rcpt_${Date.now()}` }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    const order = await res.json();
    return NextResponse.json({ order_id: order.id, amount: order.amount });
  }

  if (action === "verify") {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing verification params" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return NextResponse.json({ verified: true });
    }

    return NextResponse.json({ verified: false, error: "Invalid signature" }, { status: 400 });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
