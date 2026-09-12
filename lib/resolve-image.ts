export const CLOUDINARY_FOLDER = "akisok";

export type ResolvedImage = {
  src: string;
  isPlaceholder: boolean;
};

export function placeholderImage(key: string): ResolvedImage {
  return {
    src: `/images/placeholders/${key}.jpg`,
    isPlaceholder: true,
  };
}

/**
 * Build-scoped resolver. Cache is per process (one Next.js build / dev server).
 * In-flight lookups for the same key share one promise so a pillar key used
 * by many posts hits Cloudinary once.
 */
export function createImageResolver(
  lookup: (publicId: string) => Promise<{ secure_url: string }>,
) {
  const cache = new Map<string, Promise<ResolvedImage>>();

  return function resolveImage(key: string): Promise<ResolvedImage> {
    const cached = cache.get(key);
    if (cached) return cached;

    const pending = lookup(`${CLOUDINARY_FOLDER}/${key}`)
      .then((resource) => ({
        src: resource.secure_url,
        isPlaceholder: false,
      }))
      .catch(() => placeholderImage(key));

    cache.set(key, pending);
    return pending;
  };
}
