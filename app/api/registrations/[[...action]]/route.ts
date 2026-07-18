import { NextResponse } from "next/server";
import { registrationsCol, type ExperienceLevel } from "@/lib/models";
import { requireRole } from "@/lib/require-session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXPERIENCE_LEVELS: ExperienceLevel[] = ["beginner", "intermediate", "advanced"];

async function listRegistrations() {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const col = await registrationsCol();
  const docs = await col.find({}).sort({ submittedAt: -1 }).toArray();
  return NextResponse.json({ registrations: docs.map((d) => ({ ...d, _id: d._id!.toString() })) });
}

async function createRegistration(req: Request) {
  const body = await req.json().catch(() => null);
  const fullName = (body?.fullName ?? "").trim();
  const email = (body?.email ?? "").trim().toLowerCase();
  const phone = (body?.phone ?? "").trim();
  const organization = (body?.organization ?? "").trim();
  const experienceLevel = body?.experienceLevel;
  const currentRole = (body?.currentRole ?? "").trim();
  const reasonForJoining = (body?.reasonForJoining ?? "").trim();

  if (!fullName || fullName.length > 200) {
    return NextResponse.json({ error: "A valid full name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!phone || phone.length > 40) {
    return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
  }
  if (!organization || organization.length > 200) {
    return NextResponse.json({ error: "Organization is required." }, { status: 400 });
  }
  if (!EXPERIENCE_LEVELS.includes(experienceLevel)) {
    return NextResponse.json({ error: "A valid experience level is required." }, { status: 400 });
  }
  if (!currentRole || currentRole.length > 200) {
    return NextResponse.json({ error: "Current role is required." }, { status: 400 });
  }
  if (!reasonForJoining || reasonForJoining.length > 2000) {
    return NextResponse.json({ error: "Please share a reason for joining (max 2000 characters)." }, { status: 400 });
  }

  const col = await registrationsCol();
  await col.insertOne({
    fullName,
    email,
    phone,
    organization,
    experienceLevel,
    currentRole,
    reasonForJoining,
    submittedAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return listRegistrations();
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return createRegistration(req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
