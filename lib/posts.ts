import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { resolveImage, type ResolvedImage } from "@/lib/images";
import { excerptFromBody } from "@/lib/utils";
import { PILLARS, type PillarSlug } from "@/lib/pillars";
import { youtubeIdFromUrl } from "@/lib/youtube";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontMatter = {
  title: string;
  pillar: PillarSlug;
  lga?: string;
  date: string;
  image: string;
  source_name: string;
  source_url: string;
  featured?: boolean;
  permanent?: boolean;
};

type ParsedPost = PostFrontMatter & {
  slug: string;
  content: string;
  excerpt: string;
  youtubeId: string | null;
};

export type Post = ParsedPost & {
  resolvedImage: ResolvedImage;
};

function isPillarSlug(value: unknown): value is PillarSlug {
  return PILLARS.some((pillar) => pillar.slug === value);
}

function parsePost(filename: string): ParsedPost {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx$/, "");

  const required = [
    "title",
    "pillar",
    "date",
    "image",
    "source_name",
    "source_url",
  ] as const;

  for (const field of required) {
    if (!data[field]) {
      throw new Error(`Post "${slug}" is missing front matter field: ${field}`);
    }
  }

  if (!isPillarSlug(data.pillar)) {
    throw new Error(`Post "${slug}" has unknown pillar: ${data.pillar}`);
  }

  const date =
    data.date instanceof Date
      ? [
          data.date.getFullYear(),
          String(data.date.getMonth() + 1).padStart(2, "0"),
          String(data.date.getDate()).padStart(2, "0"),
        ].join("-")
      : String(data.date);

  return {
    slug,
    title: data.title,
    pillar: data.pillar,
    lga: typeof data.lga === "string" && data.lga ? data.lga : undefined,
    date,
    image: data.image,
    source_name: data.source_name,
    source_url: data.source_url,
    featured: Boolean(data.featured),
    permanent: Boolean(data.permanent),
    youtubeId: youtubeIdFromUrl(String(data.source_url)),
    content,
    excerpt: excerptFromBody(content),
  };
}

function listPosts(): ParsedPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parsePost)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

async function withResolvedImages(posts: ParsedPost[]): Promise<Post[]> {
  const keys = [...new Set(posts.map((post) => post.image))];
  await Promise.all(keys.map((key) => resolveImage(key)));

  return Promise.all(
    posts.map(async (post) => ({
      ...post,
      resolvedImage: await resolveImage(post.image),
    })),
  );
}

export async function getAllPosts(): Promise<Post[]> {
  return withResolvedImages(listPosts());
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPostsByPillar(pillar: string) {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.pillar === pillar)
    .sort((a, b) => Number(b.permanent) - Number(a.permanent));
}

export async function getFeaturedPost() {
  const posts = await getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

export async function getLatestPosts(limit = 3, excludeSlug?: string) {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.slug !== excludeSlug && !post.permanent)
    .slice(0, limit);
}

export function getPostParams() {
  return listPosts().map((post) => ({ slug: post.slug }));
}

export function getPillarParams() {
  return PILLARS.map((pillar) => ({ pillar: pillar.slug }));
}
