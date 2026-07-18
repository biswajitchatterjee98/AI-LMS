import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { coursesCol, progressCol } from "@/lib/models";
import { LessonView } from "@/components/lessons/lesson-view";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const session = await getSession();
  if (!session) return null;

  const course = await coursesCol().then((col) => col.findOne({ isPublished: true }));
  if (!course) notFound();

  const allLessons = course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })));
  const index = allLessons.findIndex((l) => l.id === lessonId);
  if (index === -1) notFound();

  const lesson = allLessons[index];
  if (!lesson.contentBlocks) notFound();

  const progressDoc = await progressCol().then((col) => col.findOne({ userId: session.userId, lessonId }));

  return (
    <LessonView
      lesson={{ id: lesson.id, title: lesson.title, contentBlocks: lesson.contentBlocks }}
      courseId={course._id!.toString()}
      moduleId={lesson.moduleId}
      moduleTitle={lesson.moduleTitle}
      courseTitle={course.title}
      initialStatus={progressDoc?.status ?? "not_started"}
      prevLesson={index > 0 ? { id: allLessons[index - 1].id, title: allLessons[index - 1].title } : undefined}
      nextLesson={index < allLessons.length - 1 ? { id: allLessons[index + 1].id, title: allLessons[index + 1].title } : undefined}
    />
  );
}
