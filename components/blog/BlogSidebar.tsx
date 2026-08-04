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
  tocLabel: string;
  shareLabel: string;
  tagsLabel: string;
};

export function BlogSidebar({
  headings,
  tags,
  shareUrl,
  shareTitle,
  tocLabel,
  shareLabel,
  tagsLabel,
}: BlogSidebarProps) {
  const { activeId, scrollToHeading } = useBlogToc();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-10">
        {headings.length > 0 ? (
          <nav aria-label={tocLabel}>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {tocLabel}
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
                        "relative -ml-px block border-l-2 border-transparent py-1.5 pl-3 text-sm transition-colors",
                        h.level === 3 && "pl-5",
                        active
                          ? "border-primary font-medium text-primary"
                          : "text-muted-foreground hover:border-border hover:text-foreground",
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
          <h2 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {shareLabel}
          </h2>
          <div className="mt-3">
            <BlogShareButtons url={shareUrl} title={shareTitle} />
          </div>
        </div>

        {tags.length > 0 ? (
          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {tagsLabel}
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
