"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, PartyPopper, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { QuizBlock } from "@/lib/curriculum/blocks";

function QuestionItem({
  question,
  index,
  picked,
  onPick,
}: {
  question: QuizBlock["questions"][number];
  index: number;
  picked: number | null;
  onPick: (optionIndex: number) => void;
}) {
  const answered = picked !== null;
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <p className="mb-3 text-sm font-medium">
        <span className="mr-1.5 text-muted-foreground">{index + 1}.</span>
        {question.question}
      </p>
      <div className={cn("grid gap-2", question.kind === "trueFalse" ? "grid-cols-2" : "sm:grid-cols-2")}>
        {question.options.map((opt, i) => {
          const isPicked = picked === i;
          const showCorrect = answered && i === question.correctIndex;
          const showWrong = isPicked && i !== question.correctIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => !answered && onPick(i)}
              disabled={answered}
              className={cn(
                "flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition-all duration-200",
                showCorrect && "border-emerald-500 bg-emerald-500/10",
                showWrong && "border-destructive bg-destructive/10",
                !showCorrect && !showWrong && "hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent"
              )}
            >
              {opt}
              {showCorrect && <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />}
              {showWrong && <XCircle className="size-4 shrink-0 text-destructive" />}
            </button>
          );
        })}
      </div>
      {answered && question.explanation && (
        <p className="mt-2.5 rounded-lg bg-muted/50 p-2.5 text-xs leading-relaxed text-muted-foreground">
          {question.explanation}
        </p>
      )}
    </div>
  );
}

export function QuizBlockView({ block, lessonId }: { block: QuizBlock; lessonId: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const total = block.questions.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = block.questions.filter((q) => answers[q.id] === q.correctIndex).length;

  async function submit() {
    setSubmitted(true);
    setSaving(true);
    try {
      await fetch(`/api/progress/${lessonId}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: Math.round((correctCount / total) * 100),
          correctCount,
          totalCount: total,
        }),
      });
    } finally {
      setSaving(false);
    }
  }

  function retry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold tracking-tight">{block.title || "Check your understanding"}</h2>
        <span className="text-xs font-medium text-muted-foreground">
          {answeredCount}/{total} answered
        </span>
      </div>
      <div className="space-y-3">
        {block.questions.map((q, i) => (
          <QuestionItem
            key={q.id}
            question={q}
            index={i}
            picked={answers[q.id] ?? null}
            onPick={(optionIndex) => setAnswers((a) => ({ ...a, [q.id]: optionIndex }))}
          />
        ))}
      </div>
      {!submitted ? (
        <Button onClick={submit} disabled={answeredCount < total} className="gap-2">
          Submit answers
        </Button>
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-primary/20 bg-secondary p-4">
          <PartyPopper className="size-5 text-primary" />
          <p className="text-sm font-medium">
            You scored {correctCount}/{total} ({Math.round((correctCount / total) * 100)}%)
            {saving && <span className="ml-1 text-muted-foreground">— saving…</span>}
          </p>
          <Button variant="outline" size="sm" onClick={retry} className="ml-auto gap-1.5">
            <RotateCcw className="size-3.5" />
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}
