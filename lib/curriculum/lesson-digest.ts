import type { LessonBlock } from "@/lib/curriculum/blocks";

// Condenses a lesson's structured blocks into a short plain-text digest, used to
// ground the AI Tutor's system prompt and the "Generate AI notes" button without
// shipping the whole lesson (which can be large) on every request.
export function buildLessonDigest(title: string, blocks: LessonBlock[] | undefined, maxChars = 600): string {
  if (!blocks || blocks.length === 0) return title;

  const parts: string[] = [`Lesson: ${title}`];

  const hero = blocks.find((b): b is Extract<LessonBlock, { type: "hero" }> => b.type === "hero");
  if (hero) parts.push(hero.description);

  const takeaways = blocks.find(
    (b): b is Extract<LessonBlock, { type: "keyTakeaways" }> => b.type === "keyTakeaways"
  );
  if (takeaways) parts.push(`Key takeaways: ${takeaways.items.join("; ")}`);

  const summary = blocks.find((b): b is Extract<LessonBlock, { type: "summary" }> => b.type === "summary");
  if (summary) parts.push(summary.body);

  if (!takeaways && !summary) {
    for (const b of blocks) {
      if (b.type === "paragraph") parts.push(b.body);
      if (b.type === "infoCard") parts.push(`${b.title}: ${b.body}`);
    }
  }

  const digest = parts.join(" ");
  return digest.length > maxChars ? `${digest.slice(0, maxChars).trimEnd()}…` : digest;
}
