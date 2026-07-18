import { Clock, GaugeCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconIllustration } from "@/components/lessons/illustrations/icon-illustration";
import type { HeroBlock } from "@/lib/curriculum/blocks";

const difficultyStyle: Record<HeroBlock["difficulty"], string> = {
  beginner: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800",
  intermediate: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-800",
  advanced: "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-800",
};

export function HeroBlockView({ block }: { block: HeroBlock }) {
  return (
    <div className="group grid gap-5 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:grid-cols-[1.3fr_1fr] sm:p-6">
      <div className="flex flex-col justify-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${difficultyStyle[block.difficulty]}`}>
            <GaugeCircle className="size-3.5" />
            {block.difficulty}
          </span>
          <Badge variant="outline" className="gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {block.readTimeMinutes} min read
          </Badge>
        </div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {block.title}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{block.description}</p>
      </div>
      <IconIllustration illustration={block.illustration} className="min-h-44" />
    </div>
  );
}
