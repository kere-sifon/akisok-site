# Akisok (`akisok-site`)

Public Next.js site for **Akisok** — a curated Akwa Ibom State reading room for a diaspora audience. Every post is an original 150–800 word take, then one linked external source. Nothing here is a re-post.

This repository is the **publish target** for the separate `akisok-curation-agent` repo. The agent will eventually write MDX into `content/posts/` via git commit. Do not treat the seed files as finished editorial.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS with named design tokens in `tailwind.config.ts` and `app/globals.css`
- MDX + YAML front matter in `content/posts/`
- `next/font/google`: **Fraunces** (display), **IBM Plex Mono** (labels), **Source Serif 4** (body)

## Content model

One file per post: `content/posts/{slug}.mdx`.

Required front matter:

| Field | Meaning |
| --- | --- |
| `title` | Headline |
| `pillar` | One of `history`, `people`, `culture`, `places`, `news`, `opinion`, `technology` |
| `date` | ISO date (`YYYY-MM-DD`) |
| `image` | Image **key**, not a path (see below) |
| `source_name` | Publication or document name |
| `source_url` | Outbound link to that source |

Optional: `lga`, `featured`.

The MDX body is the original take. Do not paste the source article.

Seven pillars: History & Heritage, People & Profiles, Culture & Language, Places, News Digest, Opinion, Technology.

## Image keys and fallbacks

Front matter still stores a key such as `image: hero-uyo-market` — not a path and not a Cloudinary URL. Resolution happens **once per unique key at build time** (`lib/images.ts` / `lib/posts.ts`):

1. Cloudinary Admin API: public ID `akisok/{key}` — documentary / commissioned photos
2. `public/images/placeholders/{key}.jpg` — stylized sage-diagonal textures only
3. CSS diagonal pattern in `ImagePlaceholder` if the local placeholder file is also missing

Upload a real photo to Cloudinary as `akisok/{key}` (same key as front matter; one folder level, created automatically on upload). The next build swaps it in with **no MDX changes**. Missing credentials, a missing asset, or a network error all fall back to the local placeholder and do not fail the build.

### Cloudinary env (server-only)

Copy `.env.local.example` to `.env.local`. Never use a `NEXT_PUBLIC_` prefix — the Admin API key/secret stay on the server:

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Folder convention: **`akisok/{key}`** (one level deep).

Placeholder images are abstract textures, never AI “photographs” of real people or specific places. The caption chip (`photo — [what belongs here]`) stays on placeholders only.

## Scripts

```bash
npm install
npm run dev
```

Regenerate abstract placeholder textures:

```bash
node scripts/generate-placeholders.mjs
```

## Status

Homepage, `/all`, `/[pillar]`, and `/post/[slug]` are in place. The curation agent writes MDX keys; this repo resolves photos via Cloudinary, then local placeholders.
