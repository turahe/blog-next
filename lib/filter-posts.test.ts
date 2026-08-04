import { describe, expect, it } from "vitest";
import { filterPostsByQuery } from "@/lib/filter-posts";
import type { Post } from "@/types/post";

const sample: Post[] = [
  {
    id: 1,
    title: "Reliable Go Services",
    content: "Timeouts and retries for backends.",
    tags: [{ id: 1, name: "Go", slug: "go" }],
    category: { id: 1, name: "Architecture", slug: "architecture" },
  },
  {
    id: 2,
    title: "Next.js Patterns",
    content: "Server Components first.",
    tags: [{ id: 2, name: "TypeScript", slug: "typescript" }],
  },
];

describe("filterPostsByQuery", () => {
  it("returns all posts for empty query", () => {
    expect(filterPostsByQuery(sample, "  ")).toHaveLength(2);
  });

  it("matches title", () => {
    expect(filterPostsByQuery(sample, "go services")).toEqual([sample[0]]);
  });

  it("matches tags and category", () => {
    expect(filterPostsByQuery(sample, "architecture")).toEqual([sample[0]]);
    expect(filterPostsByQuery(sample, "typescript")).toEqual([sample[1]]);
  });

  it("is case-insensitive", () => {
    expect(filterPostsByQuery(sample, "NEXT")).toEqual([sample[1]]);
  });
});
