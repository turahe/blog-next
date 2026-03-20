import Link from "next/link";
import { PaginationControls } from "@/components/PaginationControls";
import { PostList } from "@/components/PostList";
import { postQueryService } from "@/services/post.query";

interface PostsIndexPageProps {
  searchParams: Promise<{
    cursor?: string;
    dir?: "next" | "prev";
    limit?: string;
  }>;
}

export const revalidate = 60;

export default async function PostsIndexPage({ searchParams }: PostsIndexPageProps) {
  const resolvedSearchParams = await searchParams;
  const limit = Number(resolvedSearchParams.limit ?? "10");
  const normalizedLimit = Number.isNaN(limit) ? 10 : Math.min(Math.max(limit, 1), 50);
  const result = await postQueryService.getPosts({
    cursor: resolvedSearchParams.cursor,
    dir: resolvedSearchParams.dir,
    limit: normalizedLimit,
  });

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          All posts
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Browse every article, newest first.
        </p>
        <div className="mt-5">
          <Link
            href="/"
            className="text-sm font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← Back home
          </Link>
        </div>
      </header>

      <PostList posts={result.data} />
      <PaginationControls
        nextCursor={result.nextCursor}
        prevCursor={result.prevCursor}
        limit={normalizedLimit}
        pathname="/posts"
      />
    </main>
  );
}
