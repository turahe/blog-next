"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useBlogToc } from "@/components/blog/blog-toc-context";
import type { BlogTocHeading } from "@/lib/blog-content";

type BlogTocMobileProps = {
  headings: BlogTocHeading[];
};

export function BlogTocMobile({ headings }: BlogTocMobileProps) {
  const { activeId, scrollToHeading } = useBlogToc();

  if (headings.length === 0) return null;

  return (
    <div className="mb-10 lg:hidden">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton
              className={clsx(
                "flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:hover:bg-slate-800",
                open && "rounded-b-none border-b-0 dark:border-b-0",
              )}
            >
              <span>Table of contents</span>
              <ChevronDownIcon
                className={clsx("h-4 w-4 shrink-0 text-slate-500 transition-transform motion-reduce:transition-none", open && "rotate-180")}
                aria-hidden
              />
            </DisclosureButton>
            <DisclosurePanel
              transition
              className="origin-top transition duration-200 ease-out data-closed:opacity-0 data-closed:-translate-y-1"
            >
              {({ close }) => (
                <div className="rounded-b-xl border border-t-0 border-slate-200 bg-white px-2 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <ul className="max-h-[min(50vh,20rem)] space-y-0.5 overflow-y-auto overscroll-contain">
                    {headings.map((h) => {
                      const active = activeId === h.id;
                      return (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToHeading(h.id, { onDone: close });
                            }}
                            className={clsx(
                              "block rounded-lg px-3 py-2 text-sm transition-colors",
                              h.level === 3 && "pl-6",
                              active
                                ? "bg-primary-500/10 font-medium text-primary-700 dark:bg-primary-500/15 dark:text-primary-300"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100",
                            )}
                          >
                            {h.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
