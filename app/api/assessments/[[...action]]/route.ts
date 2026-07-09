import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { ObjectId } from "mongodb";
import { requireRole } from "@/lib/require-session";
import {
  apiKeysCol,
  assessmentsCol,
  type AIProvider,
  type AssessmentQuestion,
  type QuestionKind,
  type Difficulty,
} from "@/lib/models";
import { decryptSecret } from "@/lib/crypto";
import { callAI } from "@/lib/ai/providers";

const SYSTEM_PROMPT = `You are an expert instructional designer writing quiz questions for an AI bootcamp.
Output ONLY a raw JSON array (no markdown fences, no prose before or after) of question objects.
Each object must have exactly these fields:
- "kind": either "mcq" or "short_answer"
- "body": the question text (string)
- "options": for "mcq" only, an array of exactly 4 plausible answer strings
- "correctAnswer": for "mcq" this must exactly match one of the "options" strings; for "short_answer" a short model answer
- "points": an integer from 1 to 5
- "topicTag": a short lowercase topic label
- "difficulty": "beginner", "intermediate", or "advanced"`;

function extractJsonArray(text: string): unknown[] {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("The AI response did not contain a JSON array.");
  }
  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  if (!Array.isArray(parsed)) throw new Error("The AI response was not a JSON array.");
  return parsed;
}

async function listAssessments() {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const col = await assessmentsCol();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return NextResponse.json({
    assessments: docs.map((d) => ({ ...d, _id: d._id!.toString() })),
  });
}

async function createAssessment(req: Request) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  const title = (body?.title ?? "").trim();
  const type = body?.type === "assessment" ? "assessment" : "quiz";
  const instructions = (body?.instructions ?? "").trim();
  const timeLimitMin = body?.timeLimitMin ? Number(body.timeLimitMin) : null;
  const rawQuestions = Array.isArray(body?.questions) ? body.questions : [];

  if (!title || rawQuestions.length === 0) {
    return NextResponse.json({ error: "Title and at least one question are required." }, { status: 400 });
  }

  const questions: AssessmentQuestion[] = rawQuestions
    .map((q: Record<string, unknown>) => ({
      id: randomUUID(),
      kind: (q.kind as QuestionKind) ?? "mcq",
      body: String(q.body ?? "").trim(),
      options: Array.isArray(q.options) ? q.options.map(String).filter(Boolean) : undefined,
      correctAnswer: q.correctAnswer ? String(q.correctAnswer) : undefined,
      points: Number(q.points) || 1,
      topicTag: String(q.topicTag ?? "general"),
      difficulty: (q.difficulty as Difficulty) ?? "beginner",
    }))
    .filter((q: AssessmentQuestion) => q.body);

  if (questions.length === 0) {
    return NextResponse.json({ error: "Every question needs a body." }, { status: 400 });
  }

  const now = new Date();
  const col = await assessmentsCol();
  const result = await col.insertOne({
    title,
    type,
    instructions,
    timeLimitMin,
    isPublished: false,
    questions,
    createdBy: guard.session.userId,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ id: result.insertedId.toString() });
}

async function generateAssessment(req: Request) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  const topic = (body?.topic ?? "").trim();
  const provider = (body?.provider ?? "anthropic") as AIProvider;
  const model = (body?.model ?? "").trim();
  const count = Math.min(Math.max(Number(body?.count) || 3, 1), 10);
  const difficulty = (body?.difficulty ?? "beginner") as Difficulty;

  if (!topic || !model) {
    return NextResponse.json({ error: "A topic and model are required." }, { status: 400 });
  }

  const keys = await apiKeysCol();
  const saved = await keys.findOne({ userId: guard.session.userId, provider });
  if (!saved) {
    return NextResponse.json(
      { error: `No ${provider} API key saved yet. Add one in Settings first.` },
      { status: 400 }
    );
  }
  const apiKey = decryptSecret(saved);

  let reply: string;
  try {
    reply = await callAI({
      provider,
      apiKey,
      model,
      systemPrompt: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `Topic: ${topic}\nGenerate ${count} ${difficulty}-level questions.` },
      ],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "The AI provider returned an error.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  let rawQuestions: unknown[];
  try {
    rawQuestions = extractJsonArray(reply);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not parse the AI response.";
    return NextResponse.json({ error: `${message} Try generating again.` }, { status: 502 });
  }

  const questions: AssessmentQuestion[] = rawQuestions
    .map((raw) => {
      const q = raw as Record<string, unknown>;
      return {
        id: randomUUID(),
        kind: q.kind === "mcq" ? ("mcq" as const) : ("short_answer" as const),
        body: String(q.body ?? "").trim(),
        options: Array.isArray(q.options) ? q.options.map(String) : undefined,
        correctAnswer: q.correctAnswer ? String(q.correctAnswer) : undefined,
        points: Number(q.points) || 1,
        topicTag: String(q.topicTag ?? topic).slice(0, 40),
        difficulty: (["beginner", "intermediate", "advanced"] as Difficulty[]).includes(q.difficulty as Difficulty)
          ? (q.difficulty as Difficulty)
          : difficulty,
      };
    })
    .filter((q) => q.body);

  if (questions.length === 0) {
    return NextResponse.json({ error: "The AI response had no usable questions. Try again." }, { status: 502 });
  }

  const now = new Date();
  const col = await assessmentsCol();
  const result = await col.insertOne({
    title: `AI Draft: ${topic}`,
    type: "quiz",
    instructions: `Auto-generated by ${provider}/${model} - review and publish when ready.`,
    timeLimitMin: null,
    isPublished: false,
    questions,
    createdBy: guard.session.userId,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ id: result.insertedId.toString(), questionCount: questions.length });
}

async function updatePublishState(id: string, req: Request) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  if (typeof body?.isPublished !== "boolean") {
    return NextResponse.json({ error: "isPublished (boolean) is required." }, { status: 400 });
  }

  const col = await assessmentsCol();
  const result = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { isPublished: body.isPublished, updatedAt: new Date() } }
  );
  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

async function deleteAssessment(id: string) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const col = await assessmentsCol();
  await col.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return listAssessments();
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return createAssessment(req);
  if (action.length === 1 && action[0] === "generate") return generateAssessment(req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (action && action.length === 1) return updatePublishState(action[0], req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (action && action.length === 1) return deleteAssessment(action[0]);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
