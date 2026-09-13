import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SourceTag } from "@/components/SourceTag";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { getPillar } from "@/lib/pillars";
import { getPostBySlug, getPostParams, type Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

function kicker(post: Post) {
  const pillar = getPillar(post.pillar);
  const place = post.lga ? ` · ${post.lga}` : "";
  const when = post.permanent ? "Foundation" : formatDate(post.date);
  return `${pillar?.shortName ?? post.pillar}${place} · ${when}`;
}

export function generateStaticParams() {
  return getPostParams();
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const pillar = getPillar(post.pillar);

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-10 lg:px-14 lg:py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-ink/50 uppercase">
        <Link href="/all" className="transition-colors hover:text-accent">
          All entries
        </Link>
        <span aria-hidden> / </span>
        {pillar?.shortName ?? post.pillar}
      </p>
      <h1 className="mt-4 max-w-[20ch] font-display text-4xl leading-[1.15] font-medium tracking-[-0.02em] text-ink md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-ink/50 uppercase">
        {kicker(post)}
      </p>

      {post.youtubeId ? (
        <YouTubeEmbed
          videoId={post.youtubeId}
          title={post.title}
          className="mt-10 aspect-video w-full max-w-[48rem]"
          priority
        />
      ) : (
        <ImagePlaceholder
          imageKey={post.image}
          resolved={post.resolvedImage}
          className="mt-10 aspect-[16/10] w-full max-w-[48rem]"
          priority
        />
      )}

      <div className="mt-6">
        <SourceTag name={post.source_name} url={post.source_url} />
      </div>

      <article className="post-body mt-10 max-w-[40rem] font-body text-[1.05rem] leading-[1.7] text-ink/85">
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}
