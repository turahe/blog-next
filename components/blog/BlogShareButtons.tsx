"use client";

import { useCallback, useState } from "react";

type BlogShareButtonsProps = {
  url: string;
  title: string;
};

export function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [url]);

  const enc = encodeURIComponent;
  const xHref = `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;

  const btnClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-100";

  return (
    <div className="flex flex-wrap gap-2">
      <a href={xHref} target="_blank" rel="noopener noreferrer" className={btnClass} aria-label="Share on X">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.901 1.153h3.68l-8.042 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.474l8.599-9.826L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.291 19.49h2.04L6.486 3.245H4.298L17.61 20.643Z" />
        </svg>
      </a>
      <a
        href={liHref}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="Share on LinkedIn"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.028-3.036-1.849-3.036-1.851 0-2.134 1.445-2.134 2.939v5.666H9.36V9h3.413v1.561h.049c.476-.9 1.637-1.849 3.369-1.849 3.602 0 4.266 2.37 4.266 5.455v6.285ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.114 20.452H3.558V9h3.556v11.452ZM22.225 0H1.771A1.772 1.772 0 0 0 0 1.771v20.458C0 23.203.797 24 1.771 24h20.451A1.774 1.774 0 0 0 24 22.229V1.771A1.774 1.774 0 0 0 22.225 0Z" />
        </svg>
      </a>
      <button type="button" onClick={copy} className={btnClass} aria-label="Copy link">
        {copied ? (
          <span className="text-[10px] font-semibold text-primary-600 dark:text-primary-400">OK</span>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
