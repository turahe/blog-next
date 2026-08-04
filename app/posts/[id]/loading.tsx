import { Container } from "@/components/layout/Container";

export default function LoadingPostDetail() {
  return (
    <Container size="content" className="py-12 sm:py-14 lg:py-20">
      <div className="animate-pulse space-y-6" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading article…</span>
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-10 w-3/4 max-w-xl rounded bg-muted" />
        <div className="h-4 w-full max-w-lg rounded bg-muted" />
        <div className="h-4 w-40 rounded bg-muted" />
        <div className="space-y-3 pt-8">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
        </div>
      </div>
    </Container>
  );
}
