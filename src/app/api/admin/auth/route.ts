import { NextRequest, NextResponse } from "next/server";
import { getAdminSecret, checkRateLimit, getClientIp, isValidInput } from "@/lib/auth";
import { isStrongPassword } from "@/lib/env";

// ─── Rate Limiting (in-memory, per-IP) ───
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// ─── Token Generation using Web Crypto API ───
async function generateToken(): Promise<string> {
  const secret = getAdminSecret();
  const timestamp = Date.now();

  // Use crypto.getRandomValues for the random part (not Math.random)
  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);
  const randomPart = Array.from(randomBytes)
    .map((b) => b.toString(36))
    .join("")
    .substring(0, 12);

  const data = `${secret}:${timestamp}:${randomPart}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // Token format: timestamp.randomPart.hash
  return `${timestamp}.${randomPart}.${hashHex}`;
}

/**
 * Constant-time string comparison to prevent timing attacks.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still do a comparison to keep timing consistent
    const dummy = a.length ^ b.length;
    return dummy === 0 && a === b;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(ip, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later.", retryAfter: Math.ceil((rateCheck.retryAfterMs || 0) / 1000) },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Input validation
    if (!isValidInput(password, 256)) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD env variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Use constant-time comparison to prevent timing attacks
    if (!timingSafeEqual(password, adminPassword)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // In production, warn if the configured ADMIN_PASSWORD is weak
    if (process.env.NODE_ENV === "production") {
      const strengthCheck = isStrongPassword(adminPassword);
      if (!strengthCheck.valid) {
        console.warn(
          "[auth] WARNING: ADMIN_PASSWORD is weak in production. Issues: %s",
          strengthCheck.issues.join("; ")
        );
      }
    }

    const token = await generateToken();

    return NextResponse.json({
      token,
      message: "Authenticated successfully",
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("ADMIN_SECRET")) {
      console.error("Security config error:", error.message);
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Verify a token (uses shared verifyAdminAuth from lib/auth.ts internally)
export async function GET(req: NextRequest) {
  try {
    const { verifyAdminAuth } = await import("@/lib/auth");
    const isValid = await verifyAdminAuth(req);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
