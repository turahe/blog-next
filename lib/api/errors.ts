import type { ApiErrorBody } from "@/lib/api/types";

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
  }
}

const STATUS_FALLBACKS: Record<number, { code: string; message: string }> = {
  400: { code: "BAD_REQUEST", message: "The request was invalid." },
  401: {
    code: "UNAUTHENTICATED",
    message: "Authentication is required.",
  },
  403: {
    code: "FORBIDDEN",
    message: "You do not have access to this resource.",
  },
  404: {
    code: "RESOURCE_NOT_FOUND",
    message: "The requested resource was not found.",
  },
  408: {
    code: "TIMEOUT",
    message: "The request timed out. Please try again.",
  },
  409: {
    code: "CONFLICT",
    message: "The request conflicted with the current state.",
  },
  422: {
    code: "VALIDATION_ERROR",
    message: "Some fields failed validation.",
  },
  429: {
    code: "RATE_LIMITED",
    message: "Too many requests. Please try again later.",
  },
  500: {
    code: "SERVER_ERROR",
    message: "Something went wrong. Please try again later.",
  },
  502: {
    code: "BAD_GATEWAY",
    message: "The upstream service is temporarily unavailable.",
  },
  503: {
    code: "SERVICE_UNAVAILABLE",
    message: "The service is temporarily unavailable.",
  },
  504: {
    code: "GATEWAY_TIMEOUT",
    message: "The upstream service timed out.",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Parse a JSON error body into the preferred docs/api.md §15 shape when possible.
 */
export function parseApiErrorBody(payload: unknown): ApiErrorBody | null {
  if (!isRecord(payload)) return null;

  if (isRecord(payload.error)) {
    const code = payload.error.code;
    const message = payload.error.message;
    if (typeof code === "string" && typeof message === "string") {
      return { error: { code, message } };
    }
  }

  // Common envelope variants from the current backend
  if (typeof payload.message === "string") {
    const code =
      typeof payload.code === "string"
        ? payload.code
        : typeof payload.code === "number"
          ? String(payload.code)
          : "UNKNOWN_ERROR";
    return { error: { code, message: payload.message } };
  }

  return null;
}

function userFacingMessage(
  status: number,
  parsed: ApiErrorBody | null,
): string {
  if (parsed?.error.message && status < 500) {
    return parsed.error.message;
  }

  return (
    STATUS_FALLBACKS[status]?.message ??
    "Something went wrong. Please try again later."
  );
}

function errorCode(status: number, parsed: ApiErrorBody | null): string {
  if (parsed?.error.code) return parsed.error.code;
  return STATUS_FALLBACKS[status]?.code ?? "UNKNOWN_ERROR";
}

/**
 * Normalize a failed HTTP response into `ApiRequestError`.
 * Never surfaces raw 5xx backend payloads to end users.
 */
export async function normalizeHttpError(
  response: Response,
): Promise<ApiRequestError> {
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  const parsed = parseApiErrorBody(payload);
  return new ApiRequestError(
    userFacingMessage(response.status, parsed),
    response.status,
    errorCode(response.status, parsed),
  );
}

/**
 * Map any thrown value into a stable `ApiRequestError`.
 */
export function toApiRequestError(error: unknown): ApiRequestError {
  if (error instanceof ApiRequestError) {
    return error;
  }

  if (
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError")
  ) {
    return new ApiRequestError(
      STATUS_FALLBACKS[408].message,
      408,
      "TIMEOUT",
    );
  }

  if (error instanceof Error) {
    return new ApiRequestError(
      error.message || STATUS_FALLBACKS[500].message,
      0,
      "NETWORK_ERROR",
    );
  }

  return new ApiRequestError(
    STATUS_FALLBACKS[500].message,
    0,
    "UNKNOWN_ERROR",
  );
}

/** Whether the status is a transient upstream failure eligible for retry. */
export function isTransientStatus(status: number): boolean {
  return status === 502 || status === 503 || status === 504;
}
