export const LOCALE_COOKIE = "go-blog-locale";

export type Locale = "en" | "id";

export const locales: Locale[] = ["en", "id"];

export const defaultLocale: Locale = "en";

export function resolveLocale(value: string | undefined): Locale {
  if (value === "id" || value === "en") return value;
  return defaultLocale;
}
