import { describe, expect, it } from "vitest";
import { apiCache } from "@/lib/api/cache";

describe("apiCache", () => {
  it("defines intentional revalidate windows", () => {
    expect(apiCache.blogList.revalidate).toBe(60);
    expect(apiCache.blogDetail.revalidate).toBe(60);
    expect(apiCache.projects.revalidate).toBe(120);
    expect(apiCache.profile.revalidate).toBe(300);
    expect(apiCache.dynamic.revalidate).toBe(false);
  });

  it("builds per-resource cache tags", () => {
    expect([...apiCache.blogDetail.tags("hello-world")]).toEqual([
      "blog-post-hello-world",
    ]);
    expect([...apiCache.projectDetail.tags("payment-platform")]).toEqual([
      "project-payment-platform",
    ]);
  });
});
