"use client";

import { BlogCodeCopy } from "@/components/blog/BlogCodeCopy";

type BlogContentProps = {
  html: string;
  copyLabel: string;
  copiedLabel: string;
};

/** Rich article body: Tailwind Typography tuned for long-form reading. */
export function BlogContent({
  html,
  copyLabel,
  copiedLabel,
}: BlogContentProps) {
  return (
    <BlogCodeCopy copyLabel={copyLabel} copiedLabel={copiedLabel}>
      <div
        className={[
          "blog-prose prose prose-neutral max-w-none text-[1.0625rem] leading-8 dark:prose-invert",
          "prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
          "prose-h2:mt-14 prose-h2:mb-3 prose-h2:border-b prose-h2:border-border prose-h2:pb-2.5 prose-h2:text-2xl prose-h2:leading-snug sm:prose-h2:mt-16",
          "prose-h3:mt-10 prose-h3:mb-2 prose-h3:text-xl prose-h3:leading-snug sm:prose-h3:mt-12",
          "prose-h4:mt-8 prose-h4:mb-2 prose-h4:text-lg prose-h4:leading-snug",
          "prose-p:mt-6 prose-p:mb-0 prose-p:leading-8 prose-p:text-muted-foreground",
          "[&_h2+p]:mt-3 [&_h3+p]:mt-2 [&_h4+p]:mt-2",
          "[&>p:first-child]:mt-0",
          "prose-li:my-2 prose-li:leading-8 prose-ul:my-6 prose-ol:my-6",
          "prose-a:font-medium prose-a:text-primary prose-a:no-underline",
          "prose-strong:font-semibold prose-strong:text-foreground",
          "prose-blockquote:my-8 prose-blockquote:border-l-[3px] prose-blockquote:border-primary prose-blockquote:bg-muted/40 prose-blockquote:py-2 prose-blockquote:pl-5 prose-blockquote:pr-3 prose-blockquote:leading-8 prose-blockquote:italic prose-blockquote:text-muted-foreground",
          "prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-normal prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none",
          "prose-pre:my-0 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-[#0b0f14] prose-pre:px-5 prose-pre:py-5 prose-pre:leading-relaxed sm:prose-pre:px-6 sm:prose-pre:py-6",
          "prose-pre:text-[0.9375rem] prose-pre:text-slate-100",
          "prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-[length:inherit] prose-pre:code:font-normal prose-pre:code:text-inherit prose-pre:code:rounded-none prose-pre:code:before:content-none prose-pre:code:after:content-none",
          "prose-img:mx-auto prose-img:max-h-[min(520px,70vh)] prose-img:w-auto prose-img:rounded-xl prose-img:ring-1 prose-img:ring-border",
          "[&_img]:transition-transform [&_img]:duration-[400ms] [&_img]:ease-out [&_img]:hover:scale-[1.03] motion-reduce:[&_img]:transition-none motion-reduce:[&_img]:hover:scale-100",
          "prose-hr:my-14 prose-hr:border-border",
          "prose-table:my-8 prose-table:block prose-table:w-full prose-table:max-w-full prose-table:overflow-x-auto prose-table:text-[0.9375rem]",
          "prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2",
          "[&_pre]:max-w-full",
          "[&_img]:h-auto [&_img]:max-w-full",
        ].join(" ")}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </BlogCodeCopy>
  );
}
