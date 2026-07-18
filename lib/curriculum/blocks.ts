// Structured lesson-content block schema. Every lesson in the curriculum is authored
// as an ordered array of these blocks instead of a single plain-text blob, so the
// lesson renderer can produce a visually rich, interactive page instead of a text dump.

export type Difficulty = "beginner" | "intermediate" | "advanced";

// Registry of hand-built icon compositions used in lesson hero covers (see
// components/lessons/illustrations/icon-illustration.tsx). No external images.
export type IllustrationKey =
  | "before-after"
  | "ladder"
  | "hierarchy"
  | "compare-brains"
  | "spectrum"
  | "text-gen"
  | "neural-net"
  | "transformer"
  | "diffusion"
  | "image-gen"
  | "email"
  | "report"
  | "presentation"
  | "deepfake"
  | "cybersecurity"
  | "governance"
  | "functional-ai"
  | "strategy"
  | "chatgpt"
  | "gemini"
  | "claude"
  | "llm-compare"
  | "automation"
  | "make"
  | "n8n"
  | "wrap-up"
  | "registration";

export interface HeroBlock {
  type: "hero";
  title: string;
  description: string;
  illustration?: IllustrationKey;
  readTimeMinutes: number;
  difficulty: Difficulty;
}

export interface ParagraphBlock {
  type: "paragraph";
  heading?: string;
  body: string;
}

export interface InfoCardBlock {
  type: "infoCard";
  title: string;
  body: string;
  icon?: string; // lucide-react icon name, e.g. "Sparkles"
}

export interface InfoCardGridBlock {
  type: "infoCardGrid";
  cards: { title: string; body: string; icon?: string }[];
}

export type CalloutVariant = "tip" | "warning" | "myth" | "definition";

export interface CalloutBlock {
  type: "callout";
  variant: CalloutVariant;
  title?: string;
  body: string;
}

export interface KeyTakeawaysBlock {
  type: "keyTakeaways";
  items: string[];
}

export interface StepByStepBlock {
  type: "stepByStep";
  title?: string;
  steps: { title: string; description: string }[];
}

export interface ComparisonTableBlock {
  type: "comparisonTable";
  title?: string;
  columns: string[];
  rows: string[][];
}

export type DiagramKind = "flow" | "hierarchy" | "pyramid" | "timeline" | "neuralNet";

export interface DiagramNode {
  id: string;
  label: string;
  description?: string;
  level?: number; // used by "flow"/"hierarchy" for layered layout, and "pyramid" for stack order (0 = base)
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface DiagramBlock {
  type: "diagram";
  kind: DiagramKind;
  title?: string;
  nodes: DiagramNode[];
  edges?: DiagramEdge[];
  layers?: number[]; // neuron counts per layer, only used by kind === "neuralNet"
}

export interface StatChartBlock {
  type: "statChart";
  chartKind: "bar" | "radar";
  title?: string;
  data: { label: string; value: number }[];
}

export interface QuizQuestionItem {
  id: string;
  kind: "mcq" | "trueFalse";
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizBlock {
  type: "quiz";
  title?: string;
  questions: QuizQuestionItem[];
}

export interface SummaryBlock {
  type: "summary";
  body: string;
}

export interface RegistrationCtaBlock {
  type: "registrationCta";
  heading: string;
  body: string;
  buttonLabel: string;
  href: string;
}

export type LessonBlock =
  | HeroBlock
  | ParagraphBlock
  | InfoCardBlock
  | InfoCardGridBlock
  | CalloutBlock
  | KeyTakeawaysBlock
  | StepByStepBlock
  | ComparisonTableBlock
  | DiagramBlock
  | StatChartBlock
  | QuizBlock
  | SummaryBlock
  | RegistrationCtaBlock;
