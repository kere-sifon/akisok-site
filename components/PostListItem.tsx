import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SourceTag } from "@/components/SourceTag";
import type { Post } from "@/lib/posts";

type PostListItemProps = {
  post: Post;
  index: number;
};

export function PostListItem({ post, index }: PostListItemProps) {
  return (
    <li className="py-6 first:pt-5 last:pb-5">
      <article className="grid grid-cols-[auto_auto_1fr] items-start gap-3 md:gap-4">
        <span className="pt-0.5 font-mono text-sm tracking-wider text-ink/35">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Link
          href={`/post/${post.slug}`}
          tabIndex={-1}
          aria-hidden
          className="block shrink-0"
        >
          <ImagePlaceholder
            imageKey={post.image}
            resolved={post.resolvedImage}
            size="thumbnail"
            className="size-20"
          />
        </Link>
        <div className="min-w-0">
          {post.permanent ? (
            <p className="mb-1.5 font-mono text-[10px] tracking-[0.16em] text-ink/45 uppercase">
              Foundation
            </p>
          ) : null}
          <Link href={`/post/${post.slug}`}>
            <h3 className="font-display text-xl leading-snug font-medium tracking-tight text-ink hover:text-accent md:text-[1.35rem]">
              {post.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 font-body text-[15px] leading-relaxed text-ink/65">
            {post.excerpt}
          </p>
          <div className="mt-3">
            <SourceTag name={post.source_name} url={post.source_url} />
          </div>
        </div>
      </article>
    </li>
  );
}
