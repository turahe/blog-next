import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { PaginationControls } from "@/components/PaginationControls";
import { PostList } from "@/components/PostList";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { blogApi } from "@/lib/api/blog";
import { filterPostsByQuery } from "@/lib/filter-posts";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";
import { siteMetadata } from "@/lib/site-metadata";

interface PostsIndexPageProps {
  searchParams: Promise<{
    cursor?: string;
    dir?: "next" | "prev";
    limit?: string;
    q?: string;
  }>;
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles by ${siteMetadata.author} on software engineering, architecture, and building products.`,
  openGraph: {
    title: `Blog | ${siteMetadata.title}`,
    description: `Articles by ${siteMetadata.author} on software engineering, architecture, and building products.`,
    type: "website",
  },
  alternates: {
    canonical: "/posts",
  },
};

export default async function PostsIndexPage({
  searchParams,
}: PostsIndexPageProps) {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);

  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.q ?? "").trim();
  const searching = query.length > 0;

  const limit = Number(resolvedSearchParams.limit ?? "10");
  const normalizedLimit = Number.isNaN(limit)
    ? 10
    : Math.min(Math.max(limit, 1), 50);

  const result = await blogApi.getPostsSafe({
    cursor: searching ? undefined : resolvedSearchParams.cursor,
    dir: searching ? undefined : resolvedSearchParams.dir,
    limit: searching ? Math.max(normalizedLimit, 50) : normalizedLimit,
  });

  const posts = searching
    ? filterPostsByQuery(result.data, query)
    : result.data;

  return (
    <Container size="prose" className="py-16 sm:py-20 lg:py-24">
      <header className="mb-10 border-b border-border pb-10 sm:mb-14 sm:pb-12">
        <p className="section-label">{t("posts.kicker")}</p>
        <Heading level={1} className="mt-3">
          {t("writing.allPosts")}
        </Heading>
        <Text variant="lead" className="mt-4 max-w-lg">
          {t("posts.lead")}
        </Text>

        <form
          action="/posts"
          method="get"
          role="search"
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <label htmlFor="posts-search" className="sr-only">
            {t("posts.searchLabel")}
          </label>
          <input
            id="posts-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder={t("posts.searchPlaceholder")}
            className="h-10 w-full min-w-0 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("posts.searchSubmit")}
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-small">
          <Link
            href="/"
            className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("posts.backHome")}
          </Link>
          <Link
            href="/tags"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("posts.browseTags")}
          </Link>
        </div>
      </header>

      {searching ? (
        <Text variant="small" className="mb-6">
          {t("posts.searchResults", {
            query,
            count: posts.length,
          })}
        </Text>
      ) : null}

      <PostList
        posts={posts}
        emptyLabel={
          searching ? t("posts.searchEmpty") : t("writing.noPosts")
        }
        authorLabel={siteMetadata.author}
      />

      {!searching ? (
        <PaginationControls
          nextCursor={result.nextCursor}
          prevCursor={result.prevCursor}
          limit={normalizedLimit}
          pathname="/posts"
          previousLabel={t("posts.prev")}
          nextLabel={t("posts.next")}
          statusLabel={t("posts.more")}
        />
      ) : null}
    </Container>
  );
}
