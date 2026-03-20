import type { ReactNode } from "react";
import { AuthBackLink } from "@/components/AuthBackLink";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center px-4 py-14 sm:px-6">
      <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm shadow-slate-900/5 sm:p-9 dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-black/25">
        <AuthBackLink />
        {children}
      </section>
    </main>
  );
}

