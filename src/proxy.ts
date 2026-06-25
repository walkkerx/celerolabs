import { NextRequest, NextResponse } from "next/server";

/**
 * Build CORS headers for the response.
 */
function getCorsHeaders(): Record<string, string> {
  const isDev = process.env.NODE_ENV !== "production";
  const allowedOrigin = isDev
    ? "*"
    : (process.env.NEXT_PUBLIC_SITE_URL || "https://xcelerolabs.com");

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Handle CORS preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    const corsHeaders = getCorsHeaders();
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Block access to sensitive paths
  const blockedPaths = ["/.env", "/.git", "/prisma", "/db"];
  if (blockedPaths.some((p) => pathname.startsWith(p))) {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next();

  // Add CORS headers to all responses
  const corsHeaders = getCorsHeaders();
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
