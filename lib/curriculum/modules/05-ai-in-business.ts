import type { CurriculumModule } from "@/lib/curriculum/types";

export const module05AiInBusiness: CurriculumModule = {
  id: "m5-ai-in-business",
  title: "AI in Business",
  lessons: [
    {
      id: "m5-l1-functional-ai",
      title: "Functional AI",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Functional AI",
          description:
            "AI doesn't need a company-wide transformation to create value — it can be applied function by function, starting with the teams that feel the most pain today.",
          illustration: "functional-ai",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Marketing", body: "AI drafts campaign copy, personalizes messaging, and analyzes performance in real time.", icon: "Sparkles" },
            { title: "Sales", body: "AI scores leads, drafts outreach, and summarizes call transcripts automatically.", icon: "TrendingUp" },
            { title: "HR", body: "AI screens resumes, drafts job descriptions, and answers routine employee questions.", icon: "Users" },
            { title: "Finance", body: "AI flags anomalies in transactions and accelerates reconciliation and forecasting.", icon: "DollarSign" },
            { title: "Operations", body: "AI predicts inventory needs and optimizes scheduling and logistics.", icon: "Workflow" },
            { title: "Customer Support", body: "AI resolves routine tickets instantly and drafts responses for complex ones.", icon: "MessageSquare" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          body: "Start with the function that has the clearest, most repetitive workflow and the most measurable outcome — a narrow, well-defined pilot builds trust faster than a broad, ambiguous one.",
        },
        {
          type: "keyTakeaways",
          items: [
            "'Functional AI' means applying AI within a specific business function rather than a sweeping company-wide overhaul.",
            "Marketing, Sales, HR, Finance, Operations, and Support all have distinct, well-understood AI use cases today.",
            "Starting with a narrow, measurable function-level pilot builds organizational trust for wider adoption.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m5-l1-q1",
              kind: "mcq",
              question: "What does 'Functional AI' refer to?",
              options: [
                "AI that only works part of the time",
                "Applying AI within a specific business function, like Sales or HR",
                "A single AI model that replaces every business department",
                "AI systems that have no practical use cases",
              ],
              correctIndex: 1,
              explanation: "Functional AI refers to targeted AI adoption within specific departments and workflows.",
            },
            {
              id: "m5-l1-q2",
              kind: "trueFalse",
              question: "A narrow, well-defined pilot in one function typically builds more trust than a broad, ambiguous company-wide rollout.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "Narrow, measurable pilots demonstrate clear value and build confidence for broader adoption.",
            },
          ],
        },
        {
          type: "summary",
          body: "Functional AI applies targeted AI use cases within individual business functions — Marketing, Sales, HR, Finance, Operations, and Support — as a practical starting point for adoption.",
        },
      ],
    },
    {
      id: "m5-l2-ai-strategy",
      title: "AI Strategy",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "AI Strategy",
          description:
            "Moving from scattered AI experiments to a real strategy means picking the right use cases, proving value fast, and scaling deliberately.",
          illustration: "strategy",
          readTimeMinutes: 7,
          difficulty: "intermediate",
        },
        {
          type: "stepByStep",
          title: "A practical AI strategy framework",
          steps: [
            { title: "Identify high-value use cases", description: "Prioritize by a mix of business impact and feasibility, not just novelty." },
            { title: "Assess data readiness", description: "Check whether the data needed for a use case actually exists and is usable." },
            { title: "Pilot small", description: "Run a scoped pilot with a clear success metric before any larger investment." },
            { title: "Measure ROI", description: "Compare pilot results against the metric you defined up front — time saved, cost reduced, revenue lifted." },
            { title: "Scale and govern", description: "Roll out proven pilots more broadly, with the governance guardrails from the Ethics module in place." },
          ],
        },
        {
          type: "statChart",
          chartKind: "bar",
          title: "Where organizations typically see fastest AI ROI (illustrative)",
          data: [
            { label: "Support", value: 82 },
            { label: "Marketing", value: 71 },
            { label: "Sales", value: 66 },
            { label: "Finance", value: 58 },
            { label: "Operations", value: 54 },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          body: "The pattern above is illustrative, not a universal rule — your organization's fastest-ROI function depends on your own data readiness and process maturity. Use it as a starting hypothesis to test, not a conclusion.",
        },
        {
          type: "keyTakeaways",
          items: [
            "A real AI strategy prioritizes use cases by impact and feasibility, not novelty.",
            "Small, metric-driven pilots de-risk larger AI investments before scaling.",
            "Scaling an AI pilot should always come paired with the governance guardrails covered in Module 4.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m5-l2-q1",
              kind: "mcq",
              question: "What should come before scaling an AI pilot company-wide?",
              options: [
                "Nothing — scale immediately once a pilot looks promising",
                "A measured, small-scale pilot with a clear success metric",
                "Hiring an entirely new department",
                "Waiting for a competitor to do it first",
              ],
              correctIndex: 1,
              explanation: "A well-scoped, metric-driven pilot validates value and de-risks investment before scaling.",
            },
            {
              id: "m5-l2-q2",
              kind: "trueFalse",
              question: "Data readiness should be assessed before committing to an AI use case.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "Without usable data, even a high-impact use case can't actually be built — readiness must be checked early.",
            },
          ],
        },
        {
          type: "summary",
          body: "A sound AI strategy prioritizes high-value, feasible use cases, validates them with small metric-driven pilots, and scales deliberately with governance in place.",
        },
      ],
    },
  ],
};
