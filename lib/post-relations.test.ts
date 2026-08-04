import { describe, expect, it } from "vitest";
import { getAdjacentPosts, pickRelatedPosts } from "@/lib/post-relations";
import type { Post } from "@/types/post";

const posts: Post[] = [
  {
    id: 1,
    title: "Old Go",
    content: "a",
    createdAt: "2024-01-01",
    tags: [{ id: 1, name: "Go", slug: "go" }],
    category: { id: 1, name: "Backend", slug: "backend" },
  },
  {
    id: 2,
    title: "Mid TS",
    content: "b",
    createdAt: "2024-06-01",
    tags: [{ id: 2, name: "TypeScript", slug: "typescript" }],
  },
  {
    id: 3,
    title: "New Go",
    content: "c",
    createdAt: "2025-01-01",
    tags: [{ id: 1, name: "Go", slug: "go" }],
    category: { id: 1, name: "Backend", slug: "backend" },
  },
];

describe("getAdjacentPosts", () => {
  it("returns older as previous and newer as next", () => {
    const { previous, next } = getAdjacentPosts(posts[1], posts);
    expect(previous?.title).toBe("Old Go");
    expect(next?.title).toBe("New Go");
  });
});

describe("pickRelatedPosts", () => {
  it("prefers shared tags", () => {
    const related = pickRelatedPosts(posts[2], posts, 2);
    expect(related[0]?.id).toBe(1);
  });
});
