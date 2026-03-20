import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I have built and shipped.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
        Projects
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        A curated list of side projects and experiments will live here. For now,
        explore the{" "}
        <Link href="/" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
          latest posts
        </Link>{" "}
        or{" "}
        <Link
          href="https://github.com/turahe"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </Link>
        .
      </p>
    </main>
  );
}
