import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeletePostButton } from "@/components/DeletePostButton";
import { postQueryService } from "@/services/post.query";
import { tagQueryService } from "@/services/tag.query";
import { PostLayout } from "@/layouts/PostLayout";
import { PostBanner } from "@/layouts/PostBanner";
import { PostSimple } from "@/layouts/PostSimple";
import { TagChip } from "@/components/TagChip";
import { formatReadingTime } from "@/lib/reading-time";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

const defaultLayout = "PostLayout";
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
} as const;

type LayoutName = keyof typeof layouts;

function resolveLayoutName(layout?: string): LayoutName {
  const key = (layout ?? "").toLowerCase();
  if (key === "simple" || key === "postsimple") return "PostSimple";
  if (key === "banner" || key === "postbanner") return "PostBanner";
  if (key === "layout" || key === "postlayout") return "PostLayout";
  return defaultLayout;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { id: slug } = await params;
  try {
    const post = await postQueryService.getPostBySlug(slug);
    return {
      title: post.title,
      description: post.content.slice(0, 140),
    };
  } catch {
    return {
      title: "Post not found",
    };
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id: slug } = await params;
  const post = await postQueryService.getPostBySlug(slug).catch(() => null);
  if (!post) {
    notFound();
  }
  const createdAt = post.createdAt ? new Date(post.createdAt).toLocaleString() : "N/A";
  const postPath = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
  const selectedLayout = resolveLayoutName(post.layout);
  const SelectedLayout = layouts[selectedLayout];
  const bannerImageUrl =
    post.bannerImageUrl ??
    post.coverImageUrl ??
    post.imageUrl ??
    post.image ??
    undefined;
  const tags = post.tags?.length
    ? post.tags
    : post.tagIds?.length
      ? (await tagQueryService.getTags(500)).filter((tag) => post.tagIds?.includes(tag.id))
      : [];

  const editActions = (
    <>
      <Link
        href={`${postPath}/edit`}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Edit
      </Link>
      <DeletePostButton postId={post.id} />
    </>
  );

  if (SelectedLayout === layouts.PostSimple) {
    return (
      <PostSimple post={post} publishedAt={createdAt} editActions={editActions} backHref="/">
        <>
          {post.category?.name ? (
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200 dark:bg-slate-900/40">
                #{post.category.name}
              </span>
            </div>
          ) : null}
          {tags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagChip key={tag.id} tag={tag} href={`/tags/${tag.slug}`} />
              ))}
            </div>
          ) : null}
          <div className="mt-6 prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap text-slate-700 dark:text-slate-300">
            {post.content}
          </div>
        </>
      </PostSimple>
    );
  }

  if (SelectedLayout === layouts.PostBanner) {
    return (
      <PostBanner
        post={post}
        publishedAt={createdAt}
        bannerImageUrl={bannerImageUrl}
        editActions={editActions}
        backHref="/"
      >
        <>
          {post.category?.name ? (
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200 dark:bg-slate-900/40">
                #{post.category.name}
              </span>
            </div>
          ) : null}
          {tags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagChip key={tag.id} tag={tag} href={`/tags/${tag.slug}`} />
              ))}
            </div>
          ) : null}
          <div className="mt-6 prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap text-slate-700 dark:text-slate-300">
            {post.content}
          </div>
        </>
      </PostBanner>
    );
  }

  return (
    <PostLayout
      post={post}
      publishedAt={createdAt}
      tags={tags}
      editActions={editActions}
    >
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {formatReadingTime(post.content)}
      </p>
      <div className="mt-5 prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap text-slate-700 dark:text-slate-300">
        {post.content}
      </div>
    </PostLayout>
  );
}
