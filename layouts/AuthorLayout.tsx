import Link from "next/link";
import type { ReactNode } from "react";

import type { Tag } from "@/types/tag";

export interface AuthorProfile {
  name: string;
  avatarUrl?: string;
  occupation?: string;
  company?: string;
  email?: string;
  twitter?: string;
  bluesky?: string;
  linkedin?: string;
  github?: string;
  tags?: Tag[];
}

interface AuthorLayoutProps {
  author: AuthorProfile;
  children: ReactNode;
}

export function AuthorLayout({ author, children }: AuthorLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        >
          Back to blog
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {author.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={author.avatarUrl}
              alt={author.name}
              className="h-16 w-16 rounded-full border border-slate-200 object-cover dark:border-slate-800"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-300">
              {author.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {author.name}
            </h1>
            {author.occupation || author.company ? (
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                {[author.occupation, author.company].filter(Boolean).join(" • ")}
              </p>
            ) : null}
          </div>
        </div>

        {children ? <div className="mt-6">{children}</div> : null}

        {author.tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {author.tags.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                #{t.name}
              </span>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}

