"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Bot, User, Send, AlertTriangle, X, FileText, HelpCircle, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEFAULT_MODELS, PROVIDER_LABELS } from "@/lib/ai/providers";
import type { AIProvider } from "@/lib/models";
import { RecommendationsPanel } from "@/components/tutor/recommendations-panel";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface LessonContext {
  lessonId: string;
  title: string;
  moduleTitle: string;
  courseTitle: string;
  digest: string;
  nextLessonId: string | null;
  nextLessonTitle: string | null;
}

const BASE_SYSTEM_PROMPT =
  "You are a friendly, encouraging AI tutor for the AI Practitioner Program curriculum (AI Foundations, How AI Works, AI Productivity, Security & Ethics, AI in Business, LLMs, and Automation). Keep answers short, concrete, and beginner-friendly. Never solve live assessment questions directly - guide the student toward the answer instead.";

function TutorChat() {
  const params = useSearchParams();
  const router = useRouter();
  const lessonId = params.get("lesson");

  const [lessonContext, setLessonContext] = useState<LessonContext | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! Ask me anything about the curriculum - AI foundations, LLMs, automation, ethics, or anything else.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<AIProvider>("anthropic");
  const [model, setModel] = useState(DEFAULT_MODELS.anthropic[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!lessonId) {
      setLessonContext(null);
      return;
    }
    fetch(`/api/courses/lesson/${lessonId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.lessonId) setLessonContext(data);
      })
      .catch(() => {});
  }, [lessonId]);

  function onProviderChange(p: AIProvider) {
    setProvider(p);
    setModel(DEFAULT_MODELS[p][0]);
  }

  async function sendMessage(text: string) {
    if (!text.trim() || streaming) return;
    setError(null);
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setStreaming(true);

    const systemPrompt = lessonContext
      ? `${BASE_SYSTEM_PROMPT}\n\nThe student is currently viewing the lesson "${lessonContext.title}" (Module: ${lessonContext.moduleTitle}). Lesson summary: ${lessonContext.digest}. Ground your answers in this lesson's content when relevant.`
      : BASE_SYSTEM_PROMPT;

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          model,
          systemPrompt,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong talking to the AI provider.");
        return;
      }
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "assistant", content: data.reply }]);
    } catch {
      setError("Network error reaching the AI provider.");
    } finally {
      setStreaming(false);
    }
  }

  function send() {
    sendMessage(input);
  }

  function clearLesson() {
    router.replace("/student/tutor");
  }

  const quickActions = [
    { label: "Summarize this lesson", icon: FileText, prompt: "Summarize this lesson in 5 concise bullet points." },
    { label: "Generate a quiz", icon: HelpCircle, prompt: "Generate 3 short quiz questions with answers to test my understanding of this lesson." },
    { label: "Explain this concept", icon: Lightbulb, prompt: "Pick the single most important concept in this lesson and explain it with a simple, concrete analogy." },
    {
      label: "Suggest next lesson",
      icon: ArrowRight,
      prompt: lessonContext?.nextLessonTitle
        ? `What should I understand well before moving on to "${lessonContext.nextLessonTitle}"?`
        : "Based on the curriculum, what should I study next?",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="flex h-[calc(100vh-8rem)] flex-col">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">AI Tutor</h1>
            <CardDescription>Chat with the curriculum tutor, powered by your own AI agent.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={provider} onValueChange={(v) => v && onProviderChange(v as AIProvider)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(PROVIDER_LABELS) as AIProvider[]).map((p) => (
                  <SelectItem key={p} value={p}>
                    {PROVIDER_LABELS[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={model} onValueChange={(v) => v && setModel(v)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_MODELS[provider].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {lessonContext && (
          <div className="mb-3 flex items-center gap-2 rounded-full border border-primary/30 bg-secondary py-1.5 pl-3 pr-1.5 text-xs font-medium">
            <span className="text-primary">Discussing:</span>
            <span className="truncate">{lessonContext.title}</span>
            <button
              onClick={clearLesson}
              className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full hover:bg-background/60"
              aria-label="Clear lesson context"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}

        {lessonContext && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {quickActions.map((qa) => (
              <Button
                key={qa.label}
                variant="outline"
                size="sm"
                disabled={streaming}
                onClick={() => sendMessage(qa.prompt)}
                className="gap-1.5 text-xs"
              >
                <qa.icon className="size-3.5" />
                {qa.label}
              </Button>
            ))}
          </div>
        )}

        <Card className="flex flex-1 flex-col overflow-hidden">
          <CardHeader className="border-b py-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bot className="size-4 text-primary" /> Tutor &middot; {PROVIDER_LABELS[provider]}
            </CardTitle>
          </CardHeader>
          <CardContent ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                  {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4 text-primary" />}
                </div>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {streaming && (
              <div className="flex gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Bot className="size-4 text-primary" />
                </div>
                <div className="max-w-[80%] rounded-lg bg-muted px-3 py-2 text-sm">
                  <span className="animate-pulse">&hellip;</span>
                </div>
              </div>
            )}
          </CardContent>
          {error && (
            <div className="flex items-start gap-2 border-t bg-destructive/5 px-3 py-2 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>
                {error}{" "}
                <Link href="/student/settings" className="underline underline-offset-2">
                  Go to Settings
                </Link>
              </span>
            </div>
          )}
          <div className="flex items-end gap-2 border-t p-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={lessonContext ? `Ask about "${lessonContext.title}"...` : "Ask the tutor anything..."}
              rows={1}
              className="resize-none"
            />
            <Button onClick={send} disabled={streaming || !input.trim()}>
              <Send className="size-4" />
            </Button>
          </div>
        </Card>
      </div>

      <div className="hidden lg:block">
        <RecommendationsPanel />
      </div>
    </div>
  );
}

export default function StudentTutorPage() {
  return (
    <Suspense>
      <TutorChat />
    </Suspense>
  );
}
