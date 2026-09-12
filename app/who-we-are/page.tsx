import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "Akisok is a curated reading room for Akwa Ibom: one original take, then a single source — for readers who left and readers who stayed.",
};

export default function WhoWeArePage() {
  return (
    <StaticPage
      kicker="About"
      title="Who we are"
      lede="A reading room for Akwa Ibom — written for people who left, and people who stayed."
      next={{
        href: "/editorial-standards",
        label: "Editorial standards & sourcing",
      }}
    >
      <p>
        Akisok exists because a state this dense with story should not be this
        hard to follow from abroad. Kingdoms, markets, language, roads, a
        week’s news — the record is scattered across papers, Facebook posts,
        government PDFs, and memory. We sit in the middle and do one job:
        write the take, then publish the link.
      </p>
      <p>
        We are a small editorial project, written in the voice of Uyo and read
        wherever “home” still means a specific place. Not a newsroom competing
        for the day. Not a timeline. Not a scrapbook of other people’s
        headlines. If we cannot add something of our own — a frame, a
        context, a sentence you could not get by opening the source alone —
        we wait.
      </p>
      <p>
        Every entry is original, 150 to 800 words, filed under one of seven
        pillars: History & Heritage, People & Profiles, Culture & Language,
        Places, News Digest, Opinion, and Technology. The words are ours. The
        source is named, and it is always a click away.
      </p>
      <p>
        We publish for the diaspora reader who still wants the argument, not
        the summary of a summary; and for the reader who never left, who is
        tired of seeing the state flattened into a headline. Same room. Same
        rule.
      </p>
    </StaticPage>
  );
}
