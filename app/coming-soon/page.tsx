import Link from "next/link";

interface ComingSoonPageProps {
  searchParams: Promise<{ section?: string }>;
}

export default async function ComingSoonPage({ searchParams }: ComingSoonPageProps) {
  const { section } = await searchParams;
  const title = section?.trim() || "This page";

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-20 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        This section is not wired up yet. Check back later or explore the blog.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      >
        ← Back home
      </Link>
    </main>
  );
}
