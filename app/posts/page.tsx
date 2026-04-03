import Link from "next/link";
import { cookies } from "next/headers";
import { PaginationControls } from "@/components/PaginationControls";
import { PostList } from "@/components/PostList";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
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
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);

  const resolvedSearchParams = await searchParams;
  const limit = Number(resolvedSearchParams.limit ?? "10");
  const normalizedLimit = Number.isNaN(limit) ? 10 : Math.min(Math.max(limit, 1), 50);
  const result = await postQueryService.getPostsSafe({
    cursor: resolvedSearchParams.cursor,
    dir: resolvedSearchParams.dir,
    limit: normalizedLimit,
  });

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <header className="mb-14 border-b border-slate-200/80 pb-12 dark:border-slate-800/80">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
          {t("posts.kicker")}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
          {t("writing.allPosts")}
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {t("posts.lead")}
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="text-sm font-semibold text-primary-600 underline-offset-4 transition hover:text-primary-700 hover:underline dark:text-primary-400 dark:hover:text-primary-300"
          >
            {t("posts.backHome")}
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
