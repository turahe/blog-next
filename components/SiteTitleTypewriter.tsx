"use client";

import dynamic from "next/dynamic";
import { siteMetadata } from "@/lib/site-metadata";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
  loading: () => (
    <span className="inline-block tabular-nums">{siteMetadata.title}</span>
  ),
});

export function SiteTitleTypewriter() {
  const title = siteMetadata.title;

  return (
    <span className="text-primary-color-500 dark:text-primary-color-dark-500" aria-hidden>
      <Typewriter
        options={{
          strings: [title],
          autoStart: true,
          loop: false,
          delay: 42,
          cursor: "|",
          skipAddStyles: true,
          wrapperClassName: "inline",
          cursorClassName:
            "ml-0.5 inline-block animate-pulse font-light text-primary-500 dark:text-primary-400",
        }}
      />
    </span>
  );
}
