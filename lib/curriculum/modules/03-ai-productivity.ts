import type { CurriculumModule } from "@/lib/curriculum/types";

export const module03AiProductivity: CurriculumModule = {
  id: "m3-ai-productivity",
  title: "AI Productivity",
  lessons: [
    {
      id: "m3-l1-email-generation",
      title: "Email Generation using AI",
      estMinutes: 6,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Email Generation using AI",
          description:
            "Stop staring at a blank subject line. Learn a repeatable method for drafting sharper, faster emails with AI — without sounding like a robot wrote them.",
          illustration: "email",
          readTimeMinutes: 6,
          difficulty: "beginner",
        },
        {
          type: "stepByStep",
          title: "A five-step method",
          steps: [
            { title: "Define the goal and audience", description: "Decide the one outcome you want (a reply, a booking, a decision) and who exactly you're writing to." },
            { title: "Give the AI context", description: "Paste relevant background — a thread, key facts, or bullet points — instead of describing it from memory." },
            { title: "Set the tone explicitly", description: "Tell the model: formal, friendly, apologetic, urgent — tone instructions change the output dramatically." },
            { title: "Draft with AI", description: "Ask for a draft, then a shorter version and a more direct version, so you can pick the best fit." },
            { title: "Review and personalize", description: "Add specific names, details, and your own voice before sending — never send an unedited AI draft." },
          ],
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Be specific", body: "\"Write a 3-sentence follow-up\" beats \"write me an email\" every time.", icon: "Target" },
            { title: "Give examples", body: "Paste a past email you liked and ask the AI to match that style.", icon: "FileText" },
            { title: "Set the tone", body: "Name the tone directly: warm, firm, brief, formal — don't leave it to guesswork.", icon: "MessageSquare" },
            { title: "Iterate, don't accept v1", body: "Ask for a shorter version, a friendlier version, a more direct version — then choose.", icon: "TrendingUp" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          body: "Keep a personal 'prompt library' of your 3-4 most common email types (follow-up, decline, status update). Reusing a proven prompt is faster than writing a new one every time.",
        },
        {
          type: "keyTakeaways",
          items: [
            "Good AI email drafting starts with a clear goal and audience, not a vague request.",
            "Providing context and explicit tone instructions dramatically improves draft quality.",
            "Always personalize and review an AI draft before sending — never send it unedited.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m3-l1-q1",
              kind: "mcq",
              question: "What's the biggest quality lever when asking AI to draft an email?",
              options: [
                "Using the longest possible prompt",
                "Giving specific context, audience, and tone",
                "Always asking for a formal tone",
                "Skipping the review step to save time",
              ],
              correctIndex: 1,
              explanation: "Specificity — context, audience, and tone — is what separates a generic draft from a usable one.",
            },
            {
              id: "m3-l1-q2",
              kind: "trueFalse",
              question: "It's safe to send an AI-generated email draft without reviewing it first.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "AI drafts should always be reviewed and personalized before sending — they can contain errors or a generic tone.",
            },
          ],
        },
        {
          type: "summary",
          body: "Great AI-assisted emails come from a repeatable process: clear goal, real context, explicit tone, iteration, and a final human review before sending.",
        },
      ],
    },
    {
      id: "m3-l2-report-generation",
      title: "Report Generation using AI",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Report Generation using AI",
          description:
            "AI can turn scattered data and notes into a structured first draft in minutes — but reports carry numbers people rely on, so the workflow needs a fact-checking step built in.",
          illustration: "report",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "stepByStep",
          title: "A safe workflow for AI-assisted reports",
          steps: [
            { title: "Gather your data", description: "Collect the source numbers, notes, and prior reports — don't rely on the AI to know your data." },
            { title: "Outline the structure", description: "Ask AI to propose section headings, then adjust to match your organization's report format." },
            { title: "Draft section by section", description: "Feed real data into each section prompt rather than asking for one giant report at once." },
            { title: "Fact-check every number", description: "Cross-check every statistic and figure against your source data before it goes anywhere." },
            { title: "Polish tone and formatting", description: "Use AI for a final pass on clarity, consistency, and formatting." },
          ],
        },
        {
          type: "comparisonTable",
          columns: ["", "Manual reporting", "AI-assisted reporting"],
          rows: [
            ["Time to first draft", "Hours to days", "Minutes, once data is gathered"],
            ["Consistency of tone", "Varies by author", "Consistent across sections and reports"],
            ["Accuracy of figures", "As accurate as the author", "Only as accurate as the source data fed in — must be verified"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Numbers are not optional to check",
          body: "AI models can generate plausible-sounding but incorrect statistics if a number isn't explicitly provided. Treat every AI-generated figure as a draft placeholder until you've verified it against your real data.",
        },
        {
          type: "keyTakeaways",
          items: [
            "AI is best used to structure and draft reports, not to invent the underlying data.",
            "Feeding real source data into each section produces far more reliable output than one giant open-ended prompt.",
            "Every number in an AI-assisted report must be fact-checked against the original source before publishing.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m3-l2-q1",
              kind: "mcq",
              question: "What's the recommended way to handle numbers in an AI-generated report?",
              options: [
                "Trust the AI's numbers since it was trained on lots of data",
                "Always verify every figure against your original source data",
                "Avoid using numbers in reports altogether",
                "Only check numbers if the report looks unusual",
              ],
              correctIndex: 1,
              explanation: "Every AI-generated figure should be verified against your source data — this is a non-negotiable step.",
            },
            {
              id: "m3-l2-q2",
              kind: "trueFalse",
              question: "Feeding real data into each section prompt produces more reliable reports than one giant open-ended request.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "Section-by-section prompting with real data grounds the output and reduces the risk of invented figures.",
            },
          ],
        },
        {
          type: "summary",
          body: "AI accelerates report drafting and structure, but every figure it produces must be checked against real source data before the report is finalized.",
        },
      ],
    },
    {
      id: "m3-l3-presentation-generation",
      title: "Presentation Generation using AI",
      estMinutes: 6,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Presentation Generation using AI",
          description:
            "From a blank deck to a compelling narrative — here's how to use AI to build presentations that tell a story, not just list bullet points.",
          illustration: "presentation",
          readTimeMinutes: 6,
          difficulty: "beginner",
        },
        {
          type: "stepByStep",
          title: "Building a deck with AI",
          steps: [
            { title: "Define the narrative and audience", description: "Decide the one message the audience should remember, and what they already know." },
            { title: "Generate an outline", description: "Ask AI for a slide-by-slide outline built around that narrative, not a generic template." },
            { title: "Draft slide content", description: "Turn each outline point into concise slide text — headlines and short supporting points, not paragraphs." },
            { title: "Add visuals and diagrams", description: "Use AI to suggest chart types, diagrams, or imagery that reinforce each slide's point." },
            { title: "Rehearse and refine", description: "Practice out loud; cut any slide that doesn't clearly support the core narrative." },
          ],
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "AI slide generators", body: "Tools that turn an outline or prompt directly into a formatted slide deck.", icon: "Presentation" },
            { title: "AI image generators", body: "Produce custom visuals and diagrams instead of generic stock photography.", icon: "Sparkles" },
            { title: "AI speaker-notes tools", body: "Generate talk-track notes under each slide so you're not reading bullet points verbatim.", icon: "MessageSquare" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          body: "Ask AI to critique your outline before you build slides: \"What's the weakest part of this narrative for a skeptical audience?\" catches gaps early, when they're cheap to fix.",
        },
        {
          type: "keyTakeaways",
          items: [
            "Start from a single core narrative and audience, then let AI help build the outline around it.",
            "Keep slide text to headlines and short points — AI can help you cut, not just add.",
            "Use AI-generated visuals and speaker notes to reinforce the story, then rehearse and trim ruthlessly.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m3-l3-q1",
              kind: "mcq",
              question: "What should you define before asking AI to generate a presentation outline?",
              options: ["The exact font to use", "The core narrative and audience", "The number of slides only", "Nothing — let AI decide everything"],
              correctIndex: 1,
              explanation: "A clear narrative and audience gives AI the direction it needs to produce a coherent, not generic, outline.",
            },
            {
              id: "m3-l3-q2",
              kind: "trueFalse",
              question: "Slides generated with AI should typically contain full paragraphs of text for clarity.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Effective slides use short headlines and points — paragraphs belong in speaker notes or a document, not the slide itself.",
            },
          ],
        },
        {
          type: "summary",
          body: "AI speeds up presentation building end-to-end — outline, slide content, visuals, and speaker notes — but the narrative and final judgment still need to be yours.",
        },
      ],
    },
  ],
};
