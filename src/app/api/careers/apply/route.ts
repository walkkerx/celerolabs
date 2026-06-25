import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isValidInput } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, role } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email, role" },
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
    if (!isValidInput(role, 200)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    if (body.phone && !isValidInput(body.phone, 50)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }
    if (body.linkedinUrl && !isValidInput(body.linkedinUrl, 2000)) {
      return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 });
    }
    if (body.portfolioUrl && !isValidInput(body.portfolioUrl, 2000)) {
      return NextResponse.json({ error: "Invalid portfolio URL" }, { status: 400 });
    }
    if (body.location && !isValidInput(body.location, 200)) {
      return NextResponse.json({ error: "Invalid location" }, { status: 400 });
    }
    if (body.availability && !isValidInput(body.availability, 200)) {
      return NextResponse.json({ error: "Invalid availability" }, { status: 400 });
    }
    if (body.motivation && !isValidInput(body.motivation, 5000)) {
      return NextResponse.json({ error: "Motivation must be under 5,000 characters" }, { status: 400 });
    }
    if (body.referral && !isValidInput(body.referral, 200)) {
      return NextResponse.json({ error: "Invalid referral" }, { status: 400 });
    }
    if (body.resumeUrl && !isValidInput(body.resumeUrl, 2000)) {
      return NextResponse.json({ error: "Invalid resume URL" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create job application
    const application = await db.jobApplication.create({
      data: {
        firstName,
        lastName,
        email,
        phone: body.phone || null,
        linkedinUrl: body.linkedinUrl || null,
        portfolioUrl: body.portfolioUrl || null,
        role,
        location: body.location || null,
        availability: body.availability || null,
        motivation: body.motivation || null,
        referral: body.referral || null,
        resumeUrl: body.resumeUrl || null,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        message: "Job application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
