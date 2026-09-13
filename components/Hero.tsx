import { HeroMedia } from "@/components/HeroMedia";
import type { ResolvedImage } from "@/lib/resolve-image";

export const HERO_IMAGE_KEY = "hero-ibom-coast";
export const HOME_VIDEO_ID = "Nr7xh0maAyQ";

export function Hero({ image }: { image: ResolvedImage }) {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)]">
        <div className="min-w-0 px-5 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
          <p className="font-mono text-[11px] tracking-[0.22em] text-cream/70 uppercase">
            Est. Uyo · Read from anywhere
          </p>
          <h1 className="mt-5 max-w-[16ch] font-display text-[2.2rem] leading-[1.14] font-medium tracking-[-0.015em] text-pretty sm:text-4xl lg:text-[2.75rem]">
            A state this dense with story should not be this hard to follow from abroad.
          </h1>
          <p className="mt-6 max-w-[36rem] font-body text-base leading-[1.65] text-cream/82 md:text-lg">
            Akisok is a curated reading room for Akwa Ibom: one original take,
            150 to 800 words, then a single source you can open. Not a
            timeline. Not a re-post. For people who still say “home” and mean
            a road, a market, or a language they do not want to lose.
          </p>
        </div>

        <HeroMedia
          imageKey={HERO_IMAGE_KEY}
          image={image}
          videoId={HOME_VIDEO_ID}
          videoTitle="AKWA IBOM AYAIYA (OFFICIAL) — Mish"
        />
      </div>
    </section>
  );
}
