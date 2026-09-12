import { PostListItem } from "@/components/PostListItem";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "All entries",
  description: "Every Akisok take, newest first — our words, then the source.",
};

export default async function AllEntriesPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 py-16 md:px-10 lg:px-14 lg:py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-ink/50 uppercase">
        Archive
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.15] font-medium tracking-[-0.02em] text-ink md:text-5xl">
        All entries
      </h1>
      <p className="mt-4 max-w-xl font-body text-[1.05rem] leading-relaxed text-ink/70">
        Newest first. Every take we have published, unfiltered.
      </p>

      {/* Pagination can be added later if the list grows large. */}
      <ol className="mt-12 max-w-[40rem] divide-y divide-ink/10 border-y border-ink/10">
        {posts.map((post, index) => (
          <PostListItem key={post.slug} post={post} index={index} />
        ))}
      </ol>
    </main>
  );
}
