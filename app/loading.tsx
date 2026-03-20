import { PostSkeleton } from "@/components/PostSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
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
    </main>
  );
}
