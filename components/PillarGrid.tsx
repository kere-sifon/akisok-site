import Link from "next/link";
import { PILLARS } from "@/lib/pillars";

export function PillarGrid() {
  return (
    <section id="pillars" className="bg-forest-deep text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28">
        <h2 className="max-w-[18ch] font-display text-4xl leading-[1.15] font-medium tracking-[-0.02em] text-pretty md:text-5xl lg:text-[3.35rem]">
          Seven pillars. One format: our take, then the link.
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.slug}
              className="flex min-h-[16.5rem] flex-col border border-cream/15 px-6 py-6"
            >
              <p className="font-mono text-[11px] tracking-[0.18em] text-cream/55 uppercase">
                {pillar.index} · {pillar.shortName}
              </p>
              <h3 className="mt-5 font-display text-2xl tracking-tight">
                {pillar.fullName}
              </h3>
              <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-cream/72">
                {pillar.blurb}
              </p>
              <Link
                href={`/${pillar.slug}`}
                className="mt-8 font-mono text-[10px] tracking-[0.16em] text-cream/70 uppercase transition-colors hover:text-cream"
              >
                Take + source →
              </Link>
            </article>
          ))}

          <article className="flex min-h-[16.5rem] flex-col bg-accent px-6 py-6 text-cream">
            <p className="font-mono text-[11px] tracking-[0.18em] text-cream/70 uppercase">
              Editorial
            </p>
            <h3 className="mt-5 font-display text-2xl leading-snug tracking-tight">
              Nothing here is a re-post.
            </h3>
            <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-cream/85">
              We write the take. We publish the link. If we cannot add
              something of our own, we wait.
            </p>
            <p className="mt-8 font-mono text-[10px] tracking-[0.16em] text-cream/80 uppercase">
              Take + source →
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
