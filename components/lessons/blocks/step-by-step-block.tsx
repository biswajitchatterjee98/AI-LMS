import type { StepByStepBlock } from "@/lib/curriculum/blocks";

export function StepByStepBlockView({ block }: { block: StepByStepBlock }) {
  return (
    <div className="space-y-3">
      {block.title && <h2 className="font-heading text-lg font-semibold tracking-tight">{block.title}</h2>}
      <ol className="space-y-3">
        {block.steps.map((step, i) => (
          <li key={i} className="group flex gap-3.5 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
            <span className="brand-gradient flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white">
              {i + 1}
            </span>
            <div className="space-y-0.5">
              <p className="font-heading text-sm font-semibold">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
