import type { Post } from "@/types/post";

export type AdjacentPostLink = {
  href: string;
  title: string;
};

function postHref(post: Post): string {
  return post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
}

function postTime(post: Post): number {
  return post.createdAt ? Date.parse(post.createdAt) : 0;
}

/**
 * Sort newest-first, then return chronological neighbors for prev/next nav.
 * `previous` = older article, `next` = newer article.
 */
export function getAdjacentPosts(
  current: Post,
  posts: Post[],
): { previous?: AdjacentPostLink; next?: AdjacentPostLink } {
  const sorted = [...posts].sort((a, b) => postTime(b) - postTime(a));
  const index = sorted.findIndex((p) => p.id === current.id);
  if (index < 0) return {};

  const newer = index > 0 ? sorted[index - 1] : undefined;
  const older = index < sorted.length - 1 ? sorted[index + 1] : undefined;

  return {
    next: newer
      ? { href: postHref(newer), title: newer.title }
      : undefined,
    previous: older
      ? { href: postHref(older), title: older.title }
      : undefined,
  };
}

/**
 * Prefer posts sharing tags/category; fill with recent posts.
 */
export function pickRelatedPosts(
  current: Post,
  candidates: Post[],
  limit = 3,
): Post[] {
  const others = candidates.filter((p) => p.id !== current.id);
  const tagIds = new Set(current.tags?.map((t) => t.id) ?? current.tagIds ?? []);
  const categoryId = current.categoryId ?? current.category?.id;

  const scored = others.map((post) => {
    let score = 0;
    for (const tag of post.tags ?? []) {
      if (tagIds.has(tag.id)) score += 2;
    }
    for (const id of post.tagIds ?? []) {
      if (tagIds.has(id)) score += 2;
    }
    const postCategory = post.categoryId ?? post.category?.id;
    if (categoryId != null && postCategory === categoryId) score += 1;
    return { post, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return postTime(b.post) - postTime(a.post);
  });

  return scored.slice(0, limit).map((s) => s.post);
}
