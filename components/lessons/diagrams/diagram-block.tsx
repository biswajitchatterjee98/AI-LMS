import { FlowDiagram } from "@/components/lessons/diagrams/flow-diagram";
import { HierarchyDiagram } from "@/components/lessons/diagrams/hierarchy-diagram";
import { PyramidDiagram } from "@/components/lessons/diagrams/pyramid-diagram";
import { TimelineDiagram } from "@/components/lessons/diagrams/timeline-diagram";
import { NeuralNetDiagram } from "@/components/lessons/diagrams/neural-net-diagram";
import type { DiagramBlock } from "@/lib/curriculum/blocks";

export function DiagramBlockView({ block }: { block: DiagramBlock }) {
  return (
    <div className="space-y-2">
      {block.title && <h2 className="font-heading text-lg font-semibold tracking-tight">{block.title}</h2>}
      {block.kind === "flow" && <FlowDiagram nodes={block.nodes} edges={block.edges} orientation="horizontal" />}
      {block.kind === "hierarchy" && <HierarchyDiagram nodes={block.nodes} edges={block.edges} />}
      {block.kind === "pyramid" && <PyramidDiagram nodes={block.nodes} />}
      {block.kind === "timeline" && <TimelineDiagram nodes={block.nodes} />}
      {block.kind === "neuralNet" && (
        <NeuralNetDiagram layers={block.layers ?? [3, 4, 4, 1]} labels={block.nodes.map((n) => n.label)} />
      )}
    </div>
  );
}
