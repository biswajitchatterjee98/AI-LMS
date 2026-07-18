"use client";

import type { ReactNode } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from "recharts";

export function ModuleCompletionChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 8, bottom: 8 }}>
        <CartesianGrid stroke="var(--border)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey="label"
          width={150}
          tick={{ fill: "var(--foreground)", fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "var(--muted)" }}
          contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }}
          formatter={(v) => [`${v}%`, "Complete"]}
        />
        <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} maxBarSize={22}>
          <LabelList dataKey="value" position="right" formatter={(v: ReactNode) => `${v}%`} fill="var(--muted-foreground)" fontSize={11} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function QuizScoreChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "var(--border)" }} interval={0} angle={-20} textAnchor="end" height={50} />
        <YAxis domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: "var(--muted)" }}
          contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }}
          formatter={(v) => [`${v}%`, "Score"]}
        />
        <Bar dataKey="value" fill="var(--chart-3)" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
