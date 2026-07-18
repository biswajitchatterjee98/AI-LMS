import { CheckCircle2 } from "lucide-react";
import type { KeyTakeawaysBlock } from "@/lib/curriculum/blocks";

export function KeyTakeawaysBlockView({ block }: { block: KeyTakeawaysBlock }) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary p-5 shadow-sm">
      <p className="mb-3 font-heading text-sm font-semibold text-primary">Key takeaways</p>
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
