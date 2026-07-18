import { Lightbulb, AlertTriangle, HelpCircle, BookMarked } from "lucide-react";
import type { CalloutBlock, CalloutVariant } from "@/lib/curriculum/blocks";

const VARIANT: Record<
  CalloutVariant,
  { icon: typeof Lightbulb; wrap: string; iconWrap: string; label: string }
> = {
  tip: {
    icon: Lightbulb,
    wrap: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20",
    iconWrap: "bg-emerald-500 text-white",
    label: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    wrap: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20",
    iconWrap: "bg-amber-500 text-white",
    label: "Watch out",
  },
  myth: {
    icon: HelpCircle,
    wrap: "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-900/20",
    iconWrap: "bg-rose-500 text-white",
    label: "Myth vs. reality",
  },
  definition: {
    icon: BookMarked,
    wrap: "border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20",
    iconWrap: "brand-gradient text-white",
    label: "Definition",
  },
};

export function CalloutBlockView({ block }: { block: CalloutBlock }) {
  const v = VARIANT[block.variant];
  const Icon = v.icon;
  return (
    <div className={`flex gap-3 rounded-xl border p-4 shadow-sm ${v.wrap}`}>
      <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${v.iconWrap}`}>
        <Icon className="size-4" />
      </span>
      <div className="space-y-0.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {block.title || v.label}
        </p>
        <p className="text-sm leading-relaxed">{block.body}</p>
      </div>
    </div>
  );
}
