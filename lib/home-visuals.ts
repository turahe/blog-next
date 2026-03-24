/**
 * Homepage imagery. About portrait: override with NEXT_PUBLIC_PROFILE_IMAGE.
 * Default is a local asset under /public/images.
 */

export const homeVisuals = {
  about: {
    src: process.env.NEXT_PUBLIC_PROFILE_IMAGE ?? "/images/about-portrait.svg",
  },
} as const;
