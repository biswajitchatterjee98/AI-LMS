import { Brain, Cpu, Network, Sparkles, Bot, Zap } from "lucide-react";

// Purely decorative AI-themed backdrop: a circuit-trace SVG pattern plus large
// glowing icon watermarks. Positions are kept clear of the sidebar's left
// ~300px (which sits opaque-ish on top and would otherwise hide them) so the
// motif reads clearly in the open space around cards on every dashboard page.
const ICONS = [
  { Icon: Brain, top: "8%", left: "34%", size: 120, delay: "0s", duration: "22s" },
  { Icon: Cpu, top: "66%", left: "92%", size: 110, delay: "3s", duration: "26s" },
  { Icon: Network, top: "34%", left: "96%", size: 100, delay: "1.5s", duration: "24s" },
  { Icon: Sparkles, top: "84%", left: "44%", size: 90, delay: "4s", duration: "20s" },
  { Icon: Bot, top: "12%", left: "86%", size: 130, delay: "2s", duration: "28s" },
  { Icon: Zap, top: "56%", left: "30%", size: 80, delay: "5s", duration: "23s" },
];

export function AiBackgroundMotif() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="ai-circuit" width="140" height="140" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="var(--brand-from)" strokeWidth="1.25" opacity="0.3">
              <path d="M10 10 H60 V40 H115" />
              <path d="M20 130 V95 H60" />
              <path d="M130 20 V60 H90 V100" />
              <path d="M70 130 H110 V100" />
            </g>
            <g fill="var(--brand-to)" opacity="0.4">
              <circle cx="10" cy="10" r="3" />
              <circle cx="60" cy="10" r="3" />
              <circle cx="115" cy="40" r="3" />
              <circle cx="20" cy="130" r="3" />
              <circle cx="60" cy="95" r="3" />
              <circle cx="130" cy="20" r="3" />
              <circle cx="90" cy="60" r="3" />
              <circle cx="90" cy="100" r="3" />
              <circle cx="70" cy="130" r="3" />
              <circle cx="110" cy="100" r="3" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ai-circuit)" />
      </svg>
      {ICONS.map(({ Icon, top, left, size, delay, duration }, i) => (
        <div
          key={i}
          className="absolute animate-ai-float"
          style={{ top, left, animationDelay: delay, animationDuration: duration }}
        >
          <div
            className="absolute rounded-full bg-[color-mix(in_oklab,var(--brand-to)_45%,transparent)] blur-2xl"
            style={{ width: size * 1.4, height: size * 1.4, left: -size * 0.2, top: -size * 0.2 }}
          />
          <Icon strokeWidth={1} className="relative text-primary/20" style={{ width: size, height: size }} />
        </div>
      ))}
    </div>
  );
}
