import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RegistrationCtaBlock } from "@/lib/curriculum/blocks";

export function RegistrationCtaBlockView({ block }: { block: RegistrationCtaBlock }) {
  return (
    <div className="brand-gradient relative overflow-hidden rounded-2xl p-6 text-white shadow-[0_8px_30px_-8px_rgb(79_70_229_/_0.5)] sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 85% 15%, white, transparent 45%)",
        }}
      />
      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Rocket className="size-3.5" />
            AI Practitioner Program
          </span>
          <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{block.heading}</h2>
          <p className="max-w-lg text-sm text-white/85">{block.body}</p>
        </div>
        <Link href={block.href} className="shrink-0">
          <Button size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
            {block.buttonLabel}
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
