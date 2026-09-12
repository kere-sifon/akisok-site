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

const resolveFromCloudinary = createImageResolver(async (publicId) => {
  if (!hasCloudinaryCredentials()) {
    throw new Error("Cloudinary credentials are not set");
  }
  return cloudinary.api.resource(publicId);
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
