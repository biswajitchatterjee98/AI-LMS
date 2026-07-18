"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_MODELS } from "@/lib/ai/providers";

export function GenerateAiNotesButton({ digest, title }: { digest: string; title: string }) {
  const [notes, setNotes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "anthropic",
          model: DEFAULT_MODELS.anthropic[0],
          systemPrompt:
            "You are an expert study-notes writer. Given a lesson digest, produce concise, well-structured study notes using short bullet points. No preamble.",
          messages: [{ role: "user", content: `Lesson: ${title}\n\n${digest}\n\nWrite concise study notes.` }],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't generate notes.");
        return;
      }
      setNotes(data.reply);
    } catch {
      setError("Network error reaching the AI provider.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="brand-gradient flex size-8 items-center justify-center rounded-lg">
            <Sparkles className="size-4 text-white" />
          </span>
          <p className="font-heading text-sm font-semibold">AI-generated notes</p>
        </div>
        <Button variant="outline" size="sm" onClick={generate} disabled={loading} className="gap-1.5">
          {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
          {notes ? "Regenerate" : "Generate notes"}
        </Button>
      </div>
      {error && (
        <p className="mt-3 flex items-start gap-1.5 text-xs text-destructive">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          {error}{" "}
          <Link href="/student/settings" className="underline underline-offset-2">
            Go to Settings
          </Link>
        </p>
      )}
      {notes && (
        <p className="mt-3 rounded-xl bg-muted/40 p-3.5 text-sm leading-relaxed whitespace-pre-wrap">{notes}</p>
      )}
    </div>
  );
}
