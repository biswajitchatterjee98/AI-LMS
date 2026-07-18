import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/auth";
import { coursesCol } from "@/lib/models";
import { buildLessonDigest } from "@/lib/curriculum/lesson-digest";

async function lessonContext(lessonId: string) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const col = await coursesCol();
  const course = await col.findOne({ isPublished: true });
  if (!course) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const allLessons = course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitle: m.title })));
  const index = allLessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const lesson = allLessons[index];
  const next = allLessons[index + 1];

  return NextResponse.json({
    lessonId: lesson.id,
    title: lesson.title,
    moduleTitle: lesson.moduleTitle,
    courseTitle: course.title,
    digest: buildLessonDigest(lesson.title, lesson.contentBlocks),
    nextLessonId: next?.id ?? null,
    nextLessonTitle: next?.title ?? null,
  });
}

async function listCourses() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const col = await coursesCol();
  const filter = session.role === "admin" ? {} : { isPublished: true };
  const docs = await col.find(filter).sort({ createdAt: 1 }).toArray();

  return NextResponse.json({
    courses: docs.map((d) => ({ ...d, _id: d._id!.toString() })),
  });
}

async function createCourse(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const title = (body?.title ?? "").trim();
  const description = (body?.description ?? "").trim();
  const isPublished = !!body?.isPublished;

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const now = new Date();
  const col = await coursesCol();
  const result = await col.insertOne({
    title,
    description,
    isPublished,
    modules: [],
    createdBy: session.userId,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ id: result.insertedId.toString() });
}

async function updateCourse(id: string, req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await req.json().catch(() => null);

  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof body?.isPublished === "boolean") update.isPublished = body.isPublished;
  if (typeof body?.title === "string" && body.title.trim()) update.title = body.title.trim();
  if (typeof body?.description === "string") update.description = body.description.trim();

  const col = await coursesCol();
  const result = await col.updateOne({ _id: new ObjectId(id) }, { $set: update });
  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

async function deleteCourse(id: string) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const col = await coursesCol();
  await col.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}

export async function GET(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return listCourses();
  if (action.length === 2 && action[0] === "lesson") return lessonContext(action[1]);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (!action || action.length === 0) return createCourse(req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (action && action.length === 1) return updateCourse(action[0], req);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ action?: string[] }> }) {
  const { action } = await params;
  if (action && action.length === 1) return deleteCourse(action[0]);
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
