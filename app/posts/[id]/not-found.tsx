import Link from "next/link";
import { cookies } from "next/headers";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";

export default async function NotFound() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <div className="rounded-xl border border-slate-200/90 bg-white p-8 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-black/20">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{t("posts.notFoundTitle")}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">{t("posts.notFoundDescription")}</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          {t("posts.backToHome")}
        </Link>
      </div>
    </main>
  );
}
