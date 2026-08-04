/**
 * Shared API base URL resolution (safe for unit tests and both runtimes).
 * Prefer `API_BASE_URL` on the server; `NEXT_PUBLIC_API_BASE_URL` is the fallback.
 */
export function getApiBaseUrl(): string {
  const base =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8080/api/v1";

  return base.replace(/\/$/, "");
}
