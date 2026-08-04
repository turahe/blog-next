import { PostSkeleton } from "@/components/PostSkeleton";
import { Container } from "@/components/layout/Container";

export default function PostsLoading() {
  return (
    <Container size="prose" className="py-16 sm:py-20 lg:py-24">
      <div className="mb-14 space-y-4 border-b border-border pb-12">
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="h-5 w-full max-w-lg animate-pulse rounded bg-muted" />
      </div>
      <div aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading posts…</span>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </Container>
  );
}
