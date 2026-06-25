import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isValidInput } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { programSlug, firstName, lastName, email } = body;

    // Validate required fields
    if (!programSlug || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields: programSlug, firstName, lastName, email" },
        { status: 400 }
      );
    }

    // Input length validation
    if (!isValidInput(firstName, 200) || !isValidInput(lastName, 200)) {
      return NextResponse.json({ error: "Name fields must be 1-200 characters" }, { status: 400 });
    }
    if (!isValidInput(email, 320)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (body.phone && !isValidInput(body.phone, 50)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }
    if (body.linkedinUrl && !isValidInput(body.linkedinUrl, 2000)) {
      return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 });
    }
    if (body.location && !isValidInput(body.location, 200)) {
      return NextResponse.json({ error: "Invalid location" }, { status: 400 });
    }
    if (body.currentRole && !isValidInput(body.currentRole, 200)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    if (body.companyName && !isValidInput(body.companyName, 200)) {
      return NextResponse.json({ error: "Invalid company name" }, { status: 400 });
    }
    if (body.motivation && !isValidInput(body.motivation, 5000)) {
      return NextResponse.json({ error: "Motivation must be under 5,000 characters" }, { status: 400 });
    }
    if (body.referral && !isValidInput(body.referral, 200)) {
      return NextResponse.json({ error: "Invalid referral" }, { status: 400 });
    }

    // Validate program slug
    const validSlugs = ["xhansa-fellowship", "xcelero-accelerator", "inception-studios", "quest-fellowship"];
    if (!validSlugs.includes(programSlug)) {
      return NextResponse.json(
        { error: "Invalid program slug" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create program application
    const application = await db.programApplication.create({
      data: {
        programSlug,
        firstName,
        lastName,
        email,
        phone: body.phone || null,
        linkedinUrl: body.linkedinUrl || null,
        location: body.location || null,
        currentRole: body.currentRole || null,
        companyName: body.companyName || null,
        motivation: body.motivation || null,
        referral: body.referral || null,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        message: "Program application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Program application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
