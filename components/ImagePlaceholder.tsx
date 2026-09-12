import fs from "fs";
import path from "path";
import Image from "next/image";
import { imageCaption } from "@/lib/image-captions";
import type { ResolvedImage } from "@/lib/resolve-image";
import { cx } from "@/lib/utils";

type ImagePlaceholderProps = {
  imageKey: string;
  resolved: ResolvedImage;
  caption?: string;
  className?: string;
  priority?: boolean;
  size?: "default" | "thumbnail";
};

function localPlaceholderExists(key: string) {
  return fs.existsSync(
    path.join(process.cwd(), "public", "images", "placeholders", `${key}.jpg`),
  );
}

export function ImagePlaceholder({
  imageKey,
  resolved,
  caption,
  className,
  priority = false,
  size = "default",
}: ImagePlaceholderProps) {
  const isThumbnail = size === "thumbnail";
  const label = caption ?? imageCaption(imageKey);
  const chip = `photo — ${label}`;
  const imageSizes = isThumbnail
    ? "96px"
    : "(min-width: 1024px) 50vw, 100vw";

  if (!resolved.isPlaceholder) {
    return (
      <div className={cx("relative overflow-hidden bg-ink", className)}>
        <Image
          src={resolved.src}
          alt={isThumbnail ? "" : label}
          fill
          priority={priority}
          className="object-cover"
          sizes={imageSizes}
        />
      </div>
    );
  }

  return (
    <div className={cx("relative overflow-hidden bg-ink", className)}>
      <div className="bg-sage-diagonal absolute inset-0" />
      {localPlaceholderExists(imageKey) ? (
        <Image
          src={resolved.src}
          alt=""
          fill
          priority={priority}
          className="object-cover"
          sizes={imageSizes}
        />
      ) : null}
      {isThumbnail ? null : (
        <span className="absolute bottom-3 left-3 max-w-[min(92%,22rem)] bg-ink/55 px-2.5 py-1.5 font-mono text-[10px] leading-snug tracking-[0.04em] text-cream/95 backdrop-blur-[2px]">
          {chip}
        </span>
      )}
    </div>
  );
}
