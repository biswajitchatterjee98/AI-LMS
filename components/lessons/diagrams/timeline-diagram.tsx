import type { DiagramNode } from "@/lib/curriculum/blocks";

export function TimelineDiagram({ nodes }: { nodes: DiagramNode[] }) {
  const sorted = [...nodes].sort((a, b) => (a.level ?? 0) - (b.level ?? 0));

  return (
    <div className="rounded-xl border border-border bg-muted/10 p-6">
      <div className="grid gap-6 sm:grid-flow-col sm:auto-cols-fr">
        {sorted.map((n, i) => (
          <div key={n.id} className="group relative flex flex-col items-center gap-2 text-center">
            <div className="relative flex w-full items-center">
              <div className={`h-0.5 flex-1 ${i === 0 ? "bg-transparent" : "brand-gradient"}`} />
              <span className="brand-gradient z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white shadow-md transition-transform duration-200 group-hover:scale-110">
                {i + 1}
              </span>
              <div className={`h-0.5 flex-1 ${i === sorted.length - 1 ? "bg-transparent" : "brand-gradient"}`} />
            </div>
            <p className="font-heading text-xs font-semibold sm:text-sm">{n.label}</p>
            {n.description && <p className="text-[11px] leading-snug text-muted-foreground">{n.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
