import { describe, expect, it } from "vitest";
import { designTokens, ds } from "@/lib/design-tokens";

describe("typography design tokens", () => {
  it("exposes a full editorial scale", () => {
    expect(designTokens.typography.display).toContain("text-display-lg");
    expect(designTokens.typography.h1).toContain("text-display");
    expect(designTokens.typography.h2).toContain("text-heading-lg");
    expect(designTokens.typography.body).toContain("text-body");
    expect(designTokens.typography.small).toContain("text-small");
  });

  it("provides class helpers for headings and body copy", () => {
    expect(ds.display).toContain("font-display");
    expect(ds.h2).toContain("text-heading-lg");
    expect(ds.lead).toContain("text-body-lg");
    expect(ds.label).toContain("uppercase");
  });
});
