import type { ParagraphBlock } from "@/lib/curriculum/blocks";

export function ParagraphBlockView({ block }: { block: ParagraphBlock }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h2 className="font-heading text-lg font-semibold tracking-tight">{block.heading}</h2>
      )}
      <p className="text-sm leading-relaxed text-foreground/90 sm:text-[15px]">{block.body}</p>
    </div>
  );
}
