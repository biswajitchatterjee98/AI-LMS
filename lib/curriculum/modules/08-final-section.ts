import type { CurriculumModule } from "@/lib/curriculum/types";

export const module08FinalSection: CurriculumModule = {
  id: "m8-final-section",
  title: "Final Section",
  lessons: [
    {
      id: "m8-l1-wrap-up-summary",
      title: "Wrap-up summary",
      estMinutes: 6,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Wrap-Up Summary",
          description:
            "You've covered the full arc of modern AI — from foundations to automation. Here's a recap of everything you've learned across the program.",
          illustration: "wrap-up",
          readTimeMinutes: 6,
          difficulty: "beginner",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "1. AI Foundations", body: "The ladder and hierarchy of AI capability, and the real difference between AI, ML, and DL.", icon: "Layers3" },
            { title: "2. How AI Works", body: "Text generation, neural networks, transformers, and diffusion-based image generation.", icon: "Network" },
            { title: "3. AI Productivity", body: "Using AI to draft emails, reports, and presentations faster — with the right guardrails.", icon: "FileText" },
            { title: "4. Security and Ethics", body: "Spotting deepfakes, understanding AI-era cyber threats, and applying governance principles.", icon: "ShieldCheck" },
            { title: "5. AI in Business", body: "Applying AI function-by-function and building a real, metric-driven AI strategy.", icon: "TrendingUp" },
            { title: "6. Large Language Models", body: "What sets ChatGPT, Gemini, and Claude apart, and how to choose the right one per use case.", icon: "MessageSquare" },
            { title: "7. Automation", body: "Identifying automation candidates and building workflows with Make.com and AI agents in n8n.", icon: "Workflow" },
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "AI capability builds in layers — from rules to autonomous agents — and understanding that ladder helps you reason about any new AI system.",
            "The same core ideas (tokens, neural networks, attention) power text, image, and agentic AI systems alike.",
            "Responsible, strategic AI adoption combines the right use case, the right tool, and real governance — not just enthusiasm.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m8-l1-q1",
              kind: "mcq",
              question: "Which architecture underlies both modern text generation and much of today's image generation guidance?",
              options: ["Rule-based expert systems", "Attention/transformer-based architectures", "Simple linear regression", "Manual lookup tables"],
              correctIndex: 1,
              explanation: "Transformer-style attention mechanisms and the broader deep learning toolkit underpin both text and multimodal generation.",
            },
            {
              id: "m8-l1-q2",
              kind: "trueFalse",
              question: "A sound AI strategy pairs the right use case and tool with real governance, not just enthusiasm for the technology.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "As covered across the program, responsible and effective AI adoption requires strategy and governance, not just adoption for its own sake.",
            },
          ],
        },
        {
          type: "summary",
          body: "From the foundations of AI capability through how models actually work, productivity, ethics, business strategy, LLM selection, and automation — you now have a practitioner-level map of modern AI. The AI Practitioner Program is the next step to go deeper.",
        },
      ],
    },
    {
      id: "m8-l2-ai-practitioner-registration",
      title: "AI Practitioner Program Registration",
      estMinutes: 3,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "AI Practitioner Program Registration",
          description:
            "Ready to go from curriculum to hands-on practice? Register for the AI Practitioner Program to continue your journey with guided, applied AI work.",
          illustration: "registration",
          readTimeMinutes: 3,
          difficulty: "beginner",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Hands-on projects", body: "Apply what you've learned to real workflows in your own role or organization.", icon: "Wand2" },
            { title: "Guided mentorship", body: "Get feedback from practitioners as you build your first AI-driven projects.", icon: "Users" },
            { title: "Community & network", body: "Connect with other practitioners moving from AI-curious to AI-capable.", icon: "Globe" },
          ],
        },
        {
          type: "paragraph",
          body: "The AI Practitioner Program builds directly on everything covered in this curriculum — moving from concepts to applied, hands-on practice with guidance along the way. Registration takes less than two minutes.",
        },
        {
          type: "registrationCta",
          heading: "Take the next step in your AI journey",
          body: "Register for the AI Practitioner Program and turn what you've learned into applied, hands-on AI practice.",
          buttonLabel: "Register Now",
          href: "/register",
        },
      ],
    },
  ],
};
