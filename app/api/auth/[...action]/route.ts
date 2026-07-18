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
  if (route === "logout") return logout();
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
