import { resolveIcon } from "@/components/lessons/icon-map";
import type { InfoCardBlock, InfoCardGridBlock } from "@/lib/curriculum/blocks";

function Card({ title, body, icon }: { title: string; body: string; icon?: string }) {
  const Icon = resolveIcon(icon);
  return (
    <div className="group flex gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <span className="brand-gradient flex size-9 shrink-0 items-center justify-center rounded-lg shadow-sm">
        <Icon className="size-4.5 text-white" />
      </span>
      <div className="space-y-1">
        <p className="font-heading text-sm font-semibold">{title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

export function InfoCardBlockView({ block }: { block: InfoCardBlock }) {
  return <Card title={block.title} body={block.body} icon={block.icon} />;
}

export function InfoCardGridBlockView({ block }: { block: InfoCardGridBlock }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {block.cards.map((c, i) => (
        <Card key={i} title={c.title} body={c.body} icon={c.icon} />
      ))}
    </div>
  );
}
