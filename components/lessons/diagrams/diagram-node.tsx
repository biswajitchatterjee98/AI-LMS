import { Handle, Position, type NodeProps } from "@xyflow/react";

export function DiagramNode({ data, sourcePosition, targetPosition }: NodeProps) {
  const label = data.label as string;
  const description = data.description as string | undefined;
  return (
    <div className="group w-48 rounded-xl border-2 border-primary/30 bg-card px-3.5 py-2.5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg">
      {targetPosition && <Handle type="target" position={targetPosition} className="!bg-primary" />}
      <p className="font-heading text-xs font-semibold leading-snug">{label}</p>
      {description && <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{description}</p>}
      {sourcePosition && <Handle type="source" position={sourcePosition} className="!bg-primary" />}
    </div>
  );
}

export const diagramNodeTypes = { diagramNode: DiagramNode };
