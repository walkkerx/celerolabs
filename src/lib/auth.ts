import { NextRequest } from "next/server";

/**
 * Shared admin token verification.
 * No fallback secret — if ADMIN_SECRET is not set, all tokens are rejected.
 */
export async function verifyAdminAuth(req: NextRequest): Promise<boolean> {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) return false;

    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [timestampStr, randomPart, hashHex] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Check if token is expired (24 hours)
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000;
    if (now - timestamp > maxAge) return false;

    // Recompute hash — MUST use env var, no fallback
    const secret = process.env.ADMIN_SECRET;
    if (!secret) return false;

    const data = `${secret}:${timestampStr}:${randomPart}`;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const recomputedHash = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return recomputedHash === hashHex;
  } catch {
    return false;
  }
}

/**
 * Get the ADMIN_SECRET, throwing if not configured.
 * Use this when generating tokens — ensures the secret exists at token-creation time.
 */
export function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SECRET environment variable is not set. Refusing to proceed with fallback."
    );
  }
  return secret;
}

/**
 * In-memory rate limiter for API endpoints.
 * Suitable for single-instance deployments.
 */
const rateLimitMap = new Map<
  string,
  { count: number; lastAttempt: number }
>();

// Counter for periodic cleanup (avoids running on every request)
let rateLimitCheckCount = 0;

/**
 * Remove stale rate limit entries whose window has expired beyond
 * twice the normal window length. Called every 50th check.
 */
function cleanupRateLimitMap(windowMs: number): void {
  const now = Date.now();
  const maxAge = windowMs * 2;
  for (const [key, entry] of rateLimitMap) {
    if (now - entry.lastAttempt > maxAge) {
      rateLimitMap.delete(key);
    }
  }
}

export function checkRateLimit(
  ip: string,
  maxAttempts: number = 10,
  windowMs: number = 60 * 1000
): { allowed: boolean; retryAfterMs?: number } {
  // Periodic cleanup: every 50th check
  rateLimitCheckCount += 1;
  if (rateLimitCheckCount % 50 === 0) {
    cleanupRateLimitMap(windowMs);
  }

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true };
  }

  // Reset window if expired
  if (now - entry.lastAttempt > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true };
  }

  if (entry.count >= maxAttempts) {
    const retryAfterMs = windowMs - (now - entry.lastAttempt);
    return { allowed: false, retryAfterMs };
  }

  entry.count += 1;
  entry.lastAttempt = now;
  return { allowed: true };
}

/**
 * Extract client IP from request headers.
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Input length validation helper.
 * Returns true if the value is a valid string within length bounds.
 */
export function isValidInput(
  value: unknown,
  maxLength: number = 1000,
  minLength: number = 0
): value is string {
  return (
    typeof value === "string" &&
    value.length >= minLength &&
    value.length <= maxLength
  );
}
