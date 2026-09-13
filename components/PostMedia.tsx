import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import type { Post } from "@/lib/posts";

type PostMediaProps = {
  post: Post;
  className?: string;
  priority?: boolean;
  size?: "default" | "thumbnail";
};

export function PostMedia({
  post,
  className,
  priority = false,
  size = "default",
}: PostMediaProps) {
  if (post.youtubeId) {
    return (
      <YouTubeEmbed
        videoId={post.youtubeId}
        title={post.title}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <ImagePlaceholder
      imageKey={post.image}
      resolved={post.resolvedImage}
      className={className}
      priority={priority}
      size={size}
    />
  );
}
