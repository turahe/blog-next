import { describe, expect, it } from "vitest";
import { postExcerpt } from "./excerpt";

describe("postExcerpt", () => {
  it("returns empty string for undefined", () => {
    expect(postExcerpt(undefined)).toBe("");
  });

  it("returns full plain text when under max length", () => {
    expect(postExcerpt("Hello **world**")).toBe("Hello world");
  });

  it("strips HTML tags", () => {
    expect(postExcerpt("<p>Hi</p> there")).toBe("Hi there");
  });

  it("truncates with ellipsis when over max", () => {
    const long = "a".repeat(250);
    const out = postExcerpt(long, 200);
    expect(out.endsWith("…")).toBe(true);
    expect(out.length).toBeLessThanOrEqual(201);
  });

  it("uses custom max length", () => {
    const text = "word ".repeat(20).trim();
    const out = postExcerpt(text, 10);
    expect(out.endsWith("…")).toBe(true);
  });
});
