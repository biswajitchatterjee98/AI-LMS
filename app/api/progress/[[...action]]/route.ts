import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/auth";
import { progressCol, usersCol, type LessonStatus } from "@/lib/models";

const LESSON_XP = 20;
const XP_PER_CORRECT_ANSWER = 10;

async function listProgress() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const col = await progressCol();
  const docs = await col.find({ userId: session.userId }).toArray();
  return NextResponse.json({ progress: docs.map((d) => ({ ...d, _id: d._id!.toString() })) });
}

async function upsertProgress(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const courseId = (body?.courseId ?? "").trim();
  const moduleId = (body?.moduleId ?? "").trim();
  const lessonId = (body?.lessonId ?? "").trim();
  const status: LessonStatus = ["not_started", "in_progress", "done"].includes(body?.status)
    ? body.status
    : "in_progress";
  const completionPercentage = Math.max(0, Math.min(100, Number(body?.completionPercentage) || 0));

  if (!courseId || !moduleId || !lessonId) {
    return NextResponse.json({ error: "courseId, moduleId, and lessonId are required." }, { status: 400 });
  }

  const col = await progressCol();
  const existing = await col.findOne({ userId: session.userId, lessonId });
  const justCompleted = status === "done" && existing?.status !== "done";
  const xpToAward = justCompleted ? LESSON_XP : 0;

  const now = new Date();
  await col.updateOne(
    { userId: session.userId, lessonId },
    {
      $set: {
        userId: session.userId,
        courseId,
        moduleId,
        lessonId,
        status,
        completionPercentage,
        updatedAt: now,
        ...(justCompleted ? { completedAt: now } : {}),
      },
      $inc: { xpAwarded: xpToAward },
    },
    { upsert: true }
  );

  if (xpToAward > 0) {
    const users = await usersCol();
    await users.updateOne({ _id: new ObjectId(session.userId) }, { $inc: { xp: xpToAward } });
  }

  return NextResponse.json({ ok: true, xpAwarded: xpToAward });
}

async function submitQuizAttempt(lessonId: string, req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const score = Math.max(0, Math.min(100, Number(body?.score) || 0));
  const correctCount = Math.max(0, Number(body?.correctCount) || 0);

  const col = await progressCol();
  const existing = await col.findOne({ userId: session.userId, lessonId });
  const firstAttempt = existing?.quizScore === undefined;
  const xpToAward = firstAttempt ? correctCount * XP_PER_CORRECT_ANSWER : 0;

  await col.updateOne(
    { userId: session.userId, lessonId },
    {
      $set: { userId: session.userId, lessonId, quizScore: score, updatedAt: new Date() },
      $inc: { xpAwarded: xpToAward },
      $setOnInsert: {
        courseId: existing?.courseId ?? "",
        moduleId: existing?.moduleId ?? "",
        status: existing?.status ?? "in_progress",
        completionPercentage: existing?.completionPercentage ?? 0,
      },
    },
    { upsert: true }
  );

  if (xpToAward > 0) {
    const users = await usersCol();
    await users.updateOne({ _id: new ObjectId(session.userId) }, { $inc: { xp: xpToAward } });
  }

  return NextResponse.json({ ok: true, xpAwarded: xpToAward, firstAttempt });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return listProgress();
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return upsertProgress(req);
  if (action.length === 2 && action[1] === "quiz") return submitQuizAttempt(action[0], req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
