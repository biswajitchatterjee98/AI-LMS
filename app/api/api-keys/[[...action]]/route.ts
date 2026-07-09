import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { apiKeysCol, type AIProvider } from "@/lib/models";
import { encryptSecret } from "@/lib/crypto";

const VALID_PROVIDERS: AIProvider[] = ["anthropic", "openai", "google"];

async function listKeys() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const keys = await apiKeysCol();
  const saved = await keys.find({ userId: session.userId }).toArray();
  return NextResponse.json({
    providers: saved.map((k) => ({ provider: k.provider, updatedAt: k.updatedAt })),
  });
}

async function saveKey(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const provider = body?.provider as AIProvider;
  const apiKey = (body?.apiKey ?? "").trim();

  if (!VALID_PROVIDERS.includes(provider) || !apiKey) {
    return NextResponse.json({ error: "A valid provider and API key are required." }, { status: 400 });
  }

  const encrypted = encryptSecret(apiKey);
  const keys = await apiKeysCol();
  await keys.updateOne(
    { userId: session.userId, provider },
    { $set: { ...encrypted, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}

async function deleteKey(provider: string) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const keys = await apiKeysCol();
  await keys.deleteOne({ userId: session.userId, provider: provider as AIProvider });
  return NextResponse.json({ ok: true });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return listKeys();
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return saveKey(req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (action && action.length === 1) return deleteKey(action[0]);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
