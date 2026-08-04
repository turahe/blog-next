import type { Post } from "@/types/post";

/**
 * Lightweight client-ready filter for blog index search (PRD FR-006 v1).
 * Matches title, body, tags, and category — case-insensitive substring.
 */
export function filterPostsByQuery(posts: Post[], query: string): Post[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return posts;

  return posts.filter((post) => {
    const parts = [
      post.title,
      post.content,
      post.category?.name,
      ...(post.tags?.map((tag) => tag.name) ?? []),
    ];
    return parts.some((part) => part?.toLowerCase().includes(needle));
  });
}
