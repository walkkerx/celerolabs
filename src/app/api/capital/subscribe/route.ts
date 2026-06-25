import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isValidInput } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, consent, source } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Input length validation
    if (!isValidInput(email, 320)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (firstName && !isValidInput(firstName, 200)) {
      return NextResponse.json({ error: "Invalid first name" }, { status: 400 });
    }
    if (lastName && !isValidInput(lastName, 200)) {
      return NextResponse.json({ error: "Invalid last name" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Require consent
    if (!consent) {
      return NextResponse.json(
        { error: "Consent is required" },
        { status: 400 }
      );
    }

    // Upsert subscriber
    const subscriber = await db.subscriber.upsert({
      where: { email },
      update: {
        consent: true,
        source: source || "capital_page",
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
      },
      create: {
        email,
        consent: true,
        source: source || "capital_page",
        firstName: firstName || null,
        lastName: lastName || null,
      },
    });

    return NextResponse.json(
      {
        id: subscriber.id,
        message: "Subscribed successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint removed for security - subscriber data is only accessible via admin dashboard
export async function GET() {
  return NextResponse.json(
    { error: "This endpoint is not publicly accessible" },
    { status: 403 }
  );
}
