import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/auth";
import { pollsCol, pollResponsesCol } from "@/lib/models";
import { requireRole } from "@/lib/require-session";

async function listPolls() {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const polls = await pollsCol();
  const list = await polls.find({}).sort({ createdAt: -1 }).limit(50).toArray();
  return NextResponse.json({ polls: list });
}

async function createPoll(req: Request) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  const title = (body?.title ?? "").trim();
  const question = (body?.question ?? "").trim();
  const optionLabels: string[] = Array.isArray(body?.options) ? body.options : [];
  const dayNumber = body?.dayNumber;
  const durationSec = Number(body?.durationSec) || 20;

  if (!title || !question || optionLabels.filter((o) => o.trim()).length < 2) {
    return NextResponse.json(
      { error: "Title, question, and at least 2 options are required." },
      { status: 400 }
    );
  }

  const options = optionLabels
    .map((label, i) => ({ id: `opt-${i}`, label: label.trim() }))
    .filter((o) => o.label);

  const polls = await pollsCol();
  const result = await polls.insertOne({
    title,
    question,
    options,
    dayNumber: [1, 2, 3].includes(dayNumber) ? dayNumber : undefined,
    status: "draft",
    durationSec,
    createdBy: guard.session.userId,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true, id: result.insertedId.toString() });
}

async function activePoll() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const polls = await pollsCol();
  const live = await polls.findOne({ status: "live" });

  if (!live) return NextResponse.json({ poll: null });

  // Auto-expire once the answer window has passed.
  if (live.endsAt && live.endsAt.getTime() <= Date.now()) {
    await polls.updateOne({ _id: live._id }, { $set: { status: "closed" } });
    return NextResponse.json({ poll: null });
  }

  return NextResponse.json({
    poll: {
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

async function closePoll(id: string) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const polls = await pollsCol();
  await polls.updateOne({ _id: new ObjectId(id) }, { $set: { status: "closed" } });
  return NextResponse.json({ ok: true });
}

async function launchPoll(id: string) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const polls = await pollsCol();
  const poll = await polls.findOne({ _id: new ObjectId(id) });
  if (!poll) return NextResponse.json({ error: "Poll not found." }, { status: 404 });

  // Only one poll live at a time - close any others still marked live.
  await polls.updateMany({ status: "live" }, { $set: { status: "closed" } });

  const startedAt = new Date();
  const endsAt = new Date(startedAt.getTime() + poll.durationSec * 1000);
  await polls.updateOne(
    { _id: poll._id },
    { $set: { status: "live", startedAt, endsAt } }
  );

  return NextResponse.json({ ok: true, startedAt, endsAt });
}

async function respondPoll(id: string, req: Request) {
  const guard = await requireRole("student");
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  const optionId = body?.optionId as string | undefined;
  if (!optionId) return NextResponse.json({ error: "optionId is required." }, { status: 400 });

  const polls = await pollsCol();
  const poll = await polls.findOne({ _id: new ObjectId(id) });
  if (!poll) return NextResponse.json({ error: "Poll not found." }, { status: 404 });
  if (poll.status !== "live") {
    return NextResponse.json({ error: "This poll is no longer accepting answers." }, { status: 410 });
  }
  if (poll.endsAt && poll.endsAt.getTime() <= Date.now()) {
    return NextResponse.json({ error: "Time's up - the 20 second window has closed." }, { status: 410 });
  }
  if (!poll.options.some((o) => o.id === optionId)) {
    return NextResponse.json({ error: "Invalid option." }, { status: 400 });
  }

  const responses = await pollResponsesCol();
  const existing = await responses.findOne({ pollId: poll._id!, studentId: guard.session.userId });
  if (existing) {
    return NextResponse.json({ error: "You already answered this poll." }, { status: 409 });
  }

  try {
    await responses.insertOne({
      pollId: poll._id!,
      studentId: guard.session.userId,
      studentName: guard.session.name,
      optionId,
      answeredAt: new Date(),
    });
  } catch {
    // Unique index (pollId, studentId) caught a race - treat as already answered.
    return NextResponse.json({ error: "You already answered this poll." }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}

async function pollResults(id: string) {
  const guard = await requireRole("admin");
  if ("error" in guard) return guard.error;

  const polls = await pollsCol();
  const poll = await polls.findOne({ _id: new ObjectId(id) });
  if (!poll) return NextResponse.json({ error: "Poll not found." }, { status: 404 });

  const responses = await pollResponsesCol();
  const all = await responses.find({ pollId: poll._id! }).sort({ answeredAt: 1 }).toArray();

  const counts: Record<string, number> = {};
  for (const opt of poll.options) counts[opt.id] = 0;
  for (const r of all) counts[r.optionId] = (counts[r.optionId] ?? 0) + 1;

  const total = all.length;
  const chartData = poll.options.map((opt) => ({
    optionId: opt.id,
    label: opt.label,
    count: counts[opt.id] ?? 0,
    percent: total > 0 ? Math.round(((counts[opt.id] ?? 0) / total) * 1000) / 10 : 0,
  }));

  return NextResponse.json({
    poll: {
      id: poll._id!.toString(),
      title: poll.title,
      question: poll.question,
      status: poll.status,
      endsAt: poll.endsAt,
    },
    total,
    chartData,
    responses: all.map((r) => ({
      studentId: r.studentId,
      studentName: r.studentName,
      optionId: r.optionId,
      optionLabel: poll.options.find((o) => o.id === r.optionId)?.label ?? r.optionId,
      answeredAt: r.answeredAt,
    })),
  });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return listPolls();
  if (action.length === 1 && action[0] === "active") return activePoll();
  if (action.length === 2 && action[1] === "results") return pollResults(action[0]);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return createPoll(req);
  if (action.length === 2 && action[1] === "close") return closePoll(action[0]);
  if (action.length === 2 && action[1] === "launch") return launchPoll(action[0]);
  if (action.length === 2 && action[1] === "respond") return respondPoll(action[0], req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
