import "server-only";
import { getApiBaseUrl } from "@/lib/api/config";
import {
  ApiRequestError,
  normalizeHttpError,
  toApiRequestError,
} from "@/lib/api/errors";

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_REVALIDATE_SECONDS = 60;

export { getApiBaseUrl, ApiRequestError };

export type ApiRequestOptions = {
  method?: "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
  timeoutMs?: number;
  /** Next.js fetch cache revalidate in seconds. Use `false` for no-store. */
  revalidate?: number | false;
  cache?: RequestCache;
  tags?: string[];
  /** Retry once on 502/503/504. Default false. */
  retryTransient?: boolean;
};

function buildUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalized}`;
}

async function executeFetch(
  url: string,
  init: RequestInit & {
    next?: { revalidate?: number | false; tags?: string[] };
  },
): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (error) {
    throw toApiRequestError(error);
  }
}

/**
 * Centralized server-side HTTP client for the REST API.
 * Presentation components must not call fetch against the API directly.
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    revalidate = DEFAULT_REVALIDATE_SECONDS,
    cache = "force-cache",
    tags,
    retryTransient = false,
  } = options;

  const init: RequestInit & {
    next?: { revalidate?: number | false; tags?: string[] };
  } = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    signal: AbortSignal.timeout(timeoutMs),
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  const isRead = method === "GET" || method === "HEAD";
  if (isRead) {
    if (revalidate === false) {
      init.cache = "no-store";
    } else {
      init.cache = cache;
      init.next = { revalidate, ...(tags ? { tags } : {}) };
    }
  } else {
    init.cache = "no-store";
  }

  const url = buildUrl(path);
  let response = await executeFetch(url, init);

  if (
    retryTransient &&
    (response.status === 502 ||
      response.status === 503 ||
      response.status === 504)
  ) {
    response = await executeFetch(url, init);
  }

  if (!response.ok) {
    throw await normalizeHttpError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
