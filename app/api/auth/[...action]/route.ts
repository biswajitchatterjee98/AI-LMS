import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { usersCol } from "@/lib/models";
import { createSessionToken, setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth";

async function login(req: Request) {
  const body = await req.json().catch(() => null);
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const users = await usersCol();
  const user = await users.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  await users.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

  const token = await createSessionToken({
    userId: user._id!.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true, role: user.role });
}

async function signup(req: Request) {
  const body = await req.json().catch(() => null);
  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const users = await usersCol();
  const existing = await users.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();
  const result = await users.insertOne({
    name,
    email,
    passwordHash,
    role: "student",
    xp: 0,
    createdAt: now,
    lastLoginAt: now,
  });

  const token = await createSessionToken({
    userId: result.insertedId.toString(),
    name,
    email,
    role: "student",
  });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true, role: "student" });
}

async function logout() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}

async function me() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null }, { status: 401 });
  return NextResponse.json({ user: session });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action: string[] }> }) {
  const { action } = await params;
  if (action.join("/") === "me") return me();
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action: string[] }> }) {
  const { action } = await params;
  const route = action.join("/");
  if (route === "login") return login(req);
  if (route === "signup") return signup(req);
  if (route === "logout") return logout();
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
