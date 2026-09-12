import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = {
  title: "Editorial standards & sourcing",
  description:
    "How Akisok writes: an original 150–800 word take, one linked source, and no re-posts.",
};

export default function EditorialStandardsPage() {
  return (
    <StaticPage
      kicker="About"
      title="Editorial standards & sourcing"
      lede="Our take, then one link you can open. Nothing here is a re-post."
      next={{ href: "/who-we-are", label: "Who we are" }}
    >
      <h2>The format is the standard</h2>
      <p>
        We write an original piece, 150 to 800 words. We attach one primary
        source — a named publication, document, or record — and we link it. We
        do not paste the source. We do not run a gallery of other people’s
        articles with a sentence on top. If the only honest version of a story
        is the source itself, we do not publish a take.
      </p>

      <h2>What a source is</h2>
      <p>
        A source is something a reader can open and check: a newspaper report,
        a paper, a government notice, a book, a speech transcript, a dataset.
        We name it. We link it. We do not hide behind “sources say” when a
        document exists.
      </p>
      <p>
        One source is a discipline, not a claim that nothing else exists. It
        is the piece of the record we are answering. If we cannot point to
        that piece, we do not run the entry.
      </p>

      <h2>What a take is</h2>
      <p>
        A take is our words: context, argument, or a way of seeing that the
        source does not already give you. News Digest still follows the rule —
        we are not a wire. Opinion is labelled as opinion by the pillar, not
        dressed up as a report. History, people, culture, places, and
        technology are held to the same length and the same outbound link.
      </p>

      <h2>What we will not do</h2>
      <p>
        We do not re-post. We do not invent quotes, documents, or scenes. We
        do not treat a screenshot or a forwarded message as a source. We do
        not write for hire around a press release. We do not publish work
        whose only job is to send traffic back to someone else’s page.
      </p>

      <h2>Images</h2>
      <p>
        When a photograph exists for an entry, we use it. When it does not, we
        show a placeholder — an abstract texture, never a generated picture of
        a real person or a specific place. The caption on a placeholder is a
        note about what belongs there, not a claim that the picture is the
        thing.
      </p>
    </StaticPage>
  );
}
