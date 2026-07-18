import { HeroBlockView } from "@/components/lessons/blocks/hero-block";
import { ParagraphBlockView } from "@/components/lessons/blocks/paragraph-block";
import { InfoCardBlockView, InfoCardGridBlockView } from "@/components/lessons/blocks/info-card-block";
import { CalloutBlockView } from "@/components/lessons/blocks/callout-block";
import { KeyTakeawaysBlockView } from "@/components/lessons/blocks/key-takeaways-block";
import { StepByStepBlockView } from "@/components/lessons/blocks/step-by-step-block";
import { ComparisonTableBlockView } from "@/components/lessons/blocks/comparison-table-block";
import { DiagramBlockView } from "@/components/lessons/diagrams/diagram-block";
import { StatChartBlockView } from "@/components/lessons/blocks/stat-chart-block";
import { QuizBlockView } from "@/components/lessons/blocks/quiz-block";
import { SummaryBlockView } from "@/components/lessons/blocks/summary-block";
import { RegistrationCtaBlockView } from "@/components/lessons/blocks/registration-cta-block";
import { LessonProgressBar } from "@/components/lessons/lesson-progress-bar";
import { GenerateAiNotesButton } from "@/components/lessons/generate-ai-notes-button";
import { buildLessonDigest } from "@/lib/curriculum/lesson-digest";
import type { LessonBlock } from "@/lib/curriculum/blocks";

export function LessonRenderer({
  blocks,
  lessonId,
  lessonTitle,
}: {
  blocks: LessonBlock[];
  lessonId: string;
  lessonTitle: string;
}) {
  const digest = buildLessonDigest(lessonTitle, blocks);

  return (
    <div className="space-y-6">
      <LessonProgressBar />
      {blocks.map((block, i) => (
        <div key={i} className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500" style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}>
          <BlockSwitch block={block} lessonId={lessonId} />
        </div>
      ))}
      <GenerateAiNotesButton digest={digest} title={lessonTitle} />
    </div>
  );
}

function BlockSwitch({ block, lessonId }: { block: LessonBlock; lessonId: string }) {
  switch (block.type) {
    case "hero":
      return <HeroBlockView block={block} />;
    case "paragraph":
      return <ParagraphBlockView block={block} />;
    case "infoCard":
      return <InfoCardBlockView block={block} />;
    case "infoCardGrid":
      return <InfoCardGridBlockView block={block} />;
    case "callout":
      return <CalloutBlockView block={block} />;
    case "keyTakeaways":
      return <KeyTakeawaysBlockView block={block} />;
    case "stepByStep":
      return <StepByStepBlockView block={block} />;
    case "comparisonTable":
      return <ComparisonTableBlockView block={block} />;
    case "diagram":
      return <DiagramBlockView block={block} />;
    case "statChart":
      return <StatChartBlockView block={block} />;
    case "quiz":
      return <QuizBlockView block={block} lessonId={lessonId} />;
    case "summary":
      return <SummaryBlockView block={block} />;
    case "registrationCta":
      return <RegistrationCtaBlockView block={block} />;
    default:
      return null;
  }
}
