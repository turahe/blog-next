type BlogContentProps = {
  html: string;
};

/** Rich article body: Tailwind Typography tuned for long-form reading (~65ch via max-w-3xl on parent). */
export function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className={[
        "blog-prose prose prose-slate max-w-none text-[1.0625rem] leading-8 dark:prose-invert",
        "prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-slate-50",
        /* Heading rhythm: generous space before, tight space after (clear ladder) */
        "prose-h2:mt-14 prose-h2:mb-3 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2.5 prose-h2:text-2xl prose-h2:leading-snug sm:prose-h2:mt-16 dark:prose-h2:border-slate-700",
        "prose-h3:mt-10 prose-h3:mb-2 prose-h3:text-xl prose-h3:leading-snug sm:prose-h3:mt-12",
        "prose-h4:mt-8 prose-h4:mb-2 prose-h4:text-lg prose-h4:leading-snug prose-h4:text-slate-800 dark:prose-h4:text-slate-100",
        /* Body: comfortable line height & paragraph separation */
        "prose-p:mt-6 prose-p:mb-0 prose-p:leading-8 prose-p:text-slate-600 dark:prose-p:text-slate-300",
        /* Tighter gap directly under headings (avoids mb+h2 + mt-6 p feeling too loose) */
        "[&_h2+p]:mt-3 [&_h3+p]:mt-2 [&_h4+p]:mt-2",
        "[&>p:first-child]:mt-0",
        "prose-li:my-2 prose-li:leading-8 prose-ul:my-6 prose-ol:my-6",
        /* Link color + weight; underline animation via globals `.blog-prose` */
        "prose-a:font-medium prose-a:text-primary-600 prose-a:no-underline dark:prose-a:text-primary-400",
        "prose-strong:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-slate-100",
        "prose-blockquote:my-8 prose-blockquote:border-l-[3px] prose-blockquote:border-primary-500 prose-blockquote:bg-slate-50/80 prose-blockquote:py-2 prose-blockquote:pl-5 prose-blockquote:pr-3 prose-blockquote:leading-8 prose-blockquote:italic prose-blockquote:text-slate-700 dark:prose-blockquote:border-primary-400 dark:prose-blockquote:bg-slate-800/40 dark:prose-blockquote:text-slate-300",
        /* Inline code */
        "prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-normal prose-code:text-primary-900 prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-slate-800 dark:prose-code:text-primary-200",
        /* Fenced blocks: recessed, rounded, padded */
        "prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:border prose-pre:border-slate-800 prose-pre:bg-slate-950 prose-pre:px-5 prose-pre:py-5 prose-pre:leading-relaxed prose-pre:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:prose-pre:px-6 sm:prose-pre:py-6 dark:prose-pre:border-slate-700/90",
        "prose-pre:text-[0.9375rem] prose-pre:text-slate-100",
        "prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-[length:inherit] prose-pre:code:font-normal prose-pre:code:text-inherit prose-pre:code:rounded-none prose-pre:code:before:content-none prose-pre:code:after:content-none",
        "prose-img:mx-auto prose-img:max-h-[min(520px,70vh)] prose-img:w-auto prose-img:rounded-xl prose-img:ring-1 prose-img:ring-slate-200/80 dark:prose-img:ring-slate-700",
        "[&_img]:transition-transform [&_img]:duration-[400ms] [&_img]:ease-out [&_img]:hover:scale-[1.03] motion-reduce:[&_img]:transition-none motion-reduce:[&_img]:hover:scale-100",
        "prose-hr:my-14 prose-hr:border-slate-200 dark:prose-hr:border-slate-700",
        "prose-table:text-[0.9375rem] prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
