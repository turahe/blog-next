/**
 * Explicit Next.js fetch cache policy per API resource.
 *
 * Durations are intentional and documented in `docs/architecture.md` §14.
 * Do not disable caching globally from call sites.
 */
export const apiCache = {
  blogList: {
    revalidate: 60,
    tags: ["blog-posts"] as const,
  },
  blogDetail: {
    revalidate: 60,
    tags: (idOrSlug: string | number) =>
      [`blog-post-${idOrSlug}`] as const,
  },
  tags: {
    revalidate: 300,
    tags: ["tags"] as const,
  },
  tagDetail: {
    revalidate: 300,
    tags: (slug: string) => [`tag-${slug}`] as const,
  },
  projects: {
    revalidate: 120,
    tags: ["projects"] as const,
  },
  projectDetail: {
    revalidate: 120,
    tags: (slug: string) => [`project-${slug}`] as const,
  },
  profile: {
    revalidate: 300,
    tags: ["profile"] as const,
  },
  experience: {
    revalidate: 300,
    tags: ["experience"] as const,
  },
  skills: {
    revalidate: 300,
    tags: ["skills"] as const,
  },
  /** Auth / mutations — never cache. */
  dynamic: {
    revalidate: false as const,
  },
} as const;

export type ApiCachePolicy = {
  revalidate: number | false;
  tags?: readonly string[];
};
