export function NeuralNetDiagram({ layers, labels }: { layers: number[]; labels?: string[] }) {
  const xGap = 140;
  const yGap = 48;
  const padding = 40;
  const maxNeurons = Math.max(...layers);
  const width = (layers.length - 1) * xGap + padding * 2;
  const height = (maxNeurons - 1) * yGap + padding * 2;

  const positions = layers.map((count, li) =>
    Array.from({ length: count }, (_, ni) => ({
      x: padding + li * xGap,
      y: height / 2 + (ni - (count - 1) / 2) * yGap,
    }))
  );

  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let li = 0; li < positions.length - 1; li++) {
    for (const a of positions[li]) {
      for (const b of positions[li + 1]) {
        lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
      }
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-muted/10 p-4">
      <svg viewBox={`0 0 ${width} ${height + 32}`} width="100%" height={Math.min(height + 32, 320)} className="mx-auto">
        <g opacity={0.35}>
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="var(--primary)" strokeWidth={1} />
          ))}
        </g>
        {positions.map((layer, li) =>
          layer.map((p, ni) => (
            <circle
              key={`${li}-${ni}`}
              cx={p.x}
              cy={p.y}
              r={10}
              fill="var(--card)"
              stroke="var(--primary)"
              strokeWidth={2}
              className="transition-all duration-200"
            />
          ))
        )}
        {labels?.map((label, li) => (
          <text
            key={li}
            x={padding + li * xGap}
            y={height + 24}
            textAnchor="middle"
            fontSize={11}
            fill="var(--muted-foreground)"
            fontWeight={500}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
