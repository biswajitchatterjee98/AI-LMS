import type { DiagramNode } from "@/lib/curriculum/blocks";

// Pure CSS/SVG stacked trapezoid "pyramid" — level 0 = base (widest), highest level = tip (narrowest).
export function PyramidDiagram({ nodes }: { nodes: DiagramNode[] }) {
  const sorted = [...nodes].sort((a, b) => (b.level ?? 0) - (a.level ?? 0)); // top (highest level) first
  const steps = sorted.length;

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/10 p-6">
      {sorted.map((n, i) => {
        const widthPct = 40 + (i / Math.max(steps - 1, 1)) * 55; // narrow at top, wide at base
        const hue = i / Math.max(steps - 1, 1);
        return (
          <div
            key={n.id}
            className="group flex flex-col items-center justify-center rounded-lg px-4 py-3 text-center shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              width: `${widthPct}%`,
              backgroundImage: `linear-gradient(135deg, color-mix(in oklab, var(--brand-from) ${100 - hue * 40}%, var(--brand-to)), color-mix(in oklab, var(--brand-to) ${60 + hue * 30}%, var(--brand-from)))`,
            }}
          >
            <p className="font-heading text-xs font-semibold text-white sm:text-sm">{n.label}</p>
            {n.description && <p className="mt-0.5 text-[11px] text-white/85">{n.description}</p>}
          </div>
        );
      })}
    </div>
  );
}
