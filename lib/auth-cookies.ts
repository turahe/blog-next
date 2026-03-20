/** Client-readable auth cookies (not HttpOnly). Keeps token I/O out of `api.ts` to avoid circular imports with `auth.service`. */

export const AUTH_ACCESS_COOKIE = "blog_access_token";
export const AUTH_REFRESH_COOKIE = "blog_refresh_token";

const AUTH_CHANGED_EVENT = "blog-auth-changed";

const DEFAULT_ACCESS_MAX_AGE_SEC = 3600;
const DEFAULT_REFRESH_MAX_AGE_SEC = 60 * 60 * 24 * 30;

function secureCookieSuffix(): string {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}

function accessMaxAgeSeconds(expiresAt?: string): number {
  if (expiresAt) {
    const end = Date.parse(expiresAt);
    if (!Number.isNaN(end)) {
      const sec = Math.floor((end - Date.now()) / 1000);
      if (sec > 60) return sec;
    }
  }
  return DEFAULT_ACCESS_MAX_AGE_SEC;
}

function writeCookie(name: string, value: string, maxAgeSec: number): void {
  if (typeof document === "undefined") return;
  const body = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSec}; SameSite=Lax${secureCookieSuffix()}`;
  document.cookie = body;
}

function eraseCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax${secureCookieSuffix()}`;
}

export function getAccessTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const target = `${encodeURIComponent(AUTH_ACCESS_COOKIE)}=`;
  for (const part of document.cookie.split("; ")) {
    if (part.startsWith(target)) {
      return decodeURIComponent(part.slice(target.length));
    }
  }
  return null;
}

export function setAuthCookies(
  accessToken: string,
  refreshToken?: string,
  expiresAt?: string,
): void {
  writeCookie(AUTH_ACCESS_COOKIE, accessToken, accessMaxAgeSeconds(expiresAt));
  if (refreshToken) {
    writeCookie(AUTH_REFRESH_COOKIE, refreshToken, DEFAULT_REFRESH_MAX_AGE_SEC);
  }
}

export function clearAuthCookies(): void {
  eraseCookie(AUTH_ACCESS_COOKIE);
  eraseCookie(AUTH_REFRESH_COOKIE);
}

export function notifyAuthChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export const authChangedEventName = AUTH_CHANGED_EVENT;
