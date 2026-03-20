/** Typical blog reading speed (English). */
const DEFAULT_WORDS_PER_MINUTE = 200;

function plainWordCount(text: string): number {
  const plain = text
    .replace(/<[^>]+>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_>|[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
}

/**
 * Estimated reading time in whole minutes (minimum 1 for any non-empty content).
 */
export function getReadingTimeMinutes(
  content: string | undefined,
  wordsPerMinute: number = DEFAULT_WORDS_PER_MINUTE,
): number {
  if (!content?.trim()) return 0;
  const words = plainWordCount(content);
  if (words === 0) return 1;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * e.g. "5 min read" — use empty content as "1 min read" for safety.
 */
export function formatReadingTime(
  content: string | undefined,
  wordsPerMinute?: number,
): string {
  const minutes = getReadingTimeMinutes(content, wordsPerMinute);
  if (minutes === 0) return "1 min read";
  return `${minutes} min read`;
}
