import type { CurriculumModule } from "@/lib/curriculum/types";

export const module06LargeLanguageModels: CurriculumModule = {
  id: "m6-large-language-models",
  title: "Large Language Models",
  lessons: [
    {
      id: "m6-l1-chatgpt-features",
      title: "ChatGPT and all its features",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "ChatGPT and All Its Features",
          description:
            "OpenAI's ChatGPT is far more than a chat window today. Here's a tour of the capabilities most users never discover.",
          illustration: "chatgpt",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Conversational chat", body: "The core experience — multi-turn conversation with memory of the current session.", icon: "MessageSquare" },
            { title: "Custom GPTs", body: "User-built, purpose-specific assistants with their own instructions, knowledge, and tools.", icon: "Wand2" },
            { title: "Code Interpreter / Data Analysis", body: "Runs real Python code — analyze spreadsheets, generate charts, process files.", icon: "Code2" },
            { title: "Web browsing", body: "Searches the live web for current information beyond the model's training cutoff.", icon: "Globe" },
            { title: "Image generation", body: "Built-in DALL·E integration for generating and editing images from prompts.", icon: "Sparkles" },
            { title: "Voice mode", body: "Natural spoken conversation, useful for hands-free or accessibility use cases.", icon: "Zap" },
            { title: "Memory", body: "Can retain facts about you across sessions (when enabled), reducing repeated context-setting.", icon: "Network" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          body: "Custom GPTs are underused — if you find yourself writing the same lengthy instructions every session, that's a signal to build a Custom GPT instead.",
        },
        {
          type: "keyTakeaways",
          items: [
            "ChatGPT includes Custom GPTs, code execution, web browsing, image generation, voice mode, and cross-session memory.",
            "Code Interpreter lets ChatGPT actually run Python — not just describe what code would do.",
            "Web browsing extends ChatGPT beyond its training cutoff for current events and fresh information.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m6-l1-q1",
              kind: "mcq",
              question: "What does ChatGPT's Code Interpreter / Advanced Data Analysis feature actually do?",
              options: [
                "Describes what code would theoretically do, without running it",
                "Executes real Python code, including on uploaded files",
                "Only translates code between programming languages",
                "Is unrelated to data analysis",
              ],
              correctIndex: 1,
              explanation: "Code Interpreter actually runs Python in a sandboxed environment, including analyzing uploaded files.",
            },
            {
              id: "m6-l1-q2",
              kind: "trueFalse",
              question: "Custom GPTs let users build purpose-specific assistants with their own instructions and knowledge.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "Custom GPTs are user-configured assistants tailored to a specific task or domain.",
            },
          ],
        },
        {
          type: "summary",
          body: "ChatGPT extends well beyond chat — Custom GPTs, real code execution, web browsing, image generation, voice, and memory make it a broad platform, not just a chatbot.",
        },
      ],
    },
    {
      id: "m6-l2-gemini-features",
      title: "Gemini and all its features",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Gemini and All Its Features",
          description:
            "Google's Gemini is built natively multimodal and deeply woven into the Google ecosystem. Here's what sets it apart.",
          illustration: "gemini",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Native multimodality", body: "Trained from the ground up on text, images, audio, and video together, not bolted on afterward.", icon: "Layers3" },
            { title: "Google Workspace integration", body: "Works directly inside Gmail, Docs, Sheets, and Slides for drafting and analysis in place.", icon: "FileText" },
            { title: "Long context window", body: "Can process very large documents or codebases in a single prompt.", icon: "BookOpen" },
            { title: "Search & Android integration", body: "Powers AI Overviews in Google Search and is built into the Android assistant experience.", icon: "Globe" },
            { title: "Model size tiers", body: "Nano (on-device), Flash (fast/cheap), and Pro (most capable) let you match cost to task.", icon: "GaugeCircle" },
          ],
        },
        {
          type: "callout",
          variant: "definition",
          title: "What does 'natively multimodal' mean?",
          body: "Rather than pairing a separate image model with a separate text model, Gemini was trained on interleaved text, image, audio, and video data from the start — letting it reason across formats in a single pass.",
        },
        {
          type: "keyTakeaways",
          items: [
            "Gemini is natively multimodal — trained jointly on text, image, audio, and video rather than combining separate models.",
            "Deep integration with Google Workspace (Docs, Sheets, Gmail) is a key differentiator.",
            "Model tiers (Nano, Flash, Pro) let you trade off cost and capability depending on the task.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m6-l2-q1",
              kind: "mcq",
              question: "What does it mean that Gemini is 'natively multimodal'?",
              options: [
                "It only works on mobile devices",
                "It was trained jointly on text, image, audio, and video from the start",
                "It requires separate apps for text and images",
                "It cannot process images at all",
              ],
              correctIndex: 1,
              explanation: "Native multimodality means the model was trained across formats together, not as bolted-together separate models.",
            },
            {
              id: "m6-l2-q2",
              kind: "trueFalse",
              question: "Gemini is deeply integrated into Google Workspace apps like Docs and Sheets.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "Gemini is built directly into Google Workspace, letting you use it inside Docs, Sheets, and Gmail.",
            },
          ],
        },
        {
          type: "summary",
          body: "Gemini stands out through native multimodality, deep Google Workspace and Search integration, long context windows, and tiered models for cost/capability trade-offs.",
        },
      ],
    },
    {
      id: "m6-l3-claude-features",
      title: "Claude and all its features",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Claude and All Its Features",
          description:
            "Anthropic's Claude is built around a strong safety framework and deep support for long-context, agentic, and coding workflows.",
          illustration: "claude",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Long context window", body: "Can hold very large documents, codebases, or conversation histories in a single session.", icon: "BookOpen" },
            { title: "Artifacts", body: "Generates interactive content — code, documents, diagrams — in a dedicated, editable side panel.", icon: "Wand2" },
            { title: "Projects", body: "Groups conversations and reference material together for consistent, ongoing work.", icon: "Layers3" },
            { title: "Agentic coding", body: "Tools like Claude Code let Claude plan, write, and execute multi-step coding tasks directly in a project.", icon: "Code2" },
            { title: "Computer use", body: "Can operate a computer interface directly — clicking, typing, and navigating software on your behalf.", icon: "Cpu" },
            { title: "Safety focus", body: "Trained with a 'Constitutional AI' approach emphasizing helpfulness balanced with harmlessness.", icon: "ShieldCheck" },
          ],
        },
        {
          type: "callout",
          variant: "definition",
          title: "What is 'Constitutional AI'?",
          body: "A training approach where the model is guided by a written set of principles ('a constitution') to critique and improve its own responses, rather than relying solely on human feedback for every judgment call.",
        },
        {
          type: "keyTakeaways",
          items: [
            "Claude emphasizes long context, Artifacts for interactive content, and Projects for organized ongoing work.",
            "Claude Code and computer-use capabilities support genuinely agentic, multi-step task execution.",
            "Claude is built around a Constitutional AI safety approach that balances helpfulness with harmlessness.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m6-l3-q1",
              kind: "mcq",
              question: "What does the 'Artifacts' feature in Claude let you do?",
              options: [
                "Delete old conversations automatically",
                "Generate interactive content like code or diagrams in a dedicated editable panel",
                "Only translate text between languages",
                "Browse the live web",
              ],
              correctIndex: 1,
              explanation: "Artifacts render generated content (code, documents, diagrams) in a separate, interactive, editable panel.",
            },
            {
              id: "m6-l3-q2",
              kind: "trueFalse",
              question: "Constitutional AI relies solely on human feedback for every safety judgment, with no written guiding principles.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Constitutional AI uses a written set of principles to guide the model's self-critique, reducing reliance on case-by-case human feedback.",
            },
          ],
        },
        {
          type: "summary",
          body: "Claude combines long-context reasoning, Artifacts, Projects, and agentic coding/computer-use tools with a safety-first Constitutional AI training approach.",
        },
      ],
    },
    {
      id: "m6-l4-which-llm-to-use",
      title: "Which LLM should be used based on different use cases?",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Which LLM Should You Use?",
          description:
            "ChatGPT, Gemini, and Claude are all strong general-purpose models — the right choice depends on your specific use case.",
          illustration: "llm-compare",
          readTimeMinutes: 7,
          difficulty: "intermediate",
        },
        {
          type: "comparisonTable",
          title: "Matching use cases to strengths",
          columns: ["Use case", "Strong fit", "Why"],
          rows: [
            ["Agentic coding & long codebases", "Claude", "Strong coding performance, long context, dedicated agentic coding tools"],
            ["Long document analysis", "Claude or Gemini", "Both offer very large context windows for whole-document reasoning"],
            ["Google Workspace-embedded work", "Gemini", "Native integration inside Docs, Sheets, and Gmail"],
            ["Broad ecosystem & plugins/GPTs", "ChatGPT", "Largest ecosystem of Custom GPTs and third-party integrations"],
            ["Multimodal input (image + audio + video)", "Gemini", "Natively trained across modalities from the ground up"],
            ["Safety-sensitive or compliance-heavy work", "Claude", "Constitutional AI approach with a strong safety emphasis"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          body: "In practice, many teams use more than one model — picking per task rather than standardizing on a single provider. Re-test this table periodically: model capabilities change fast.",
        },
        {
          type: "keyTakeaways",
          items: [
            "No single LLM wins every use case — the right choice depends on the task, ecosystem, and priorities (speed, safety, integration).",
            "Claude tends to lead on agentic coding and safety-sensitive work; Gemini on multimodality and Workspace integration; ChatGPT on ecosystem breadth.",
            "Model capabilities evolve quickly — treat any comparison as a snapshot to periodically re-validate, not a permanent ranking.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m6-l4-q1",
              kind: "mcq",
              question: "What's the best approach to choosing an LLM for a business?",
              options: [
                "Always pick the same provider for every possible use case",
                "Match the model to the specific use case's requirements",
                "Choose based on which model is cheapest, regardless of fit",
                "It doesn't matter — all LLMs are functionally identical",
              ],
              correctIndex: 1,
              explanation: "Different models have different strengths — matching the model to the use case gets the best results.",
            },
            {
              id: "m6-l4-q2",
              kind: "trueFalse",
              question: "LLM capability comparisons stay accurate indefinitely and never need to be re-checked.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Model capabilities evolve rapidly with new releases — comparisons should be periodically revisited.",
            },
          ],
        },
        {
          type: "summary",
          body: "Choosing an LLM is a use-case decision, not a brand decision — match the model's strengths (coding, multimodality, integration, safety) to the task at hand, and expect the landscape to keep shifting.",
        },
      ],
    },
  ],
};
