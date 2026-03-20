/**
 * Homepage imagery. About portrait: override with NEXT_PUBLIC_PROFILE_IMAGE.
 */

const unsplash = (photoId: string, w: number, h?: number) => {
  const hPart = h ? `&h=${h}` : "";
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}${hPart}&q=82`;
};

export const homeVisuals = {
  about: {
    src:
      process.env.NEXT_PUBLIC_PROFILE_IMAGE ??
      unsplash("photo-1507003211169-0a1dd7228f2d", 480, 480),
  },
} as const;
