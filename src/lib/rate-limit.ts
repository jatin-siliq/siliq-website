// In-memory rate limiter with auto-cleanup to prevent memory leaks
const hits = new Map<string, { count: number; resetAt: number }>();

// Auto-cleanup expired entries every 5 minutes to prevent memory exhaustion
let lastCleanup = Date.now();
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 300000) return; // Only every 5 min
  lastCleanup = now;
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
  // Hard cap: if map grows too large, clear it (DDoS protection)
  if (hits.size > 10000) hits.clear();
}

export function rateLimit(key: string, maxRequests = 5, windowMs = 60000): { allowed: boolean; remaining: number } {
  cleanup();
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}

export function getClientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || headers.get("x-real-ip")
    || "unknown";
}

// Max request body size (100KB) — prevents large payload attacks
export const MAX_BODY_SIZE = 102400;
