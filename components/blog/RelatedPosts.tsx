import type { Post } from "@/types/post";
import { RelatedPostCard } from "@/components/blog/RelatedPostCard";

type RelatedPostsProps = {
  posts: Post[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="not-prose mt-20 border-t border-slate-200 pt-16 dark:border-slate-800" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Related posts
      </h2>
      <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <RelatedPostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
