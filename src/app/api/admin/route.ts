import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // Verify auth
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");

    if (section === "subscribers") {
      const subscribers = await db.subscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ subscribers });
    }

    if (section === "inquiries") {
      const inquiries = await db.investmentInquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ inquiries });
    }

    if (section === "applications") {
      const applications = await db.application.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ applications });
    }

    if (section === "jobApplications") {
      const jobApplications = await db.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ jobApplications });
    }

    if (section === "programApplications") {
      const programApplications = await db.programApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ programApplications });
    }

    if (section === "stats") {
      const [
        totalSubscribers,
        totalInquiries,
        totalApplications,
        totalJobApplications,
        totalProgramApplications,
        pendingInquiries,
        pendingApplications,
        pendingJobApplications,
        pendingProgramApplications,
        totalInvestmentAmount,
      ] = await Promise.all([
        db.subscriber.count(),
        db.investmentInquiry.count(),
        db.application.count(),
        db.jobApplication.count(),
        db.programApplication.count(),
        db.investmentInquiry.count({ where: { status: "pending" } }),
        db.application.count({ where: { status: "pending" } }),
        db.jobApplication.count({ where: { status: "pending" } }),
        db.programApplication.count({ where: { status: "pending" } }),
        db.investmentInquiry.aggregate({ _sum: { amount: true } }),
      ]);

      // Tier breakdown
      const inquiriesByTier = await db.investmentInquiry.groupBy({
        by: ["tier"],
        _count: { tier: true },
        _sum: { amount: true },
      });

      // Application type breakdown
      const applicationsByType = await db.application.groupBy({
        by: ["type"],
        _count: { type: true },
      });

      // Inquiry status breakdown
      const inquiriesByStatus = await db.investmentInquiry.groupBy({
        by: ["status"],
        _count: { status: true },
      });

      // Application status breakdown
      const applicationsByStatus = await db.application.groupBy({
        by: ["status"],
        _count: { status: true },
      });

      // Job application by role
      const jobApplicationsByRole = await db.jobApplication.groupBy({
        by: ["role"],
        _count: { role: true },
      });

      // Job application status breakdown
      const jobApplicationsByStatus = await db.jobApplication.groupBy({
        by: ["status"],
        _count: { status: true },
      });

      // Program application by program
      const programApplicationsByProgram = await db.programApplication.groupBy({
        by: ["programSlug"],
        _count: { programSlug: true },
      });

      // Program application status breakdown
      const programApplicationsByStatus = await db.programApplication.groupBy({
        by: ["status"],
        _count: { status: true },
      });

      return NextResponse.json({
        totalSubscribers,
        totalInquiries,
        totalApplications,
        totalJobApplications,
        totalProgramApplications,
        pendingInquiries,
        pendingApplications,
        pendingJobApplications,
        pendingProgramApplications,
        totalInvestmentAmount: totalInvestmentAmount._sum.amount || 0,
        inquiriesByTier,
        applicationsByType,
        inquiriesByStatus,
        applicationsByStatus,
        jobApplicationsByRole,
        jobApplicationsByStatus,
        programApplicationsByProgram,
        programApplicationsByStatus,
      });
    }

    // Default: return all data
    const [subscribers, inquiries, applications, jobApplications, programApplications] = await Promise.all([
      db.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.investmentInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.application.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.jobApplication.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.programApplication.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
    ]);

    return NextResponse.json({ subscribers, inquiries, applications, jobApplications, programApplications });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update status for all record types
export async function PATCH(req: NextRequest) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { model, id, status, notes } = body;

    if (!model || !id || !status) {
      return NextResponse.json(
        { error: "model, id, and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "reviewing", "contacted", "accepted", "declined", "invested"];

    if (model === "inquiry") {
      const inquiryStatuses = ["pending", "reviewing", "contacted", "declined", "invested"];
      if (!inquiryStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      const inquiry = await db.investmentInquiry.update({
        where: { id },
        data: { status },
      });
      return NextResponse.json({ inquiry });
    }

    if (model === "application") {
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      const updateData: Record<string, unknown> = { status };
      if (notes !== undefined) updateData.notes = notes;
      const application = await db.application.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json({ application });
    }

    if (model === "jobApplication") {
      const jobStatuses = ["pending", "reviewing", "contacted", "accepted", "declined"];
      if (!jobStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      const updateData: Record<string, unknown> = { status };
      if (notes !== undefined) updateData.notes = notes;
      const jobApp = await db.jobApplication.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json({ jobApplication: jobApp });
    }

    if (model === "programApplication") {
      const programStatuses = ["pending", "reviewing", "contacted", "accepted", "declined"];
      if (!programStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      const updateData: Record<string, unknown> = { status };
      if (notes !== undefined) updateData.notes = notes;
      const programApp = await db.programApplication.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json({ programApplication: programApp });
    }

    return NextResponse.json(
      { error: "Invalid model. Must be 'inquiry', 'application', 'jobApplication', or 'programApplication'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a record
export async function DELETE(req: NextRequest) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");
    const id = searchParams.get("id");

    if (!model || !id) {
      return NextResponse.json(
        { error: "model and id are required" },
        { status: 400 }
      );
    }

    if (model === "subscriber") {
      await db.subscriber.delete({ where: { id } });
      return NextResponse.json({ message: "Subscriber deleted" });
    }

    if (model === "inquiry") {
      await db.investmentInquiry.delete({ where: { id } });
      return NextResponse.json({ message: "Inquiry deleted" });
    }

    if (model === "application") {
      await db.application.delete({ where: { id } });
      return NextResponse.json({ message: "Application deleted" });
    }

    if (model === "jobApplication") {
      await db.jobApplication.delete({ where: { id } });
      return NextResponse.json({ message: "Job application deleted" });
    }

    if (model === "programApplication") {
      await db.programApplication.delete({ where: { id } });
      return NextResponse.json({ message: "Program application deleted" });
    }

    return NextResponse.json(
      { error: "Invalid model" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
