import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostListItem } from "@/components/PostListItem";
import { getPillar } from "@/lib/pillars";
import { getPillarParams, getPostsByPillar } from "@/lib/posts";

type PillarPageProps = {
  params: Promise<{ pillar: string }>;
};

export function generateStaticParams() {
  return getPillarParams();
}

export async function generateMetadata({
  params,
}: PillarPageProps): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return { title: "Not found" };
  return {
    title: pillar.fullName,
    description: pillar.blurb,
  };
}

export default async function PillarPage({ params }: PillarPageProps) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const posts = await getPostsByPillar(slug);
  const foundation = posts.filter((post) => post.permanent);
  const rest = posts.filter((post) => !post.permanent);

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-10 lg:px-14 lg:py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-ink/50 uppercase">
        {pillar.index} · {pillar.shortName}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.15] font-medium tracking-[-0.02em] text-ink md:text-5xl">
        {pillar.fullName}
      </h1>
      <p className="mt-4 max-w-xl font-body text-[1.05rem] leading-relaxed text-ink/70">
        {pillar.blurb}
      </p>

      {posts.length > 0 ? (
        <div className="mt-12 max-w-[40rem]">
          {foundation.length > 0 ? (
            <>
              <p className="font-mono text-[11px] tracking-[0.2em] text-ink/50 uppercase">
                Foundation
              </p>
              <ol className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {foundation.map((post, index) => (
                  <PostListItem key={post.slug} post={post} index={index} />
                ))}
              </ol>
            </>
          ) : null}
          {rest.length > 0 ? (
            <>
              {foundation.length > 0 ? (
                <p className="mt-12 font-mono text-[11px] tracking-[0.2em] text-ink/50 uppercase">
                  Later entries
                </p>
              ) : null}
              <ol
                className={`${foundation.length > 0 ? "mt-4" : ""} divide-y divide-ink/10 border-y border-ink/10`}
              >
                {rest.map((post, index) => (
                  <PostListItem key={post.slug} post={post} index={index} />
                ))}
              </ol>
            </>
          ) : null}
        </div>
      ) : (
        <p className="mt-12 max-w-xl font-body text-[1.05rem] leading-relaxed text-ink/60">
          No entries in this pillar yet.{" "}
          <Link href="/all" className="text-accent hover:underline">
            See all entries
          </Link>
          .
        </p>
      )}
    </main>
  );
}
