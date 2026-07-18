"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LabelList,
} from "recharts";
import type { StatChartBlock } from "@/lib/curriculum/blocks";

export function StatChartBlockView({ block }: { block: StatChartBlock }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      {block.title && <h2 className="mb-3 font-heading text-base font-semibold tracking-tight">{block.title}</h2>}
      <div className="h-72 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          {block.chartKind === "radar" ? (
            <RadarChart data={block.data} outerRadius="72%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="label" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
              <Radar
                name={block.title || "Score"}
                dataKey="value"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.35}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
            </RadarChart>
          ) : (
            <BarChart data={block.data} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={56}>
                <LabelList dataKey="value" position="top" fill="var(--muted-foreground)" fontSize={11} />
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
