/** Prepare post body for reading: detect HTML vs plain/Markdown-lite, inject heading anchors, build TOC. */

export type BlogTocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function slugifyHeading(text: string): string {
  const s = text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s.slice(0, 72) || "section";
}

function uniqueId(base: string, used: Set<string>): string {
  let id = base;
  let i = 0;
  while (used.has(id)) {
    id = `${base}-${++i}`;
  }
  used.add(id);
  return id;
}

function stripInnerHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

export function injectHeadingIds(html: string): { html: string; headings: BlogTocHeading[] } {
  const headings: BlogTocHeading[] = [];
  const used = new Set<string>();
  let fallback = 0;

  const out = html.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (full, levelStr, attrs = "", inner) => {
    const level = Number(levelStr) as 2 | 3;
    const text = stripInnerHtml(inner);
    if (!text) return full;
    const idMatch = /\bid\s*=\s*["']([^"']+)["']/i.exec(attrs);
    if (idMatch) {
      const id = idMatch[1];
      if (!used.has(id)) used.add(id);
      headings.push({ id, text, level });
      return full;
    }
    const base = slugifyHeading(text) || `section-${fallback++}`;
    const id = uniqueId(base, used);
    headings.push({ id, text, level });
    const attrStr = attrs?.trim() ? ` ${attrs.trim()}` : "";
    return `<h${level} id="${id}"${attrStr}>${inner}</h${level}>`;
  });

  return { html: out, headings };
}

/** Plain / Markdown-lite: paragraphs split by blank lines; single-line ## / ### headings. */
export function plainToArticleHtml(raw: string): { html: string; headings: BlogTocHeading[] } {
  const headings: BlogTocHeading[] = [];
  const used = new Set<string>();
  const blocks = raw.trim().split(/\n\n+/);
  const parts: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    const h2 = /^##\s+(.+)$/.exec(trimmed);
    const h3 = /^###\s+(.+)$/.exec(trimmed);
    if (h2 && !trimmed.includes("\n")) {
      const text = h2[1].trim();
      const id = uniqueId(slugifyHeading(text), used);
      headings.push({ id, text, level: 2 });
      parts.push(`<h2 id="${id}">${escapeHtml(text)}</h2>`);
      continue;
    }
    if (h3 && !trimmed.includes("\n")) {
      const text = h3[1].trim();
      const id = uniqueId(slugifyHeading(text), used);
      headings.push({ id, text, level: 3 });
      parts.push(`<h3 id="${id}">${escapeHtml(text)}</h3>`);
      continue;
    }
    const withBreaks = escapeHtml(trimmed).replace(/\n/g, "<br />");
    parts.push(`<p class="blog-plain-paragraph">${withBreaks}</p>`);
  }

  return { html: parts.join("\n"), headings };
}

export function isLikelyHtml(content: string): boolean {
  const t = content.trimStart();
  if (t.startsWith("<")) return true;
  return /<\/(p|div|h[1-6]|article|section|ul|ol)\s*>/i.test(content);
}

export function preparePostArticleHtml(content: string): { html: string; headings: BlogTocHeading[] } {
  if (isLikelyHtml(content)) {
    return injectHeadingIds(content);
  }
  return plainToArticleHtml(content);
}

export function resolvePostCoverUrl(post: {
  bannerImageUrl?: string | null;
  coverImageUrl?: string | null;
  imageUrl?: string | null;
  image?: string | null;
}): string | undefined {
  return (
    post.bannerImageUrl ??
    post.coverImageUrl ??
    post.imageUrl ??
    post.image ??
    undefined
  );
}
