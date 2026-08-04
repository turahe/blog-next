import { describe, expect, it } from "vitest";
import { getApiBaseUrl } from "@/lib/api/config";

describe("getApiBaseUrl", () => {
  it("strips a trailing slash from the configured base URL", () => {
    const previousApi = process.env.API_BASE_URL;
    const previousPublic = process.env.NEXT_PUBLIC_API_BASE_URL;

    process.env.API_BASE_URL = "https://api.example.com/api/v1/";
    delete process.env.NEXT_PUBLIC_API_BASE_URL;

    expect(getApiBaseUrl()).toBe("https://api.example.com/api/v1");

    if (previousApi === undefined) {
      delete process.env.API_BASE_URL;
    } else {
      process.env.API_BASE_URL = previousApi;
    }

    if (previousPublic === undefined) {
      delete process.env.NEXT_PUBLIC_API_BASE_URL;
    } else {
      process.env.NEXT_PUBLIC_API_BASE_URL = previousPublic;
    }
  });

  it("prefers API_BASE_URL over NEXT_PUBLIC_API_BASE_URL", () => {
    const previousApi = process.env.API_BASE_URL;
    const previousPublic = process.env.NEXT_PUBLIC_API_BASE_URL;

    process.env.API_BASE_URL = "https://server.example.com/api/v1";
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://public.example.com/api/v1";

    expect(getApiBaseUrl()).toBe("https://server.example.com/api/v1");

    if (previousApi === undefined) {
      delete process.env.API_BASE_URL;
    } else {
      process.env.API_BASE_URL = previousApi;
    }

    if (previousPublic === undefined) {
      delete process.env.NEXT_PUBLIC_API_BASE_URL;
    } else {
      process.env.NEXT_PUBLIC_API_BASE_URL = previousPublic;
    }
  });
});
