"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Uses the browser's native print engine (via `window.print()` + a print-only
// stylesheet, see `#printable-lesson` in globals.css) so the exported PDF is
// rendered by the same engine as the on-screen page - full fidelity for
// gradients, color-mix(), diagrams, and tables, instead of a JS reimplementation
// of CSS that silently drops unsupported rules (which is what html2canvas did).
export function DownloadPdfButton({ fileName }: { fileName: string }) {
  function handleClick() {
    const previousTitle = document.title;
    document.title = fileName.replace(/\.pdf$/i, "");
    const restore = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  }

  return (
    <Button variant="outline" onClick={handleClick} className="w-full gap-2 sm:w-auto">
      <Download className="size-4" />
      Download PDF
    </Button>
  );
}
