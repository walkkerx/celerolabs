import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isStrongPassword, isStrongSecret, isPostgresUrl } from "@/lib/env";

export async function GET() {
  // ── Database check ──
  let databaseStatus: "connected" | "error" = "error";
  try {
    await db.subscriber.count();
    databaseStatus = "connected";
  } catch {
    databaseStatus = "error";
  }

  // ── Environment checks (boolean only — no values exposed) ──
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;
  const databaseUrl = process.env.DATABASE_URL;

  const adminPasswordValid = adminPassword
    ? isStrongPassword(adminPassword).valid
    : false;

  const adminSecretValid = adminSecret
    ? isStrongSecret(adminSecret).valid
    : false;

  const databaseValid = databaseUrl
    ? isPostgresUrl(databaseUrl)
    : false;

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: databaseStatus,
    checks: {
      adminPassword: adminPasswordValid,
      adminSecret: adminSecretValid,
      database: databaseValid,
    },
  });
}
