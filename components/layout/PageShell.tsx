import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  /**
   * Auth and other chrome-less routes.
   * Renders children only (no skip link / main / header / footer).
   */
  bare?: boolean;
};

/**
 * Global page structure: skip link, optional chrome, single `<main>` landmark.
 * Layout chrome must not contain business/data-fetching logic.
 */
export function PageShell({
  children,
  header,
  footer,
  bare = false,
}: PageShellProps) {
  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="bg-accent text-background focus:ring-accent sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:outline-none"
      >
        Skip to content
      </a>
      {header}
      <main
        id="main-content"
        className="flex w-full min-h-0 min-w-0 max-w-full flex-1 flex-col overflow-x-clip"
      >
        {children}
      </main>
      {footer}
    </>
  );
}
