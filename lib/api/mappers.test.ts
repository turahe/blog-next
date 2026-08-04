import { describe, expect, it } from "vitest";
import { mapPostToBlogPost } from "@/lib/api/mappers";
import type { Post } from "@/types/post";

describe("mapPostToBlogPost", () => {
  it("maps a backend post onto the canonical BlogPost shape", () => {
    const post: Post = {
      id: 42,
      title: "Reliable Go Services",
      content: "Building # reliable services with Go.",
      slug: "reliable-go-services",
      createdAt: "2026-08-01T00:00:00.000Z",
      tags: [{ id: 1, name: "Go", slug: "go" }],
      category: { id: 2, name: "Backend", slug: "backend" },
      coverImageUrl: "https://cdn.example.com/cover.jpg",
    };

    expect(mapPostToBlogPost(post)).toMatchObject({
      id: 42,
      slug: "reliable-go-services",
      title: "Reliable Go Services",
      draft: false,
      featured: false,
      coverImage: "https://cdn.example.com/cover.jpg",
      publishedAt: "2026-08-01T00:00:00.000Z",
      tags: [{ id: 1, name: "Go", slug: "go" }],
      category: { id: 2, name: "Backend", slug: "backend" },
    });
  });

  it("falls back to id when slug is missing", () => {
    const post: Post = {
      id: 7,
      title: "Untitled",
      content: "Body",
    };

    expect(mapPostToBlogPost(post).slug).toBe("7");
  });
});
