import Link from "next/link";
import { PostListItem } from "@/components/PostListItem";
import { PostMedia } from "@/components/PostMedia";
import { SourceTag } from "@/components/SourceTag";
import { getPillar } from "@/lib/pillars";
import { getFeaturedPost, getLatestPosts, type Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

function kicker(post: Post) {
  const pillar = getPillar(post.pillar);
  const place = post.lga ? ` · ${post.lga}` : "";
  return `${pillar?.shortName ?? post.pillar}${place} · ${formatDate(post.date)}`;
}

export async function FeaturedAndLatest() {
  const featured = await getFeaturedPost();
  const latest = await getLatestPosts(3, featured?.slug);

  if (!featured) {
    return (
      <section id="latest" className="px-5 py-20 text-center text-ink/60">
        No posts yet.
      </section>
    );
  }

  return (
    <section
      id="latest"
      className="mx-auto grid max-w-[1440px] gap-14 px-5 py-16 md:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:px-14 lg:py-24"
    >
      <article>
        <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-ink/50 uppercase">
          Featured
        </p>
        {featured.youtubeId ? (
          <>
            <PostMedia post={featured} className="aspect-video w-full" />
            <Link href={`/post/${featured.slug}`} className="group block">
              <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">
                {kicker(featured)}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[1.18] font-medium tracking-[-0.02em] text-ink group-hover:text-accent md:text-[2.35rem]">
                {featured.title}
              </h2>
            </Link>
          </>
        ) : (
          <Link href={`/post/${featured.slug}`} className="group block">
            <PostMedia post={featured} className="aspect-[16/10] w-full" />
            <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">
              {kicker(featured)}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.18] font-medium tracking-[-0.02em] text-ink group-hover:text-accent md:text-[2.35rem]">
              {featured.title}
            </h2>
          </Link>
        )}
        <p className="mt-4 max-w-[40rem] font-body text-[1.05rem] leading-relaxed text-ink/75">
          {featured.excerpt}
        </p>
        <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-ink/45 uppercase">
          {formatDate(featured.date)}
        </p>
        <div className="mt-4">
          <SourceTag name={featured.source_name} url={featured.source_url} />
        </div>
      </article>

      <aside>
        <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-ink/50 uppercase">
          Latest
        </p>
        <ol className="divide-y divide-ink/10 border-y border-ink/10">
          {latest.map((post, index) => (
            <PostListItem key={post.slug} post={post} index={index} />
          ))}
        </ol>
        <Link
          href="/all"
          className="mt-6 inline-block font-mono text-[10px] tracking-[0.16em] text-ink/60 uppercase transition-colors hover:text-accent"
        >
          All entries, newest first →
        </Link>
      </aside>
    </section>
  );
}
