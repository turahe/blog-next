"use client";

import Link from "next/link";
import clsx from "clsx";
import { useLocale } from "@/contexts/LocaleProvider";

export function AuthBackLink({ variant = "auth" }: { variant?: "auth" | "inline" }) {
  const { t } = useLocale();
  return (
    <Link
      href="/"
      className={clsx(
        "inline-block text-sm font-medium transition",
        variant === "auth" &&
          "mb-6 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100",
        variant === "inline" &&
          "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100",
      )}
    >
      {t("auth.backToBlog")}
    </Link>
  );
}
