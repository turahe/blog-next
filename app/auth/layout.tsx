import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center px-4 py-14 sm:px-6">
      <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm shadow-slate-900/5 sm:p-9 dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-black/25">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
        >
          Back to blog
        </Link>
        {children}
      </section>
    </main>
  );
}

