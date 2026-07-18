import type { CurriculumModule } from "@/lib/curriculum/types";

export const module01AiFoundations: CurriculumModule = {
  id: "m1-ai-foundations",
  title: "AI Foundations",
  lessons: [
    {
      id: "m1-l1-industries-before-after-ai",
      title: "Industries Before AI vs After AI",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Industries Before AI vs After AI",
          description:
            "See how everyday industries operated before AI arrived — and how AI has rewired the way they work, decide, and serve customers today.",
          illustration: "before-after",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "paragraph",
          heading: "A quiet revolution across every sector",
          body: "For decades, industries ran on manual judgment, static rules, and human bottlenecks: a doctor reading every scan, an analyst combing spreadsheets, a call center agent reading from a script. AI didn't replace these industries overnight — it changed what happens inside each step, compressing hours of manual work into seconds of automated insight.",
        },
        {
          type: "comparisonTable",
          title: "The same industries, a different operating model",
          columns: ["Industry", "Before AI", "After AI"],
          rows: [
            ["Healthcare", "Radiologists manually review every scan for anomalies", "AI pre-screens scans and flags likely anomalies for review"],
            ["Banking & Finance", "Fraud caught days later during manual reconciliation", "Fraud flagged in milliseconds by real-time anomaly detection"],
            ["Retail", "Store managers guess demand from last year's sales", "AI forecasts demand SKU-by-SKU from live signals"],
            ["Customer Service", "Long hold queues, scripted human agents", "AI chatbots resolve routine queries instantly, 24/7"],
            ["Manufacturing", "Scheduled maintenance regardless of machine health", "Sensors + AI predict failures before they happen"],
          ],
        },
        {
          type: "diagram",
          kind: "timeline",
          title: "How industries got here",
          nodes: [
            { id: "manual", label: "Manual processes", description: "Paper, spreadsheets, tribal knowledge", level: 0 },
            { id: "digital", label: "Digitization", description: "Data moves into software systems", level: 1 },
            { id: "automation", label: "Automation", description: "Rule-based systems handle repetitive steps", level: 2 },
            { id: "ai", label: "AI-augmented decisions", description: "Models learn patterns and assist judgment", level: 3 },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "The pattern to notice",
          body: "AI rarely eliminates a job outright — it collapses the time between 'data exists' and 'a decision gets made.' The industries that win are the ones that redesign their workflows around that speed, not just bolt AI onto the old process.",
        },
        {
          type: "keyTakeaways",
          items: [
            "AI transforms industries by compressing the time between data and decisions.",
            "Healthcare, finance, retail, service, and manufacturing all show the same before/after pattern: manual review → real-time, AI-assisted judgment.",
            "The biggest gains come from redesigning workflows around AI, not just adding AI on top of old processes.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m1-l1-q1",
              kind: "mcq",
              question: "What's the main shift AI brings to industries like banking and healthcare?",
              options: [
                "It replaces every human worker immediately",
                "It compresses the time between data existing and a decision being made",
                "It only affects marketing departments",
                "It removes the need for any data",
              ],
              correctIndex: 1,
              explanation: "AI's core value is turning slow, manual analysis into near-instant, data-driven decisions.",
            },
            {
              id: "m1-l1-q2",
              kind: "trueFalse",
              question: "In the 'before AI' model, fraud in banking was typically caught in real time.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Before AI, fraud was usually caught days later during manual reconciliation, not in real time.",
            },
            {
              id: "m1-l1-q3",
              kind: "mcq",
              question: "Which best describes how manufacturing changed after AI adoption?",
              options: [
                "Machines are serviced on a fixed schedule regardless of condition",
                "Sensors and AI predict failures before they happen",
                "Manufacturing has not been affected by AI",
                "All maintenance decisions are now made manually",
              ],
              correctIndex: 1,
              explanation: "Predictive maintenance uses sensor data and AI models to flag failures before they occur.",
            },
          ],
        },
        {
          type: "summary",
          body: "AI didn't invent new industries — it rewired the ones we already had, replacing slow manual review with real-time, data-driven decisions across healthcare, finance, retail, service, and manufacturing.",
        },
      ],
    },
    {
      id: "m1-l2-intelligent-ladder-in-ai",
      title: "Intelligent Ladder in AI",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "The Intelligent Ladder in AI",
          description:
            "AI capability didn't appear all at once — it climbed a ladder, from rigid rule-following to systems that can reason, generate, and act on their own.",
          illustration: "ladder",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "paragraph",
          body: "Think of AI capability as a ladder with five rungs. Each rung didn't erase the one below it — it added a new capability on top. Understanding where a system sits on this ladder tells you what it can (and can't) be trusted to do.",
        },
        {
          type: "diagram",
          kind: "pyramid",
          title: "Five rungs of the AI ladder",
          nodes: [
            { id: "rules", label: "Rule-Based Systems", description: "If-this-then-that logic, no learning", level: 0 },
            { id: "ml", label: "Machine Learning", description: "Learns patterns from labelled data", level: 1 },
            { id: "dl", label: "Deep Learning", description: "Learns complex patterns from raw, unlabelled data at scale", level: 2 },
            { id: "genai", label: "Generative AI", description: "Creates new text, images, code, and audio", level: 3 },
            { id: "agents", label: "Autonomous Agents", description: "Plans multi-step tasks and takes actions with tools", level: 4 },
          ],
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Rule-Based Systems", body: "Explicit hand-written rules. Predictable, but brittle outside the cases it was designed for.", icon: "Code2" },
            { title: "Machine Learning", body: "Learns from examples instead of rules — think spam filters and credit scoring.", icon: "TrendingUp" },
            { title: "Deep Learning", body: "Multi-layer neural networks that find patterns humans wouldn't think to hand-code.", icon: "Network" },
            { title: "Generative AI", body: "Produces brand-new content — text, images, code — instead of just classifying it.", icon: "Sparkles" },
          ],
        },
        {
          type: "callout",
          variant: "definition",
          body: "Each rung of the ladder builds on the ones below it. A ChatGPT-style assistant (Generative AI) is only possible because of decades of progress in Deep Learning, which itself built on Machine Learning and, before that, rule-based systems.",
        },
        {
          type: "keyTakeaways",
          items: [
            "AI capability progresses in stages: rules → machine learning → deep learning → generative AI → autonomous agents.",
            "Higher rungs don't replace lower ones — many production systems still combine simple rules with modern models.",
            "Knowing a system's rung tells you how much autonomy and judgment it can safely be given.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m1-l2-q1",
              kind: "mcq",
              question: "Which rung of the AI ladder is defined by systems that can plan multi-step tasks and take actions using tools?",
              options: ["Rule-Based Systems", "Machine Learning", "Autonomous Agents", "Deep Learning"],
              correctIndex: 2,
              explanation: "Autonomous agents sit at the top of the ladder — they plan and act, not just predict.",
            },
            {
              id: "m1-l2-q2",
              kind: "trueFalse",
              question: "Generative AI became possible independently of Deep Learning.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Generative AI is built directly on top of Deep Learning advances, not independent of them.",
            },
          ],
        },
        {
          type: "summary",
          body: "The AI ladder runs from rigid rules to autonomous agents. Every rung still matters — the newest systems are built on, not instead of, the ones before them.",
        },
      ],
    },
    {
      id: "m1-l3-intelligent-hierarchy-with-ai",
      title: "Intelligent Hierarchy with AI",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "The Intelligent Hierarchy with AI",
          description:
            "Artificial Intelligence is an umbrella term. Underneath it sits a family tree of fields and techniques — knowing how they relate helps you use the right term for the right idea.",
          illustration: "hierarchy",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "paragraph",
          body: "People often use 'AI', 'Machine Learning', and 'Deep Learning' interchangeably — but they're not siblings, they're a hierarchy. AI is the broadest field; Machine Learning is one approach within it; Deep Learning is one technique within Machine Learning.",
        },
        {
          type: "diagram",
          kind: "hierarchy",
          title: "How the fields nest inside each other",
          nodes: [
            { id: "ai", label: "Artificial Intelligence", description: "The umbrella field", level: 0 },
            { id: "ml", label: "Machine Learning", description: "Learns from data", level: 1 },
            { id: "nlp", label: "Natural Language Processing", description: "Understands & generates language", level: 1 },
            { id: "cv", label: "Computer Vision", description: "Understands images & video", level: 1 },
            { id: "robotics", label: "Robotics", description: "Perceives & acts in the physical world", level: 1 },
            { id: "supervised", label: "Supervised Learning", description: "Learns from labelled examples", level: 2 },
            { id: "unsupervised", label: "Unsupervised Learning", description: "Finds structure in unlabelled data", level: 2 },
            { id: "rl", label: "Reinforcement Learning", description: "Learns from trial, error & reward", level: 2 },
            { id: "dl", label: "Deep Learning", description: "Neural networks with many layers", level: 2 },
          ],
          edges: [
            { from: "ai", to: "ml" },
            { from: "ai", to: "nlp" },
            { from: "ai", to: "cv" },
            { from: "ai", to: "robotics" },
            { from: "ml", to: "supervised" },
            { from: "ml", to: "unsupervised" },
            { from: "ml", to: "rl" },
            { from: "ml", to: "dl" },
          ],
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "NLP", body: "Powers translation, chatbots, and text generation by modelling language.", icon: "MessageSquare" },
            { title: "Computer Vision", body: "Lets machines identify objects, faces, and scenes in images and video.", icon: "Eye" },
            { title: "Robotics", body: "Combines AI with sensors and actuators to perceive and act in the real world.", icon: "Cpu" },
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "AI is the umbrella field; Machine Learning, NLP, Computer Vision, and Robotics are major branches within it.",
            "Machine Learning itself splits into Supervised, Unsupervised, and Reinforcement Learning, plus Deep Learning.",
            "Using precise terms (ML vs. NLP vs. DL) makes it much easier to communicate what a system actually does.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m1-l3-q1",
              kind: "mcq",
              question: "Where does Deep Learning sit in the AI hierarchy?",
              options: [
                "It's a completely separate field from Machine Learning",
                "It's a technique within Machine Learning",
                "It's the parent field that contains Machine Learning",
                "It's the same thing as Natural Language Processing",
              ],
              correctIndex: 1,
              explanation: "Deep Learning is a technique/branch within Machine Learning, which itself sits under AI.",
            },
            {
              id: "m1-l3-q2",
              kind: "trueFalse",
              question: "Natural Language Processing and Computer Vision are both branches of the broader AI field.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "Both NLP and Computer Vision are major branches that sit directly under the AI umbrella.",
            },
          ],
        },
        {
          type: "summary",
          body: "AI is the umbrella term; Machine Learning, NLP, Computer Vision, and Robotics are its major branches, and Deep Learning is a technique that lives inside Machine Learning.",
        },
      ],
    },
    {
      id: "m1-l4-ai-vs-ml-vs-dl",
      title: "AI vs ML vs DL",
      estMinutes: 6,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "AI vs ML vs DL",
          description:
            "Three terms, one nested relationship. Here's exactly what separates Artificial Intelligence, Machine Learning, and Deep Learning — with concrete examples of each.",
          illustration: "compare-brains",
          readTimeMinutes: 6,
          difficulty: "beginner",
        },
        {
          type: "comparisonTable",
          columns: ["", "Artificial Intelligence", "Machine Learning", "Deep Learning"],
          rows: [
            ["Definition", "Any system that mimics human-like intelligence", "AI that learns patterns from data instead of fixed rules", "ML using multi-layer neural networks"],
            ["Data needs", "Varies — can be rule-based with no data", "Needs structured, often labelled, data", "Needs large volumes of raw data"],
            ["Example", "A chess-playing rule engine", "A spam filter trained on labelled emails", "A model that recognises faces in photos"],
            ["Human effort", "Rules hand-written by engineers", "Features often hand-engineered", "Model learns features automatically"],
          ],
        },
        {
          type: "diagram",
          kind: "hierarchy",
          nodes: [
            { id: "ai2", label: "Artificial Intelligence", description: "Broadest: any human-like intelligence", level: 0 },
            { id: "ml2", label: "Machine Learning", description: "Learns from data", level: 1 },
            { id: "dl2", label: "Deep Learning", description: "Neural networks, many layers", level: 2 },
          ],
          edges: [
            { from: "ai2", to: "ml2" },
            { from: "ml2", to: "dl2" },
          ],
        },
        {
          type: "callout",
          variant: "myth",
          title: "Myth: 'AI' and 'Machine Learning' mean the same thing",
          body: "Reality: every ML system is AI, but not every AI system uses ML — a simple thermostat rule ('if temp > 25°C, turn on AC') is AI by definition but has nothing to do with learning from data.",
        },
        {
          type: "keyTakeaways",
          items: [
            "AI is the broadest goal: building systems that act intelligently.",
            "ML is one way to achieve AI: by learning from data instead of fixed rules.",
            "DL is one way to do ML: using deep, multi-layer neural networks that learn their own features.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m1-l4-q1",
              kind: "mcq",
              question: "Which statement correctly describes the relationship between AI, ML, and DL?",
              options: [
                "DL contains ML, which contains AI",
                "AI contains ML, which contains DL",
                "They are three unrelated, separate fields",
                "ML contains AI, which contains DL",
              ],
              correctIndex: 1,
              explanation: "AI is the broadest field, ML is a subset of AI, and DL is a subset of ML.",
            },
            {
              id: "m1-l4-q2",
              kind: "trueFalse",
              question: "A simple hand-written 'if-then' rule engine counts as AI even though it uses no Machine Learning.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "AI is defined by human-like behavior, not by the technique used — rule engines qualify as AI without any ML.",
            },
          ],
        },
        {
          type: "summary",
          body: "AI ⊃ ML ⊃ DL: Deep Learning is a subset of Machine Learning, which is a subset of the broader field of Artificial Intelligence.",
        },
      ],
    },
    {
      id: "m1-l5-ani-agi-asi",
      title: "ANI, AGI and ASI",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "ANI, AGI, and ASI",
          description:
            "Not all AI is created equal. Understand the three levels of AI capability — where we are today, where the debate is, and where science fiction begins.",
          illustration: "spectrum",
          readTimeMinutes: 7,
          difficulty: "intermediate",
        },
        {
          type: "diagram",
          kind: "pyramid",
          title: "The three levels of AI capability",
          nodes: [
            { id: "ani", label: "ANI — Narrow Intelligence", description: "Today's AI: excellent at one task, useless outside it", level: 0 },
            { id: "agi", label: "AGI — General Intelligence", description: "Hypothetical: human-level reasoning across any task", level: 1 },
            { id: "asi", label: "ASI — Super Intelligence", description: "Theoretical: intelligence surpassing all of humanity combined", level: 2 },
          ],
        },
        {
          type: "comparisonTable",
          columns: ["Level", "Status Today", "Example"],
          rows: [
            ["ANI (Artificial Narrow Intelligence)", "Exists and is widely deployed", "Chess engines, spam filters, ChatGPT, self-driving perception"],
            ["AGI (Artificial General Intelligence)", "Does not exist yet — active research goal", "A system that could learn any intellectual task a human can"],
            ["ASI (Artificial Super Intelligence)", "Purely theoretical", "A hypothetical intelligence beyond all human capability combined"],
          ],
        },
        {
          type: "callout",
          variant: "myth",
          title: "Myth: Today's chatbots are AGI",
          body: "Reality: even the most capable LLMs are still ANI — extraordinarily capable at language and reasoning tasks, but without general, autonomous understanding across every domain the way a human has. They don't set their own goals or transfer knowledge the way AGI would.",
        },
        {
          type: "keyTakeaways",
          items: [
            "ANI (Narrow) is task-specific AI — this describes every AI system that exists today, including ChatGPT and Gemini.",
            "AGI (General) would match human-level reasoning across any domain — it remains a research goal, not a reality.",
            "ASI (Super) is a theoretical future stage exceeding all human intelligence combined, and is the subject of ongoing debate, not engineering.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m1-l5-q1",
              kind: "mcq",
              question: "Which category does every AI system in production today — including ChatGPT — fall into?",
              options: ["ANI", "AGI", "ASI", "None of these categories apply yet"],
              correctIndex: 0,
              explanation: "All current AI, however capable, is Artificial Narrow Intelligence (ANI) — task-specific, not general.",
            },
            {
              id: "m1-l5-q2",
              kind: "trueFalse",
              question: "AGI has already been achieved by leading AI labs.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "AGI remains a research goal — no system today demonstrates general, human-level intelligence across all domains.",
            },
          ],
        },
        {
          type: "summary",
          body: "ANI is here and powers every AI product you use today. AGI and ASI describe hypothetical future stages — useful for framing the debate, but not descriptions of current technology.",
        },
      ],
    },
  ],
};
