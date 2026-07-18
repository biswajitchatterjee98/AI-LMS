import { FlowDiagram } from "@/components/lessons/diagrams/flow-diagram";
import type { DiagramNode, DiagramEdge } from "@/lib/curriculum/blocks";

export function HierarchyDiagram({ nodes, edges }: { nodes: DiagramNode[]; edges?: DiagramEdge[] }) {
  return <FlowDiagram nodes={nodes} edges={edges} orientation="vertical" height={320} />;
}
