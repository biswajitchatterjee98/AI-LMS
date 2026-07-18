"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CheckCircle2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonRenderer } from "@/components/lessons/lesson-renderer";
import { DownloadPdfButton } from "@/components/lessons/download-pdf-button";
import type { LessonBlock } from "@/lib/curriculum/blocks";

interface LessonNav {
  id: string;
  title: string;
}

export function LessonView({
  lesson,
  courseId,
  moduleId,
  moduleTitle,
  courseTitle,
  initialStatus,
  prevLesson,
  nextLesson,
}: {
  lesson: { id: string; title: string; contentBlocks: LessonBlock[] };
  courseId: string;
  moduleId: string;
  moduleTitle: string;
  courseTitle: string;
  initialStatus: "not_started" | "in_progress" | "done";
  prevLesson?: LessonNav;
  nextLesson?: LessonNav;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const pdfFileName = `${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}.pdf`;

  useEffect(() => {
    if (initialStatus === "not_started") {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, moduleId, lessonId: lesson.id, status: "in_progress", completionPercentage: 20 }),
      }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  async function markComplete() {
    setSaving(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, moduleId, lessonId: lesson.id, status: "done", completionPercentage: 100 }),
      });
      setStatus("done");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <div id="printable-lesson">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground print:mb-4">
          <span>{courseTitle}</span>
          <span>/</span>
          <span>{moduleTitle}</span>
        </div>

        <LessonRenderer blocks={lesson.contentBlocks} lessonId={lesson.id} lessonTitle={lesson.title} />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={markComplete}
          disabled={status === "done" || saving}
          className="gap-2"
          variant={status === "done" ? "outline" : "default"}
        >
          <CheckCircle2 className="size-4" />
          {status === "done" ? "Lesson complete" : "Mark complete"}
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row">
          <DownloadPdfButton fileName={pdfFileName} />
          <Link href={`/student/tutor?lesson=${lesson.id}`}>
            <Button variant="outline" className="w-full gap-2 sm:w-auto">
              <Bot className="size-4" />
              Ask the Tutor about this lesson
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        {prevLesson ? (
          <Link href={`/student/courses/${prevLesson.id}`} className="min-w-0">
            <Button variant="ghost" className="h-auto min-w-0 max-w-56 flex-col items-start gap-0 px-3 py-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3.5" /> Previous
              </span>
              <span className="truncate text-sm font-medium">{prevLesson.title}</span>
            </Button>
          </Link>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <Link href={`/student/courses/${nextLesson.id}`} className="min-w-0">
            <Button variant="ghost" className="h-auto min-w-0 max-w-56 flex-col items-end gap-0 px-3 py-2 text-right">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                Next <ChevronRight className="size-3.5" />
              </span>
              <span className="truncate text-sm font-medium">{nextLesson.title}</span>
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
