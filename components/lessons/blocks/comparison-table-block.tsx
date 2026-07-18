import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ComparisonTableBlock } from "@/lib/curriculum/blocks";

export function ComparisonTableBlockView({ block }: { block: ComparisonTableBlock }) {
  return (
    <div className="space-y-2">
      {block.title && <h2 className="font-heading text-lg font-semibold tracking-tight">{block.title}</h2>}
      <div className="overflow-hidden rounded-xl border border-border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {block.columns.map((col, i) => (
                <TableHead key={i} className={i === 0 ? "font-heading" : "font-heading text-primary"}>
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {block.rows.map((row, ri) => (
              <TableRow key={ri}>
                {row.map((cell, ci) => (
                  <TableCell key={ci} className={ci === 0 ? "font-medium whitespace-normal" : "whitespace-normal text-muted-foreground"}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
