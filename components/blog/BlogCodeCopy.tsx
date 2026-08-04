"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type BlogCodeCopyProps = {
  children: ReactNode;
  copyLabel: string;
  copiedLabel: string;
};

/**
 * Enhances `<pre>` blocks inside article HTML with a copy control + language label.
 */
export function BlogCodeCopy({
  children,
  copyLabel,
  copiedLabel,
}: BlogCodeCopyProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pres = root.querySelectorAll("pre");
    const cleanups: Array<() => void> = [];

    pres.forEach((pre) => {
      if (pre.parentElement?.classList.contains("blog-code-block")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "blog-code-block group relative my-8";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const lang =
        pre.getAttribute("data-language") ||
        pre.querySelector("code")?.className.match(/language-([^\s]+)/)?.[1] ||
        "";

      const toolbar = document.createElement("div");
      toolbar.className =
        "pointer-events-none absolute top-2 right-2 flex items-center gap-2";

      if (lang) {
        const badge = document.createElement("span");
        badge.className =
          "rounded bg-background/80 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground backdrop-blur";
        badge.textContent = lang;
        toolbar.appendChild(badge);
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "pointer-events-auto rounded-md border border-border bg-background/90 px-2 py-1 text-[0.7rem] font-medium text-muted-foreground opacity-100 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100";
      button.textContent = copyLabel;
      button.setAttribute("aria-label", copyLabel);

      const onClick = async () => {
        const text = pre.textContent ?? "";
        try {
          await navigator.clipboard.writeText(text);
          button.textContent = copiedLabel;
          window.setTimeout(() => {
            button.textContent = copyLabel;
          }, 1600);
        } catch {
          button.textContent = copyLabel;
        }
      };

      button.addEventListener("click", onClick);
      toolbar.appendChild(button);
      wrapper.appendChild(toolbar);

      cleanups.push(() => {
        button.removeEventListener("click", onClick);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [children, copyLabel, copiedLabel]);

  return <div ref={rootRef}>{children}</div>;
}
