import { describe, expect, it } from "vitest";
import {
  formatReadingTime,
  getReadingTimeMinutes,
} from "./reading-time";

describe("getReadingTimeMinutes", () => {
  it("returns 0 for undefined or blank content", () => {
    expect(getReadingTimeMinutes(undefined)).toBe(0);
    expect(getReadingTimeMinutes("   ")).toBe(0);
  });

  it("returns 1 for content that strips to no words", () => {
    expect(getReadingTimeMinutes("```\n```")).toBe(1);
  });

  it("returns 1 for a single word at default WPM", () => {
    expect(getReadingTimeMinutes("hello")).toBe(1);
  });

  it("ceil to whole minutes from word count and WPM", () => {
    const twoHundredWords = Array(200).fill("word").join(" ");
    expect(getReadingTimeMinutes(twoHundredWords)).toBe(1);
    const twoHundredOneWords = Array(201).fill("word").join(" ");
    expect(getReadingTimeMinutes(twoHundredOneWords)).toBe(2);
  });

  it("respects custom words per minute", () => {
    const hundredWords = Array(100).fill("w").join(" ");
    expect(getReadingTimeMinutes(hundredWords, 100)).toBe(1);
    expect(getReadingTimeMinutes(hundredWords, 50)).toBe(2);
  });

  it("strips markdown-like syntax before counting words", () => {
    const md = "# Title\n\n`code` and [link text](https://x.com) **bold**";
    expect(getReadingTimeMinutes(md)).toBe(1);
  });
});

describe("formatReadingTime", () => {
  it('uses "1 min read" when minutes resolve to 0', () => {
    expect(formatReadingTime(undefined)).toBe("1 min read");
  });

  it("includes minute count for non-empty content", () => {
    expect(formatReadingTime("one two three")).toMatch(/^\d+ min read$/);
  });
});
