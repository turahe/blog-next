"use client";

import { useLocale } from "@/contexts/LocaleProvider";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { t } = useLocale();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <div className="rounded-xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-2xl font-semibold text-red-700">{t("posts.errorTitle")}</h2>
        <p className="mt-3 text-red-600">{error.message || t("posts.errorFallback")}</p>
        <button
          onClick={reset}
          className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          {t("posts.retry")}
        </button>
      </div>
    </main>
  );
}
