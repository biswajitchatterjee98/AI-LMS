"use client";

import { useMemo } from "react";
import { ReactFlow, Background, Controls, Position, MarkerType, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { diagramNodeTypes } from "@/components/lessons/diagrams/diagram-node";
import type { DiagramNode, DiagramEdge } from "@/lib/curriculum/blocks";

const GAP_X = 220;
const GAP_Y = 90;

export function FlowDiagram({
  nodes: rawNodes,
  edges: rawEdges,
  orientation = "horizontal",
  height = 280,
}: {
  nodes: DiagramNode[];
  edges?: DiagramEdge[];
  orientation?: "horizontal" | "vertical";
  height?: number;
}) {
  const { nodes, edges } = useMemo(() => {
    const byLevel = new Map<number, DiagramNode[]>();
    rawNodes.forEach((n) => {
      const level = n.level ?? 0;
      if (!byLevel.has(level)) byLevel.set(level, []);
      byLevel.get(level)!.push(n);
    });

    const nodes: Node[] = [];
    for (const [level, group] of byLevel) {
      group.forEach((n, i) => {
        const across = (i - (group.length - 1) / 2) * GAP_Y;
        const position =
          orientation === "horizontal" ? { x: level * GAP_X, y: across } : { x: across * 1.3, y: level * GAP_Y };
        nodes.push({
          id: n.id,
          type: "diagramNode",
          position,
          data: { label: n.label, description: n.description },
          sourcePosition: orientation === "horizontal" ? Position.Right : Position.Bottom,
          targetPosition: orientation === "horizontal" ? Position.Left : Position.Top,
        });
      });
    }

    const edges: Edge[] = (rawEdges ?? []).map((e, i) => ({
      id: `e-${i}-${e.from}-${e.to}`,
      source: e.from,
      target: e.to,
      label: e.label,
      style: { stroke: "var(--primary)", strokeWidth: 1.5 },
      labelStyle: { fill: "var(--muted-foreground)", fontSize: 11 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "var(--primary)" },
    }));

    return { nodes, edges };
  }, [rawNodes, rawEdges, orientation]);

  return (
    <div style={{ height }} className="overflow-hidden rounded-xl border border-border bg-muted/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={diagramNodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={false}
      >
        <Background gap={18} color="var(--border)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
