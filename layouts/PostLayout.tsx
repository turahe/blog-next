import type { ReactNode } from "react";
import Link from "next/link";

import type { Post } from "@/types/post";
import type { Tag } from "@/types/tag";
import { TagChip } from "@/components/TagChip";

interface PostNav {
  href: string;
  title: string;
}

interface PostLayoutProps {
  post: Post;
  publishedAt: string;
  tags?: Tag[];
  backHref?: string;
  editActions?: ReactNode;
  prev?: PostNav;
  next?: PostNav;
  children: ReactNode;
}

export function PostLayout({
  post,
  publishedAt,
  tags = [],
  backHref = "/",
  editActions,
  children,
}: PostLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Link
          href={backHref}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        >
          Back to posts
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="max-w-3xl">{children}</article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Metadata
            </h2>

            <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Published
                </p>
                <p className="mt-1">{publishedAt}</p>
              </div>

              {post.category?.name ? (
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Category
                  </p>
                  <p className="mt-1">{post.category.name}</p>
                </div>
              ) : null}

              {tags.length ? (
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Tags
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <TagChip key={tag.id} tag={tag} href={`/tags/${tag.slug}`} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {editActions ? (
              <div className="mt-5 flex items-center gap-2">{editActions}</div>
            ) : null}
          </div>
        </aside>
      </div>
    </main>
  );
}

