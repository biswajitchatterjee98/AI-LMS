import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { usersCol } from "@/lib/models";
import {
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSession,
} from "@/lib/auth";
import { hubEmailForUsername, verifyHubToken } from "@/lib/hub-sso";

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

function safeAppPath(next: string | null): string {
  const raw = (next || "/student/courses").trim();
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("://")) {
    return "/student/courses";
  }
  return raw;
}

/** Consume traininglobe-hub `hub_token`, upsert learner, set session cookie, redirect. */
async function hub(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("hub_token");
  const next = safeAppPath(url.searchParams.get("next"));

  if (!token) {
    return NextResponse.redirect(new URL(next, url.origin));
  }

  const payload = verifyHubToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL(next, url.origin));
  }

  // Hub admin stays a learner in the LMS (admin uses seed credentials via API).
  const email = hubEmailForUsername(payload.username);
  const name = payload.username;
  const users = await usersCol();
  let user = await users.findOne({ email });

  if (!user) {
    const passwordHash = await bcrypt.hash(`hub:${payload.username}:${payload.exp}`, 10);
    const inserted = await users.insertOne({
      name,
      email,
      passwordHash,
      role: "student",
      xp: 0,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    });
    user = {
      _id: inserted.insertedId,
      name,
      email,
      passwordHash,
      role: "student",
      xp: 0,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
  } else {
    await users.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date(), name: user.name || name } }
    );
  }

  const sessionToken = await createSessionToken({
    userId: user._id!.toString(),
    name: user.name || name,
    email: user.email,
    role: user.role === "admin" ? "admin" : "student",
  });
  await setSessionCookie(sessionToken);

  return NextResponse.redirect(new URL(next, url.origin));
}

export async function GET(req: Request, { params }: { params: Promise<{ action: string[] }> }) {
  const { action } = await params;
  const route = action.join("/");
  if (route === "me") return me();
  if (route === "hub") return hub(req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action: string[] }> }) {
  const { action } = await params;
  const route = action.join("/");
  if (route === "login") return login(req);
  if (route === "logout") return logout();
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
