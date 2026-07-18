import Link from "next/link";
import { CheckCircle2, PlayCircle, Circle, Clock, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { getSession } from "@/lib/auth";
import { coursesCol, progressCol } from "@/lib/models";

const statusIcon = { done: CheckCircle2, in_progress: PlayCircle, not_started: Circle };
const statusColor = {
  done: "text-emerald-600",
  in_progress: "text-primary",
  not_started: "text-muted-foreground",
};

export default async function StudentCoursesPage() {
  const session = await getSession();
  if (!session) return null;

  const [course, progressDocs] = await Promise.all([
    coursesCol().then((col) => col.findOne({ isPublished: true })),
    progressCol().then((col) => col.find({ userId: session.userId }).toArray()),
  ]);

  if (!course) {
    return <p className="text-sm text-muted-foreground">No course is published yet.</p>;
  }

  const progressByLesson = new Map(progressDocs.map((p) => [p.lessonId, p]));

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const doneCount = allLessons.filter((l) => progressByLesson.get(l.id)?.status === "done").length;
  const overallPct = allLessons.length > 0 ? Math.round((doneCount / allLessons.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">{course.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{course.description}</p>
          </div>
          <Badge variant="outline" className="gap-1.5 text-sm">
            <BookOpen className="size-3.5" />
            {doneCount}/{allLessons.length} lessons complete
          </Badge>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-[linear-gradient(90deg,var(--brand-from),var(--brand-to))] transition-all duration-700 ease-out"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Accordion multiple defaultValue={course.modules[0] ? [course.modules[0].id] : []}>
            {course.modules.map((mod, mi) => {
              const modDone = mod.lessons.filter((l) => progressByLesson.get(l.id)?.status === "done").length;
              return (
                <AccordionItem key={mod.id} value={mod.id}>
                  <AccordionTrigger className="py-4">
                    <div className="flex w-full items-center gap-3 pr-2">
                      <span className="brand-gradient flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white">
                        {mi + 1}
                      </span>
                      <div className="flex-1 text-left">
                        <p className="font-heading text-sm font-semibold">{mod.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {modDone}/{mod.lessons.length} complete
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1.5 pl-10">
                      {mod.lessons.map((lesson) => {
                        const status = progressByLesson.get(lesson.id)?.status ?? "not_started";
                        const Icon = statusIcon[status];
                        return (
                          <li key={lesson.id}>
                            <Link
                              href={`/student/courses/${lesson.id}`}
                              className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:translate-x-0.5 hover:bg-accent"
                            >
                              <span className="flex items-center gap-2.5">
                                <Icon className={`size-4 shrink-0 ${statusColor[status]}`} />
                                <span className="group-hover:text-accent-foreground">{lesson.title}</span>
                              </span>
                              <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="size-3.5" />
                                {lesson.estMinutes} min
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
