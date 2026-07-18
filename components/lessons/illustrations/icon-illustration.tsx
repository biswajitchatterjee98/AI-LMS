import {
  ArrowLeftRight,
  Layers3,
  Network,
  Brain,
  GaugeCircle,
  PenLine,
  Cpu,
  Sparkles,
  Image as ImageIcon,
  Mail,
  FileText,
  Presentation,
  ScanFace,
  ShieldAlert,
  Scale,
  Workflow,
  Target,
  MessageSquare,
  Gem,
  Bot,
  ListChecks,
  Zap,
  Share2,
  PartyPopper,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IllustrationKey } from "@/lib/curriculum/blocks";

const REGISTRY: Record<IllustrationKey, { icon: LucideIcon; accent: LucideIcon }> = {
  "before-after": { icon: ArrowLeftRight, accent: GaugeCircle },
  ladder: { icon: Layers3, accent: Target },
  hierarchy: { icon: Network, accent: Layers3 },
  "compare-brains": { icon: Brain, accent: Cpu },
  spectrum: { icon: GaugeCircle, accent: Sparkles },
  "text-gen": { icon: PenLine, accent: Sparkles },
  "neural-net": { icon: Network, accent: Cpu },
  transformer: { icon: Layers3, accent: Network },
  diffusion: { icon: ImageIcon, accent: Sparkles },
  "image-gen": { icon: ImageIcon, accent: Cpu },
  email: { icon: Mail, accent: Sparkles },
  report: { icon: FileText, accent: ListChecks },
  presentation: { icon: Presentation, accent: Sparkles },
  deepfake: { icon: ScanFace, accent: ShieldAlert },
  cybersecurity: { icon: ShieldAlert, accent: Zap },
  governance: { icon: Scale, accent: ClipboardCheck },
  "functional-ai": { icon: Workflow, accent: Cpu },
  strategy: { icon: Target, accent: GaugeCircle },
  chatgpt: { icon: MessageSquare, accent: Sparkles },
  gemini: { icon: Gem, accent: Sparkles },
  claude: { icon: Bot, accent: Sparkles },
  "llm-compare": { icon: Scale, accent: MessageSquare },
  automation: { icon: Workflow, accent: Zap },
  make: { icon: Share2, accent: Workflow },
  n8n: { icon: Bot, accent: Workflow },
  "wrap-up": { icon: PartyPopper, accent: ListChecks },
  registration: { icon: ClipboardCheck, accent: Sparkles },
};

export function IconIllustration({ illustration, className }: { illustration?: IllustrationKey; className?: string }) {
  const entry = illustration ? REGISTRY[illustration] : undefined;
  const Icon = entry?.icon ?? Sparkles;
  const Accent = entry?.accent ?? Cpu;

  return (
    <div
      className={cn(
        "relative flex h-full min-h-40 items-center justify-center overflow-hidden rounded-2xl",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle at 25% 20%, color-mix(in oklab, var(--brand-from) 35%, transparent), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--brand-to) 30%, transparent), transparent 55%), linear-gradient(135deg, color-mix(in oklab, var(--brand-from) 12%, var(--card)), color-mix(in oklab, var(--brand-to) 12%, var(--card)))",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--foreground) 14%, transparent) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="brand-gradient relative flex size-20 items-center justify-center rounded-3xl shadow-[0_8px_30px_-8px_rgb(79_70_229_/_0.55)] transition-transform duration-300 group-hover:scale-105">
        <Icon className="size-10 text-white" strokeWidth={1.75} />
      </div>
      <div className="absolute right-[18%] top-[20%] flex size-10 items-center justify-center rounded-xl border border-border bg-card/90 shadow-md backdrop-blur">
        <Accent className="size-5 text-primary" strokeWidth={1.75} />
      </div>
    </div>
  );
}
