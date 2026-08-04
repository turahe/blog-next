import type { Post } from "@/types/post";
import { RelatedPostCard } from "@/components/blog/RelatedPostCard";

type RelatedPostsProps = {
  posts: Post[];
  heading: string;
};

export function RelatedPosts({ posts, heading }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section
      className="not-prose mt-20 border-t border-border pt-16"
      aria-labelledby="related-heading"
    >
      <h2
        id="related-heading"
        className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase"
      >
        {heading}
      </h2>
      <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <RelatedPostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
