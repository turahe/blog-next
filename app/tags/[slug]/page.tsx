import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaginationControls } from "@/components/PaginationControls";
import { PostList } from "@/components/PostList";
import { TagChip } from "@/components/TagChip";
import { postQueryService } from "@/services/post.query";
import { tagQueryService } from "@/services/tag.query";

interface TagPostsPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cursor?: string }>;
}

export const revalidate = 120;

export async function generateMetadata({
  params,
}: TagPostsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formatted = slug.replace(/-/g, " ");
  return {
    title: `Tag: ${formatted}`,
    description: `Posts tagged with ${formatted}`,
  };
}

export default async function TagPostsPage({ params, searchParams }: TagPostsPageProps) {
  const { slug } = await params;
  const { cursor } = await searchParams;

  const tag = await tagQueryService.getTagBySlug(slug).catch(() => null);
  if (!tag) notFound();

  const result = await postQueryService.getPostsByTagSafe({
    tagId: tag.id,
    cursor,
    limit: 10,
  });

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
      <div className="mb-6">
        <Link
          href="/tags"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        >
          Back to tags
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Tagged: #{tag.name}
        </h1>
        <div className="mt-3">
          <TagChip tag={tag} href={`/tags/${tag.slug}`} />
        </div>
      </header>

      <PostList posts={result.data} />
      <PaginationControls nextCursor={result.nextCursor} pathname={`/tags/${tag.slug}`} />
    </main>
  );
}
