import { describe, expect, it } from "vitest";
import {
  ApiRequestError,
  isTransientStatus,
  parseApiErrorBody,
  toApiRequestError,
} from "@/lib/api/errors";

describe("parseApiErrorBody", () => {
  it("parses the preferred error shape", () => {
    expect(
      parseApiErrorBody({
        error: { code: "RESOURCE_NOT_FOUND", message: "Post not found" },
      }),
    ).toEqual({
      error: { code: "RESOURCE_NOT_FOUND", message: "Post not found" },
    });
  });

  it("parses envelope message variants", () => {
    expect(
      parseApiErrorBody({ code: 404, message: "missing" }),
    ).toEqual({
      error: { code: "404", message: "missing" },
    });
  });

  it("returns null for unknown payloads", () => {
    expect(parseApiErrorBody(null)).toBeNull();
    expect(parseApiErrorBody({ foo: "bar" })).toBeNull();
  });
});

describe("toApiRequestError", () => {
  it("preserves ApiRequestError instances", () => {
    const original = new ApiRequestError("gone", 404, "RESOURCE_NOT_FOUND");
    expect(toApiRequestError(original)).toBe(original);
  });

  it("maps timeout errors", () => {
    const error = new Error("aborted");
    error.name = "TimeoutError";
    const mapped = toApiRequestError(error);
    expect(mapped).toBeInstanceOf(ApiRequestError);
    expect(mapped.status).toBe(408);
    expect(mapped.code).toBe("TIMEOUT");
  });
});

describe("isTransientStatus", () => {
  it("marks 502/503/504 as transient", () => {
    expect(isTransientStatus(502)).toBe(true);
    expect(isTransientStatus(503)).toBe(true);
    expect(isTransientStatus(504)).toBe(true);
    expect(isTransientStatus(404)).toBe(false);
    expect(isTransientStatus(500)).toBe(false);
  });
});
