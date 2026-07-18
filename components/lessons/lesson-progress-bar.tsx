"use client";

import { useEffect, useState } from "react";

export function LessonProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setPct(scrollable > 0 ? Math.min(100, Math.round((doc.scrollTop / scrollable) * 100)) : 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-16 z-[5] -mx-4 h-1 bg-muted/50 md:-mx-6 print:hidden">
      <div
        className="h-full bg-[linear-gradient(90deg,var(--brand-from),var(--brand-to))] transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
