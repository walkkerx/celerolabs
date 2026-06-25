import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

function escapeCSV(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function generateCSV(headers: string[], rows: string[][]): string {
  const headerLine = headers.join(",");
  const dataLines = rows.map((row) => row.map(escapeCSV).join(","));
  return [headerLine, ...dataLines].join("\n");
}

export async function GET(req: NextRequest) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");

    if (!section) {
      return NextResponse.json(
        { error: "section parameter is required" },
        { status: 400 }
      );
    }

    let csv: string;
    let filename: string;

    if (section === "subscribers") {
      const subscribers = await db.subscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: 5000,
      });

      const headers = ["ID", "First Name", "Last Name", "Email", "Consent", "Source", "Created At"];
      const rows = subscribers.map((s) => [
        s.id, s.firstName || "", s.lastName || "", s.email, String(s.consent), s.source,
        new Date(s.createdAt).toISOString(),
      ]);
      csv = generateCSV(headers, rows);
      filename = `xcelero-subscribers-${new Date().toISOString().split("T")[0]}.csv`;

    } else if (section === "inquiries") {
      const inquiries = await db.investmentInquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5000,
      });

      const headers = ["ID", "Name", "Email", "Amount", "Tier", "Accredited", "Consent", "Status", "Created At"];
      const rows = inquiries.map((i) => [
        i.id, i.name, i.email, String(i.amount), i.tier,
        String(i.accredited), String(i.consent), i.status,
        new Date(i.createdAt).toISOString(),
      ]);
      csv = generateCSV(headers, rows);
      filename = `xcelero-inquiries-${new Date().toISOString().split("T")[0]}.csv`;

    } else if (section === "applications") {
      const applications = await db.application.findMany({
        orderBy: { createdAt: "desc" },
        take: 5000,
      });

      const headers = [
        "ID", "Type", "First Name", "Last Name", "Email", "Referral",
        "LinkedIn URL", "Company Name", "Company Website", "Location",
        "Role", "Pitch Deck URL", "Motivation",
        "Org Name", "Org Website", "Partner Role", "Interest", "Description",
        "Status", "Notes", "Created At",
      ];
      const rows = applications.map((a) => [
        a.id, a.type, a.firstName, a.lastName, a.email, a.referral || "",
        a.linkedinUrl || "", a.companyName || "", a.companyWebsite || "", a.location || "",
        a.role || "", a.pitchDeckUrl || "", a.motivation || "",
        a.orgName || "", a.orgWebsite || "", a.partnerRole || "", a.interest || "", a.description || "",
        a.status, a.notes || "", new Date(a.createdAt).toISOString(),
      ]);
      csv = generateCSV(headers, rows);
      filename = `xcelero-applications-${new Date().toISOString().split("T")[0]}.csv`;

    } else if (section === "jobApplications") {
      const jobApplications = await db.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 5000,
      });

      const headers = [
        "ID", "First Name", "Last Name", "Email", "Phone",
        "LinkedIn URL", "Portfolio URL", "Role", "Location",
        "Availability", "Motivation", "Referral", "Resume URL",
        "Status", "Notes", "Created At",
      ];
      const rows = jobApplications.map((j) => [
        j.id, j.firstName, j.lastName, j.email, j.phone || "",
        j.linkedinUrl || "", j.portfolioUrl || "", j.role, j.location || "",
        j.availability || "", j.motivation || "", j.referral || "", j.resumeUrl || "",
        j.status, j.notes || "", new Date(j.createdAt).toISOString(),
      ]);
      csv = generateCSV(headers, rows);
      filename = `xcelero-job-applications-${new Date().toISOString().split("T")[0]}.csv`;

    } else if (section === "programApplications") {
      const programApplications = await db.programApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 5000,
      });

      const headers = [
        "ID", "Program Slug", "First Name", "Last Name", "Email", "Phone",
        "LinkedIn URL", "Location", "Current Role", "Company Name",
        "Motivation", "Referral", "Status", "Notes", "Created At",
      ];
      const rows = programApplications.map((p) => [
        p.id, p.programSlug, p.firstName, p.lastName, p.email, p.phone || "",
        p.linkedinUrl || "", p.location || "", p.currentRole || "", p.companyName || "",
        p.motivation || "", p.referral || "", p.status, p.notes || "",
        new Date(p.createdAt).toISOString(),
      ]);
      csv = generateCSV(headers, rows);
      filename = `xcelero-program-applications-${new Date().toISOString().split("T")[0]}.csv`;

    } else {
      return NextResponse.json(
        { error: "Invalid section. Must be subscribers, inquiries, applications, jobApplications, or programApplications" },
        { status: 400 }
      );
    }

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
