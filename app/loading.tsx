import { Container } from "@/components/layout/Container";
import { PostSkeleton } from "@/components/PostSkeleton";

export default function Loading() {
  return (
    <Container size="content" className="max-w-5xl py-10">
      <div className="mb-8">
        <div className="h-9 w-56 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-5 w-72 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </Container>
  );
}
