import "server-only";
import { v2 as cloudinary } from "cloudinary";
import { imageCaption } from "@/lib/image-captions";
import {
  CLOUDINARY_FOLDER,
  createImageResolver,
  type ResolvedImage,
} from "@/lib/resolve-image";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function hasCloudinaryCredentials() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

const LISTING_TIMEOUT_MS = 20_000;

type ListedResource = { public_id: string; secure_url: string };
type ListingPage = { resources: ListedResource[]; next_cursor?: string };

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Cloudinary listing timed out after ${ms}ms`)),
      ms,
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/**
 * One paged Admin API listing of `akisok/` per process instead of one
 * `api.resource` call per key. Each `next build` worker runs this once, which
 * keeps a full build at a handful of calls (Admin API limit is 500/hour).
 */
async function listFolder(): Promise<Map<string, string>> {
  const urls = new Map<string, string>();
  let cursor: string | undefined;
  do {
    const page = (await withTimeout(
      cloudinary.api.resources({
        type: "upload",
        prefix: `${CLOUDINARY_FOLDER}/`,
        max_results: 500,
        ...(cursor ? { next_cursor: cursor } : {}),
      }),
      LISTING_TIMEOUT_MS,
    )) as ListingPage;
    for (const resource of page.resources) {
      urls.set(resource.public_id, resource.secure_url);
    }
    cursor = page.next_cursor;
  } while (cursor);
  return urls;
}

let folderListing: Promise<Map<string, string>> | null = null;

function getFolderListing() {
  if (!folderListing) {
    folderListing = listFolder().catch((error) => {
      console.warn(
        `[images] Cloudinary listing failed; using placeholders: ${
          error?.message ?? error?.error?.message ?? error
        }`,
      );
      return new Map<string, string>();
    });
  }
  return folderListing;
}

const resolveFromCloudinary = createImageResolver(async (publicId) => {
  if (!hasCloudinaryCredentials()) {
    throw new Error("Cloudinary credentials are not set");
  }
  const secureUrl = (await getFolderListing()).get(publicId);
  if (!secureUrl) throw new Error(`Not in Cloudinary: ${publicId}`);
  return { secure_url: secureUrl };
});

/**
 * Cloudinary Admin API first (`akisok/{key}`), then local
 * `public/images/placeholders/{key}.jpg`. Never throws.
 */
export async function resolveImage(key: string): Promise<ResolvedImage> {
  return resolveFromCloudinary(key);
}

export { CLOUDINARY_FOLDER, imageCaption };
export type { ResolvedImage };
