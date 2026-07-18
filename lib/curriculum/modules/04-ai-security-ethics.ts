import type { CurriculumModule } from "@/lib/curriculum/types";

export const module04AiSecurityEthics: CurriculumModule = {
  id: "m4-ai-security-ethics",
  title: "AI Security and Ethics",
  lessons: [
    {
      id: "m4-l1-deepfake-vs-real",
      title: "Deepfake vs Real Images",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Deepfake vs Real Images",
          description:
            "AI-generated faces and videos are now good enough to fool a casual glance. Learn the concrete signals that still give deepfakes away.",
          illustration: "deepfake",
          readTimeMinutes: 7,
          difficulty: "intermediate",
        },
        {
          type: "comparisonTable",
          title: "Common tell-tale signals",
          columns: ["Signal", "Real footage", "Common deepfake artifact"],
          rows: [
            ["Lighting & shadows", "Consistent across the whole face and scene", "Subtle mismatches between face lighting and background"],
            ["Blinking patterns", "Natural, irregular blink rate", "Unnaturally rare, regular, or absent blinking"],
            ["Edges & hairlines", "Sharp, consistent detail", "Blurring or warping around hair, ears, and jewelry"],
            ["Audio-lip sync", "Precisely matched", "Slight delay or mismatch between lips and audio"],
            ["Metadata", "Consistent capture device data", "Missing, stripped, or inconsistent file metadata"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "No single signal is proof",
          body: "Modern deepfakes can get any one of these signals right. Treat detection as building a case from multiple weak signals, not finding one silver bullet — and when it matters, verify through a second channel (a phone call, an official source).",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Slow down before sharing", body: "Deepfakes spread fastest in the first few minutes — a pause to verify blunts their impact.", icon: "Clock" },
            { title: "Check the source", body: "Trace content back to its original poster or outlet before trusting it.", icon: "Eye" },
            { title: "Use detection tools", body: "Provenance tools (like C2PA content credentials) and detection APIs are improving rapidly.", icon: "ShieldCheck" },
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "Deepfake detection relies on spotting multiple weak signals together: lighting, blinking, edges, audio sync, and metadata.",
            "No single artifact proves a fake — sophisticated deepfakes can get any one signal right.",
            "When stakes are high, verify through an independent channel rather than relying on visual inspection alone.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m4-l1-q1",
              kind: "mcq",
              question: "What's the most reliable approach to spotting a deepfake?",
              options: [
                "Look for exactly one tell-tale sign, like blinking",
                "Combine multiple weak signals and verify through an independent channel when it matters",
                "Assume all video content is genuine",
                "Only trust content shared by many people",
              ],
              correctIndex: 1,
              explanation: "Reliable detection means weighing multiple signals together and independently verifying high-stakes content.",
            },
            {
              id: "m4-l1-q2",
              kind: "trueFalse",
              question: "A single perfect visual signal (like correct lighting) is enough to prove a video is genuine.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Sophisticated deepfakes can get individual signals right — no single cue is conclusive proof.",
            },
          ],
        },
        {
          type: "summary",
          body: "Deepfake detection is about pattern-matching multiple weak signals — lighting, blinking, edges, audio sync, metadata — and independently verifying anything high-stakes.",
        },
      ],
    },
    {
      id: "m4-l2-cybersecurity-ai-threats",
      title: "Cybersecurity and AI Threats",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Cybersecurity and AI Threats",
          description:
            "AI is a security double-edged sword: it strengthens defenses, but it also introduces entirely new categories of attack. Here's what to watch for.",
          illustration: "cybersecurity",
          readTimeMinutes: 7,
          difficulty: "intermediate",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Prompt injection", body: "Malicious instructions hidden in content an AI reads, tricking it into ignoring its original task.", icon: "AlertTriangle" },
            { title: "Data poisoning", body: "Attackers corrupt training data so a model learns harmful or biased behavior.", icon: "Database" },
            { title: "Model theft", body: "Competitors or attackers extract a model's behavior or weights through repeated querying.", icon: "Lock" },
            { title: "AI-powered phishing", body: "Generative AI writes highly convincing, personalized phishing emails at scale.", icon: "MessageSquare" },
            { title: "Adversarial examples", body: "Inputs subtly altered to fool a model — like a stop sign with stickers that a self-driving car misreads.", icon: "ShieldAlert" },
          ],
        },
        {
          type: "stepByStep",
          title: "Practical defensive practices",
          steps: [
            { title: "Treat AI outputs as untrusted input", description: "Never let an AI system take irreversible action without a human or rule-based check." },
            { title: "Sanitize content fed to AI agents", description: "Strip or flag suspicious instructions in documents, emails, or web pages before an AI reads them." },
            { title: "Limit blast radius", description: "Give AI agents the minimum permissions and tool access they actually need." },
            { title: "Monitor and log", description: "Keep an audit trail of AI-driven actions so anomalies can be caught and traced." },
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "Prompt injection, data poisoning, model theft, AI-powered phishing, and adversarial examples are distinct new AI-era threats.",
            "AI outputs and AI-read content should be treated as untrusted input, not automatically acted upon.",
            "Limiting an AI agent's permissions and logging its actions reduces the impact of any single compromise.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m4-l2-q1",
              kind: "mcq",
              question: "What is 'prompt injection'?",
              options: [
                "A technique for speeding up model training",
                "Malicious instructions hidden in content that trick an AI into ignoring its task",
                "A method for compressing neural network weights",
                "A type of hardware attack on GPUs",
              ],
              correctIndex: 1,
              explanation: "Prompt injection hides instructions in content the AI processes, hijacking its behavior.",
            },
            {
              id: "m4-l2-q2",
              kind: "trueFalse",
              question: "It's good practice to let AI agents take irreversible actions automatically, without any human or rule-based check.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Irreversible actions should always have a check in the loop, since AI outputs can be manipulated or wrong.",
            },
          ],
        },
        {
          type: "summary",
          body: "AI introduces new attack surfaces — prompt injection, data poisoning, model theft, and more — that require treating AI inputs/outputs as untrusted and limiting agent permissions.",
        },
      ],
    },
    {
      id: "m4-l3-ethics-and-governance",
      title: "Ethics and Governance",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Ethics and Governance",
          description:
            "Deploying AI responsibly means more than avoiding bugs — it means designing for fairness, transparency, and accountability from the start.",
          illustration: "governance",
          readTimeMinutes: 7,
          difficulty: "intermediate",
        },
        {
          type: "comparisonTable",
          title: "Core AI governance principles",
          columns: ["Principle", "What it means in practice"],
          rows: [
            ["Fairness", "The system doesn't systematically disadvantage groups based on protected characteristics"],
            ["Transparency", "Users can understand, at some level, why the system produced a given output"],
            ["Accountability", "A named person or team owns the system's outcomes — 'the AI did it' is not an answer"],
            ["Privacy", "Personal data used to train or run the system is handled with consent and minimal exposure"],
            ["Human oversight", "Humans can review, override, or halt AI decisions, especially in high-stakes contexts"],
          ],
        },
        {
          type: "callout",
          variant: "definition",
          title: "What is 'AI governance'?",
          body: "AI governance is the set of policies, roles, and controls an organization puts in place to make sure AI systems are used responsibly — covering everything from who approves a new AI use case to how model outputs are audited over time.",
        },
        {
          type: "paragraph",
          heading: "The regulatory landscape is catching up",
          body: "Frameworks like the EU AI Act now classify AI systems by risk level and impose stricter requirements on high-risk use cases (hiring, credit, law enforcement). Even outside regulated regions, adopting these principles early reduces legal, reputational, and operational risk.",
        },
        {
          type: "keyTakeaways",
          items: [
            "Fairness, transparency, accountability, privacy, and human oversight are the five pillars of responsible AI governance.",
            "Accountability means a named owner for outcomes — never 'the algorithm decided'.",
            "Regulations like the EU AI Act are formalizing these principles, especially for high-risk use cases.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m4-l3-q1",
              kind: "mcq",
              question: "Which governance principle means a named person or team is responsible for an AI system's outcomes?",
              options: ["Fairness", "Transparency", "Accountability", "Privacy"],
              correctIndex: 2,
              explanation: "Accountability specifically means ownership of outcomes rests with a person or team, not the system itself.",
            },
            {
              id: "m4-l3-q2",
              kind: "trueFalse",
              question: "Regulations like the EU AI Act treat all AI use cases with the same level of scrutiny regardless of risk.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "The EU AI Act classifies systems by risk level, applying stricter rules to high-risk use cases like hiring or credit decisions.",
            },
          ],
        },
        {
          type: "summary",
          body: "Responsible AI rests on five pillars — fairness, transparency, accountability, privacy, and human oversight — increasingly reinforced by regulation like the EU AI Act.",
        },
      ],
    },
  ],
};
