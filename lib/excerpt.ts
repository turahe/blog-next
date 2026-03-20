/** Plain-text excerpt from post body (Markdown/HTML stripped). */
export function postExcerpt(raw: string | undefined, max = 200): string {
  if (!raw) return "";
  const plain = raw
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trim()}…`;
}
