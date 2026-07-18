"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlayCircle, TrendingDown, RotateCcw, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LessonRef {
  id: string;
  title: string;
  moduleTitle: string;
}

interface CourseModule {
  id: string;
  title: string;
  lessons: { id: string; title: string; status: string }[];
}

interface Recommendation {
  kind: "continue" | "review" | "practice";
  label: string;
  lesson: LessonRef;
}

export function RecommendationsPanel() {
  const router = useRouter();
  const [recs, setRecs] = useState<Recommendation[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [coursesRes, progressRes] = await Promise.all([fetch("/api/courses"), fetch("/api/progress")]);
      const coursesData = await coursesRes.json();
      const progressData = await progressRes.json();
      if (cancelled) return;

      const course = (coursesData.courses ?? [])[0];
      if (!course) {
        setRecs([]);
        return;
      }
      const progressByLesson = new Map((progressData.progress ?? []).map((p: { lessonId: string }) => [p.lessonId, p]));

      const modules: CourseModule[] = course.modules;
      const allLessons = modules.flatMap((m) =>
        m.lessons.map((l) => ({ ...l, moduleTitle: m.title, status: (progressByLesson.get(l.id) as { status?: string } | undefined)?.status ?? "not_started" }))
      );

      const results: Recommendation[] = [];

      const continueLesson = allLessons.find((l) => l.status !== "done");
      if (continueLesson) {
        results.push({
          kind: "continue",
          label: "Continue where you left off",
          lesson: { id: continueLesson.id, title: continueLesson.title, moduleTitle: continueLesson.moduleTitle },
        });
      }

      const startedModules = modules
        .map((m) => {
          const done = m.lessons.filter((l) => progressByLesson.has(l.id) && (progressByLesson.get(l.id) as { status?: string }).status === "done").length;
          const started = m.lessons.some((l) => progressByLesson.has(l.id));
          return { module: m, pct: m.lessons.length > 0 ? done / m.lessons.length : 0, started };
        })
        .filter((m) => m.started && m.pct < 1);
      startedModules.sort((a, b) => a.pct - b.pct);
      const weakestModule = startedModules[0];
      if (weakestModule) {
        const firstIncomplete = weakestModule.module.lessons.find(
          (l) => !progressByLesson.has(l.id) || (progressByLesson.get(l.id) as { status?: string }).status !== "done"
        );
        if (firstIncomplete && firstIncomplete.id !== continueLesson?.id) {
          results.push({
            kind: "review",
            label: `Review: ${weakestModule.module.title}`,
            lesson: { id: firstIncomplete.id, title: firstIncomplete.title, moduleTitle: weakestModule.module.title },
          });
        }
      }

      const quizAttempts = allLessons
        .map((l) => ({ lesson: l, score: (progressByLesson.get(l.id) as { quizScore?: number } | undefined)?.quizScore }))
        .filter((q): q is { lesson: (typeof allLessons)[number]; score: number } => typeof q.score === "number" && q.score < 70);
      quizAttempts.sort((a, b) => a.score - b.score);
      const weakestQuiz = quizAttempts[0];
      if (weakestQuiz) {
        results.push({
          kind: "practice",
          label: `Practice: ${weakestQuiz.lesson.title} (scored ${weakestQuiz.score}%)`,
          lesson: { id: weakestQuiz.lesson.id, title: weakestQuiz.lesson.title, moduleTitle: weakestQuiz.lesson.moduleTitle },
        });
      }

      setRecs(results);
    }
    load().catch(() => setRecs([]));
    return () => {
      cancelled = true;
    };
  }, []);

  const icons = { continue: PlayCircle, review: RotateCcw, practice: TrendingDown };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="size-4 text-primary" />
          For you
        </CardTitle>
        <CardDescription>Personalized suggestions based on your progress</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-2.5">
        {recs === null && <p className="text-xs text-muted-foreground">Loading recommendations...</p>}
        {recs?.length === 0 && <p className="text-xs text-muted-foreground">You're all caught up! 🎉</p>}
        {recs?.map((r, i) => {
          const Icon = icons[r.kind];
          return (
            <button
              key={i}
              onClick={() => router.push(`/student/tutor?lesson=${r.lesson.id}`)}
              className="group flex w-full items-start gap-2.5 rounded-xl border border-border bg-card p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs font-semibold leading-snug">{r.label}</p>
                <p className="truncate text-[11px] text-muted-foreground">{r.lesson.moduleTitle}</p>
              </div>
            </button>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          className="mt-1 w-full"
          onClick={() => router.push("/student/courses")}
        >
          Browse all lessons
        </Button>
      </CardContent>
    </Card>
  );
}
