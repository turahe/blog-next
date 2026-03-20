"use client";

import dynamic from "next/dynamic";
import { siteMetadata } from "@/lib/site-metadata";

const strings =
  siteMetadata.about.length > 0
    ? [...siteMetadata.about]
    : [`Hi, I am ${siteMetadata.author}`];

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
  loading: () => (
    <span className="inline-block">{strings[0] ?? ""}</span>
  ),
});

export function HeroGreetingTypewriter() {
  return (
    <span className="inline-block min-h-[1.75rem] sm:min-h-[2.25rem] md:min-h-[3.5rem]">
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
          delay: 38,
          deleteSpeed: 28,
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
