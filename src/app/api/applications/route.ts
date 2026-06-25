import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isValidInput } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, firstName, lastName, email, referral } = body;

    // Validate required common fields
    if (!type || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields: type, firstName, lastName, email" },
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
    if (referral && !isValidInput(referral, 200)) {
      return NextResponse.json({ error: "Invalid referral" }, { status: 400 });
    }
    if (body.linkedinUrl && !isValidInput(body.linkedinUrl, 2000)) {
      return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 });
    }
    if (body.companyName && !isValidInput(body.companyName, 200)) {
      return NextResponse.json({ error: "Invalid company name" }, { status: 400 });
    }
    if (body.companyWebsite && !isValidInput(body.companyWebsite, 2000)) {
      return NextResponse.json({ error: "Invalid company website" }, { status: 400 });
    }
    if (body.location && !isValidInput(body.location, 200)) {
      return NextResponse.json({ error: "Invalid location" }, { status: 400 });
    }
    if (body.role && !isValidInput(body.role, 200)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    if (body.pitchDeckUrl && !isValidInput(body.pitchDeckUrl, 2000)) {
      return NextResponse.json({ error: "Invalid pitch deck URL" }, { status: 400 });
    }
    if (body.motivation && !isValidInput(body.motivation, 5000)) {
      return NextResponse.json({ error: "Motivation must be under 5,000 characters" }, { status: 400 });
    }
    if (body.orgName && !isValidInput(body.orgName, 200)) {
      return NextResponse.json({ error: "Invalid organization name" }, { status: 400 });
    }
    if (body.orgWebsite && !isValidInput(body.orgWebsite, 2000)) {
      return NextResponse.json({ error: "Invalid organization website" }, { status: 400 });
    }
    if (body.partnerRole && !isValidInput(body.partnerRole, 200)) {
      return NextResponse.json({ error: "Invalid partner role" }, { status: 400 });
    }
    if (body.interest && !isValidInput(body.interest, 2000)) {
      return NextResponse.json({ error: "Invalid interest" }, { status: 400 });
    }
    if (body.description && !isValidInput(body.description, 5000)) {
      return NextResponse.json({ error: "Description must be under 5,000 characters" }, { status: 400 });
    }

    // Validate type
    if (!["founder", "partner"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid application type. Must be 'founder' or 'partner'" },
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

    // Validate founder-specific fields
    if (type === "founder") {
      const { linkedinUrl, companyName, location, role, pitchDeckUrl, motivation } = body;
      if (!linkedinUrl || !companyName || !location || !role || !pitchDeckUrl || !motivation) {
        return NextResponse.json(
          { error: "Missing required founder fields" },
          { status: 400 }
        );
      }
    }

    // Validate partner-specific fields
    if (type === "partner") {
      const { orgName, partnerRole, interest, description } = body;
      if (!orgName || !partnerRole || !interest || !description) {
        return NextResponse.json(
          { error: "Missing required partner fields" },
          { status: 400 }
        );
      }
    }

    // Create application
    const application = await db.application.create({
      data: {
        type,
        firstName,
        lastName,
        email,
        referral: referral || null,
        // Founder-specific
        linkedinUrl: body.linkedinUrl || null,
        companyName: body.companyName || null,
        companyWebsite: body.companyWebsite || null,
        location: body.location || null,
        role: body.role || null,
        pitchDeckUrl: body.pitchDeckUrl || null,
        motivation: body.motivation || null,
        // Partner-specific
        orgName: body.orgName || null,
        orgWebsite: body.orgWebsite || null,
        partnerRole: body.partnerRole || null,
        interest: body.interest || null,
        description: body.description || null,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        message: "Application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET and PATCH endpoints removed for security - application data is only accessible via admin dashboard
export async function GET() {
  return NextResponse.json(
    { error: "This endpoint is not publicly accessible" },
    { status: 403 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "This endpoint is not publicly accessible" },
    { status: 403 }
  );
}
