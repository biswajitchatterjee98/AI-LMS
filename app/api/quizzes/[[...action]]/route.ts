import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/auth";
import { quizzesCol, quizResponsesCol, usersCol } from "@/lib/models";
import { requireRole } from "@/lib/require-session";

const XP_PER_CORRECT_ANSWER = 10;

async function listQuizzes() {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const quizzes = await quizzesCol();
  const list = await quizzes.find({}).sort({ createdAt: -1 }).limit(50).toArray();
  return NextResponse.json({ quizzes: list });
}

async function createQuiz(req: Request) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  const title = (body?.title ?? "").trim();
  const question = (body?.question ?? "").trim();
  const optionLabels: string[] = Array.isArray(body?.options) ? body.options : [];
  const correctIndex = Number(body?.correctIndex);
  const dayNumber = body?.dayNumber;
  const durationSec = Number(body?.durationSec) || 20;

  const cleanOptions = optionLabels.map((l) => l.trim()).filter(Boolean);
  if (!title || !question || cleanOptions.length < 2) {
    return NextResponse.json(
      { error: "Title, question, and at least 2 options are required." },
      { status: 400 }
    );
  }
  if (!(correctIndex >= 0 && correctIndex < cleanOptions.length)) {
    return NextResponse.json({ error: "A valid correct option must be selected." }, { status: 400 });
  }

  const options = cleanOptions.map((label, i) => ({ id: `opt-${i}`, label }));
  const correctOptionId = options[correctIndex].id;

  const quizzes = await quizzesCol();
  const result = await quizzes.insertOne({
    title,
    question,
    options,
    correctOptionId,
    dayNumber: [1, 2, 3].includes(dayNumber) ? dayNumber : undefined,
    status: "draft",
    durationSec,
    createdBy: guard.session.userId,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true, id: result.insertedId.toString() });
}

async function activeQuiz() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const quizzes = await quizzesCol();
  const live = await quizzes.findOne({ status: "live" });

  if (!live) return NextResponse.json({ quiz: null });

  if (live.endsAt && live.endsAt.getTime() <= Date.now()) {
    await quizzes.updateOne({ _id: live._id }, { $set: { status: "closed" } });
    return NextResponse.json({ quiz: null });
  }

  // Never send the correct answer down to students.
  return NextResponse.json({
    quiz: {
      id: live._id!.toString(),
      title: live.title,
      question: live.question,
      options: live.options,
      startedAt: live.startedAt,
      endsAt: live.endsAt,
      durationSec: live.durationSec,
    },
  });
}

async function closeQuiz(id: string) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const quizzes = await quizzesCol();
  await quizzes.updateOne({ _id: new ObjectId(id) }, { $set: { status: "closed" } });
  return NextResponse.json({ ok: true });
}

async function launchQuiz(id: string) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const quizzes = await quizzesCol();
  const quiz = await quizzes.findOne({ _id: new ObjectId(id) });
  if (!quiz) return NextResponse.json({ error: "Quiz not found." }, { status: 404 });

  await quizzes.updateMany({ status: "live" }, { $set: { status: "closed" } });

  const startedAt = new Date();
  const endsAt = new Date(startedAt.getTime() + quiz.durationSec * 1000);
  await quizzes.updateOne({ _id: quiz._id }, { $set: { status: "live", startedAt, endsAt } });

  return NextResponse.json({ ok: true, startedAt, endsAt });
}

async function respondQuiz(id: string, req: Request) {
  const guard = await requireRole("student");
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  const optionId = body?.optionId as string | undefined;
  if (!optionId) return NextResponse.json({ error: "optionId is required." }, { status: 400 });

  const quizzes = await quizzesCol();
  const quiz = await quizzes.findOne({ _id: new ObjectId(id) });
  if (!quiz) return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
  if (quiz.status !== "live") {
    return NextResponse.json({ error: "This quiz is no longer accepting answers." }, { status: 410 });
  }
  if (quiz.endsAt && quiz.endsAt.getTime() <= Date.now()) {
    return NextResponse.json({ error: "Time's up - the 20 second window has closed." }, { status: 410 });
  }
  if (!quiz.options.some((o) => o.id === optionId)) {
    return NextResponse.json({ error: "Invalid option." }, { status: 400 });
  }

  const responses = await quizResponsesCol();
  const existing = await responses.findOne({ quizId: quiz._id!, studentId: guard.session.userId });
  if (existing) {
    return NextResponse.json({ error: "You already answered this quiz." }, { status: 409 });
  }

  const correct = optionId === quiz.correctOptionId;

  try {
    await responses.insertOne({
      quizId: quiz._id!,
      studentId: guard.session.userId,
      studentName: guard.session.name,
      optionId,
      correct,
      answeredAt: new Date(),
    });
  } catch {
    return NextResponse.json({ error: "You already answered this quiz." }, { status: 409 });
  }

  if (correct) {
    const users = await usersCol();
    await users.updateOne(
      { _id: new ObjectId(guard.session.userId) },
      { $inc: { xp: XP_PER_CORRECT_ANSWER } }
    );
  }

  return NextResponse.json({ ok: true, correct, xpAwarded: correct ? XP_PER_CORRECT_ANSWER : 0 });
}

async function quizResults(id: string) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const quizzes = await quizzesCol();
  const quiz = await quizzes.findOne({ _id: new ObjectId(id) });
  if (!quiz) return NextResponse.json({ error: "Quiz not found." }, { status: 404 });

  const responses = await quizResponsesCol();
  const all = await responses.find({ quizId: quiz._id! }).sort({ answeredAt: 1 }).toArray();

  const counts: Record<string, number> = {};
  for (const opt of quiz.options) counts[opt.id] = 0;
  for (const r of all) counts[r.optionId] = (counts[r.optionId] ?? 0) + 1;

  const total = all.length;
  const correctCount = all.filter((r) => r.correct).length;
  const chartData = quiz.options.map((opt) => ({
    optionId: opt.id,
    label: opt.label,
    count: counts[opt.id] ?? 0,
    percent: total > 0 ? Math.round(((counts[opt.id] ?? 0) / total) * 1000) / 10 : 0,
    isCorrect: opt.id === quiz.correctOptionId,
  }));

  return NextResponse.json({
    quiz: {
      id: quiz._id!.toString(),
      title: quiz.title,
      question: quiz.question,
      status: quiz.status,
      endsAt: quiz.endsAt,
      correctOptionId: quiz.correctOptionId,
    },
    total,
    correctCount,
    accuracyPercent: total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0,
    chartData,
    responses: all.map((r) => ({
      studentId: r.studentId,
      studentName: r.studentName,
      optionId: r.optionId,
      optionLabel: quiz.options.find((o) => o.id === r.optionId)?.label ?? r.optionId,
      correct: r.correct,
      answeredAt: r.answeredAt,
    })),
  });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return listQuizzes();
  if (action.length === 1 && action[0] === "active") return activeQuiz();
  if (action.length === 2 && action[1] === "results") return quizResults(action[0]);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return createQuiz(req);
  if (action.length === 2 && action[1] === "close") return closeQuiz(action[0]);
  if (action.length === 2 && action[1] === "launch") return launchQuiz(action[0]);
  if (action.length === 2 && action[1] === "respond") return respondQuiz(action[0], req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
