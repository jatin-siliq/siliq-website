import { NextRequest, NextResponse } from "next/server";

// Global in-memory store for middleware rate limiting
const globalHits = new Map<string, { count: number; resetAt: number }>();

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
}

function globalRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 100; // 100 requests per minute per IP across ALL routes

  const entry = globalHits.get(ip);
  if (!entry || now > entry.resetAt) {
    globalHits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;

}

// Cleanup every 5 min
let lastClean = Date.now();
function cleanupGlobal() {
  const now = Date.now();
  if (now - lastClean < 300000) return;
  lastClean = now;
  for (const [key, entry] of globalHits) {
    if (now > entry.resetAt) globalHits.delete(key);
  }
  if (globalHits.size > 50000) globalHits.clear();
}

export function middleware(req: NextRequest) {
  cleanupGlobal();

  const ip = getIp(req);

  // Global rate limit: 100 req/min per IP
  if (!globalRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // Block oversized request bodies (>500KB) — prevents payload bombs
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 512000) {
    return NextResponse.json(
      { error: "Request too large" },
      { status: 413 }
    );
  }

  // Block suspicious user agents (common bot/scanner patterns)
  const ua = req.headers.get("user-agent") || "";
  const blockedBots = /sqlmap|nikto|masscan|ZmEu|nmap|dirbuster|gobuster|nuclei|wpscan/i;
  if (blockedBots.test(ua)) {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}

// Apply to API routes and pages
export const config = {
  matcher: ["/api/:path*"],
};
