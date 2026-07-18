import type { CurriculumModule } from "@/lib/curriculum/types";

export const module07Automation: CurriculumModule = {
  id: "m7-automation",
  title: "Automation",
  lessons: [
    {
      id: "m7-l1-task-automation-using-ai",
      title: "Task automation using AI",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Task Automation using AI",
          description:
            "Before reaching for a specific tool, learn the general method for spotting which tasks are worth automating with AI — and which aren't.",
          illustration: "automation",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Repetitive data entry", body: "Extracting fields from documents or forms into a system of record.", icon: "Database" },
            { title: "Scheduling", body: "Finding meeting times, sending reminders, and coordinating calendars.", icon: "Clock" },
            { title: "Email triage", body: "Categorizing, summarizing, and routing incoming messages automatically.", icon: "MessageSquare" },
            { title: "Content repurposing", body: "Turning one piece of content (a blog post) into multiple formats (social posts, email).", icon: "Sparkles" },
          ],
        },
        {
          type: "stepByStep",
          title: "How to identify a good automation candidate",
          steps: [
            { title: "Map the manual process", description: "Write down every step of the task exactly as a human does it today." },
            { title: "Identify repetitive, rule-based steps", description: "Highlight steps that follow a predictable pattern — these automate well; steps needing real judgment often don't." },
            { title: "Choose the right tool", description: "Match the task's complexity to a tool: a simple trigger-action flow, or a full AI agent." },
            { title: "Build and test the automation", description: "Start with a small, monitored pilot rather than automating the full volume immediately." },
            { title: "Monitor and refine", description: "Track error rates and edge cases, and adjust the automation as real-world cases surface." },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          body: "The best automation candidates are high-volume, low-judgment, and well-defined. If you can't clearly describe the rule a human follows, an AI agent will struggle too — until you add oversight.",
        },
        {
          type: "keyTakeaways",
          items: [
            "Good automation candidates are repetitive, rule-based, and high-volume — not tasks requiring nuanced judgment.",
            "Mapping the manual process first is essential before choosing an automation tool.",
            "Start small, monitor results, and refine — don't automate 100% of volume on day one.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m7-l1-q1",
              kind: "mcq",
              question: "What type of task is the best candidate for AI automation?",
              options: [
                "A highly nuanced, judgment-heavy decision made rarely",
                "A repetitive, rule-based task performed at high volume",
                "A task that changes completely every single time",
                "A task with no clear steps at all",
              ],
              correctIndex: 1,
              explanation: "Repetitive, rule-based, high-volume tasks automate reliably; nuanced judgment calls are much harder to automate safely.",
            },
            {
              id: "m7-l1-q2",
              kind: "trueFalse",
              question: "It's best practice to automate 100% of a task's volume immediately, without a monitored pilot first.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Starting with a small, monitored pilot lets you catch edge cases before scaling the automation fully.",
            },
          ],
        },
        {
          type: "summary",
          body: "Effective AI automation starts with mapping the manual process, isolating the repetitive rule-based steps, and rolling out via a small monitored pilot before scaling.",
        },
      ],
    },
    {
      id: "m7-l2-automation-using-make",
      title: "Automation using Make.com",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Automation using Make.com",
          description:
            "Make.com is a visual, no-code automation builder that connects thousands of apps — including AI models — into working end-to-end workflows.",
          illustration: "make",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "paragraph",
          body: "Make.com lets you build a 'scenario' — a visual chain of modules — without writing code. Each module is a trigger (something that starts the flow), a filter (a condition), or an action (something that happens), and scenarios can connect over a thousand different apps, including AI providers.",
        },
        {
          type: "diagram",
          kind: "flow",
          title: "A simple Make.com scenario",
          nodes: [
            { id: "trigger", label: "Trigger", description: "New form submission received", level: 0 },
            { id: "filter", label: "Filter", description: "Only continue if a field meets a condition", level: 1 },
            { id: "ai", label: "AI Module", description: "Summarize the submission with an LLM", level: 2 },
            { id: "action", label: "Action", description: "Post the summary to a Slack channel", level: 3 },
          ],
          edges: [
            { from: "trigger", to: "filter" },
            { from: "filter", to: "ai" },
            { from: "ai", to: "action" },
          ],
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Visual scenario builder", body: "Drag-and-drop modules onto a canvas — no code required to wire them together.", icon: "Workflow" },
            { title: "1000+ app connectors", body: "Pre-built integrations for CRMs, spreadsheets, email, Slack, and AI providers.", icon: "Share2" },
            { title: "Triggers & actions", body: "Every scenario starts with a trigger and ends in one or more actions, with optional filters between.", icon: "Zap" },
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "Make.com is a no-code, visual automation builder centered on 'scenarios' made of triggers, filters, and actions.",
            "AI models can be dropped in as a module — for example, summarizing or classifying content mid-workflow.",
            "Its strength is breadth of pre-built app connectors, making it fast to wire together everyday business tools.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m7-l2-q1",
              kind: "mcq",
              question: "What is a Make.com 'scenario' built from?",
              options: [
                "Written code in Python or JavaScript",
                "A visual chain of triggers, filters, and actions",
                "A single monolithic AI model",
                "A spreadsheet formula",
              ],
              correctIndex: 1,
              explanation: "A scenario is a no-code, visual sequence of trigger, filter, and action modules.",
            },
            {
              id: "m7-l2-q2",
              kind: "trueFalse",
              question: "Make.com requires you to write code to connect different apps together.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Make.com is a no-code platform — apps are connected visually through pre-built modules.",
            },
          ],
        },
        {
          type: "summary",
          body: "Make.com lets you build no-code automations — 'scenarios' of triggers, filters, and actions — that can include AI modules, connecting over a thousand everyday business apps.",
        },
      ],
    },
    {
      id: "m7-l3-build-ai-agents-n8n",
      title: "Build AI agents using n8n",
      estMinutes: 8,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Build AI Agents using n8n",
          description:
            "n8n is an open-source, self-hostable workflow automation tool with first-class support for building genuine AI agents — not just simple trigger-action flows.",
          illustration: "n8n",
          readTimeMinutes: 8,
          difficulty: "intermediate",
        },
        {
          type: "paragraph",
          body: "Like Make.com, n8n uses a visual, node-based canvas — but it goes further with dedicated AI Agent nodes that combine a language model with memory (conversation history) and tools (actions the agent can choose to call), enabling multi-step, reasoning-driven workflows rather than fixed linear paths.",
        },
        {
          type: "diagram",
          kind: "flow",
          title: "An n8n AI agent workflow",
          nodes: [
            { id: "trigger2", label: "Trigger", description: "Incoming customer support request", level: 0 },
            { id: "agent", label: "AI Agent Node", description: "LLM + Memory + Tools, decides what to do next", level: 1 },
            { id: "tool1", label: "Tool: Look up order", description: "Agent calls this only if needed", level: 2 },
            { id: "tool2", label: "Tool: Send reply", description: "Agent calls this to respond", level: 2 },
          ],
          edges: [
            { from: "trigger2", to: "agent" },
            { from: "agent", to: "tool1" },
            { from: "agent", to: "tool2" },
          ],
        },
        {
          type: "comparisonTable",
          title: "Make.com vs. n8n",
          columns: ["", "Make.com", "n8n"],
          rows: [
            ["Hosting", "Cloud-only (managed)", "Self-hostable or cloud"],
            ["Pricing model", "Pay per operation/task", "Free if self-hosted; usage-based if cloud"],
            ["Extensibility", "Large connector library, closed-source", "Open-source, highly customizable with custom code nodes"],
            ["Best for", "Fast, no-code business workflows", "Complex, agentic workflows and technical teams"],
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "n8n's AI Agent nodes combine an LLM, memory, and tools — enabling agents that reason and choose actions, not just follow a fixed path.",
            "n8n is open-source and self-hostable, appealing to technical teams that want full control and customization.",
            "Choose Make.com for fast no-code business workflows, and n8n when you need agentic reasoning or deep customization.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m7-l3-q1",
              kind: "mcq",
              question: "What makes an n8n AI Agent node different from a simple trigger-action step?",
              options: [
                "It combines an LLM with memory and tools so the agent can decide what to do next",
                "It only runs on a fixed schedule",
                "It cannot call any external tools",
                "It requires no AI model at all",
              ],
              correctIndex: 0,
              explanation: "AI Agent nodes let the model reason over available tools and memory to decide the next action dynamically.",
            },
            {
              id: "m7-l3-q2",
              kind: "trueFalse",
              question: "n8n can be self-hosted, giving teams full control over their automation infrastructure.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "n8n is open-source and can be self-hosted, unlike Make.com's cloud-only model.",
            },
          ],
        },
        {
          type: "summary",
          body: "n8n extends visual automation into genuine AI agents — combining an LLM, memory, and tools — and offers open-source, self-hostable flexibility for technical teams.",
        },
      ],
    },
  ],
};
