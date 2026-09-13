import Image from "next/image";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { imageCaption } from "@/lib/image-captions";
import type { ResolvedImage } from "@/lib/resolve-image";

type HeroMediaProps = {
  imageKey: string;
  image: ResolvedImage;
  videoId: string;
  videoTitle: string;
};

export function HeroMedia({
  imageKey,
  image,
  videoId,
  videoTitle,
}: HeroMediaProps) {
  const label = imageCaption(imageKey);

  return (
    <div className="relative w-full overflow-hidden bg-ink lg:h-full">
      {image.isPlaceholder ? (
        <div className="bg-sage-diagonal absolute inset-0" />
      ) : null}
      <Image
        src={image.src}
        alt={label}
        fill
        priority
        className="object-cover"
        sizes="(min-width: 1024px) 26rem, 100vw"
      />
      <div className="absolute inset-0 bg-ink/25" />
      <div className="relative z-10 flex h-full items-start justify-center px-4 pt-10 md:px-5 md:pt-12 lg:pt-14">
        <YouTubeEmbed
          videoId={videoId}
          title={videoTitle}
          className="aspect-video w-full max-w-[26rem]"
          priority
        />
      </div>
    </div>
  );
}
