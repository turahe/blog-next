"use client";

import clsx from "clsx";
import { BlogShareButtons } from "@/components/blog/BlogShareButtons";
import { useBlogToc } from "@/components/blog/blog-toc-context";
import { TagChip } from "@/components/TagChip";
import type { BlogTocHeading } from "@/lib/blog-content";
import type { Tag } from "@/types/tag";

type BlogSidebarProps = {
  headings: BlogTocHeading[];
  tags: Tag[];
  shareUrl: string;
  shareTitle: string;
};

export function BlogSidebar({ headings, tags, shareUrl, shareTitle }: BlogSidebarProps) {
  const { activeId, scrollToHeading } = useBlogToc();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-10">
        {headings.length > 0 ? (
          <nav aria-label="Table of contents">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              On this page
            </h2>
            <ul className="mt-4 space-y-1">
              {headings.map((h) => {
                const active = activeId === h.id;
                return (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHeading(h.id);
                      }}
                      className={clsx(
                        "relative block border-l-2 border-transparent py-1.5 pl-3 text-sm transition-colors -ml-px",
                        h.level === 3 && "pl-5",
                        active
                          ? "border-primary-500 font-medium text-primary-700 dark:border-primary-400 dark:text-primary-300"
                          : "text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-100",
                      )}
                    >
                      {h.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Share
          </h2>
          <div className="mt-3">
            <BlogShareButtons url={shareUrl} title={shareTitle} />
          </div>
        </div>

        {tags.length > 0 ? (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Tags
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagChip key={tag.id} tag={tag} href={`/tags/${tag.slug}`} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
