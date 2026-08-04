import { Post } from "@/types/post";
import { PostCard } from "@/components/PostCard";
import { Text } from "@/components/ui/Text";

interface PostListProps {
  posts: Post[];
  emptyLabel?: string;
  authorLabel?: string;
}

export function PostList({
  posts,
  emptyLabel = "No posts yet. Check back soon.",
  authorLabel,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="border-y border-dashed border-border py-16 text-center">
        <Text variant="muted">{emptyLabel}</Text>
      </div>
    );
  }

  return (
    <section aria-label="Articles" className="space-y-0">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} authorLabel={authorLabel} />
      ))}
    </section>
  );
}
