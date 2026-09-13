import { cx } from "@/lib/utils";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
  priority?: boolean;
};

export function YouTubeEmbed({
  videoId,
  title,
  className,
  priority = false,
}: YouTubeEmbedProps) {
  const params = new URLSearchParams({
    rel: "0",
    playsinline: "1",
  });

  return (
    <div className={cx("relative overflow-hidden bg-ink", className)}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading={priority ? "eager" : "lazy"}
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
