import type { CurriculumCourse } from "@/lib/curriculum/types";
import { module01AiFoundations } from "@/lib/curriculum/modules/01-ai-foundations";
import { module02HowAiWorks } from "@/lib/curriculum/modules/02-how-ai-works";
import { module03AiProductivity } from "@/lib/curriculum/modules/03-ai-productivity";
import { module04AiSecurityEthics } from "@/lib/curriculum/modules/04-ai-security-ethics";
import { module05AiInBusiness } from "@/lib/curriculum/modules/05-ai-in-business";
import { module06LargeLanguageModels } from "@/lib/curriculum/modules/06-large-language-models";
import { module07Automation } from "@/lib/curriculum/modules/07-automation";
import { module08FinalSection } from "@/lib/curriculum/modules/08-final-section";

export const curriculumCourse: CurriculumCourse = {
  id: "ai-practitioner-program",
  title: "AI Practitioner Program",
  description:
    "A complete, practitioner-level curriculum covering AI foundations, how AI actually works, productivity, security & ethics, business strategy, large language models, and automation.",
  isPublished: true,
  modules: [
    module01AiFoundations,
    module02HowAiWorks,
    module03AiProductivity,
    module04AiSecurityEthics,
    module05AiInBusiness,
    module06LargeLanguageModels,
    module07Automation,
    module08FinalSection,
  ],
};

export * from "@/lib/curriculum/types";
export * from "@/lib/curriculum/blocks";
