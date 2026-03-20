import type { Metadata } from "next";
import { TagChip } from "@/components/TagChip";
import { tagQueryService } from "@/services/tag.query";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all blog tags",
};

export const revalidate = 300;

export default async function TagsPage() {
  const tags = await tagQueryService.getTags(500);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Tag Archive
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Browse content by topics and categories.
      </p>

      <section className="mt-8 flex flex-wrap gap-2.5">
        {tags.length ? (
          tags.map((tag) => <TagChip key={tag.id} tag={tag} />)
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">No tags found.</p>
        )}
      </section>
    </main>
  );
}
