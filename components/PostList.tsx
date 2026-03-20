import { Post } from "@/types/post";
import { PostCard } from "@/components/PostCard";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-8 py-16 text-center dark:border-slate-700 dark:bg-slate-800/40">
        <p className="text-slate-600 dark:text-slate-400">No posts yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <section className="space-y-0">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
