import type { ReactNode } from "react";

interface AuthHeadingProps {
  title: string;
  subtitle: ReactNode;
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <header>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
    </header>
  );
}

