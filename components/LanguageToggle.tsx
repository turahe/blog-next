"use client";

import clsx from "clsx";
import { useLocale } from "@/contexts/LocaleProvider";
import type { Locale } from "@/lib/i18n";

const options: { value: Locale; label: string; aria: string }[] = [
  { value: "en", label: "EN", aria: "English" },
  { value: "id", label: "ID", aria: "Indonesia" },
];

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="flex items-center rounded-full border border-slate-300/90 bg-slate-100/90 p-0.5 dark:border-slate-600 dark:bg-slate-800/90"
      role="group"
      aria-label={t("language.label")}
    >
      {options.map(({ value, label, aria }) => (
        <button
          key={value}
          type="button"
          aria-label={aria}
          aria-pressed={locale === value}
          onClick={() => setLocale(value)}
          className={clsx(
            "min-w-[2rem] rounded-full px-2 py-1 text-[0.65rem] font-medium transition-colors",
            locale === value
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-50"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
