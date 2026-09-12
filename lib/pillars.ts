export const PILLARS = [
  {
    slug: "history",
    shortName: "Heritage",
    fullName: "History & Heritage",
    index: "01",
    blurb:
      "Kingdoms, missions, memory, and the documents people still argue over.",
  },
  {
    slug: "people",
    shortName: "People",
    fullName: "People & Profiles",
    index: "02",
    blurb:
      "Ibibio, Anaang, Oron, and the diaspora names that keep showing up in the work.",
  },
  {
    slug: "culture",
    shortName: "Culture",
    fullName: "Culture & Language",
    index: "03",
    blurb:
      "Language at the dinner table, masquerade in season, and what gets edited for visitors.",
  },
  {
    slug: "places",
    shortName: "Places",
    fullName: "Places",
    index: "04",
    blurb:
      "LGAs, markets, roads, waterfronts — the map as it is actually used.",
  },
  {
    slug: "news",
    shortName: "News",
    fullName: "News Digest",
    index: "05",
    blurb:
      "What moved this week, in our words, with one link you can open and check.",
  },
  {
    slug: "opinion",
    shortName: "Opinion",
    fullName: "Opinion",
    index: "06",
    blurb:
      "An argument with a source — not a quote-tweet dressed up as an essay.",
  },
  {
    slug: "technology",
    shortName: "Technology",
    fullName: "Technology",
    index: "07",
    blurb:
      "Infrastructure, oil-to-data transitions, and the tools people actually adopt.",
  },
] as const;

export type PillarSlug = (typeof PILLARS)[number]["slug"];

export function getPillar(slug: string) {
  return PILLARS.find((pillar) => pillar.slug === slug);
}
