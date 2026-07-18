import { Sparkles } from "lucide-react";
import type { SummaryBlock } from "@/lib/curriculum/blocks";

export function SummaryBlockView({ block }: { block: SummaryBlock }) {
  return (
    <div className="glass-panel flex gap-3 rounded-2xl border border-border p-5 shadow-sm">
      <span className="brand-gradient flex size-9 shrink-0 items-center justify-center rounded-xl shadow-sm">
        <Sparkles className="size-4.5 text-white" />
      </span>
      <div className="space-y-1">
        <p className="font-heading text-sm font-semibold">Lesson summary</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{block.body}</p>
      </div>
    </div>
  );
}
