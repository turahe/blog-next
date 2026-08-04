import { AuthBackLink } from "@/components/AuthBackLink";
import { Container } from "@/components/layout/Container";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

/**
 * Auth content card. Prefer `app/auth/layout.tsx` for the page landmark;
 * this shell is for composed auth UIs that already sit inside `<main>`.
 */
export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <Container
      size="prose"
      className="flex max-w-md flex-1 items-center py-14"
    >
      <section className="w-full rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm shadow-slate-900/5 sm:p-9 dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-black/25">
        <AuthBackLink />
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </section>
    </Container>
  );
}
