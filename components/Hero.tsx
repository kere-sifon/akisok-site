import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { ResolvedImage } from "@/lib/resolve-image";

export const HERO_IMAGE_KEY = "hero-ibom-coast";

export function Hero({ image }: { image: ResolvedImage }) {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto grid min-h-[calc(100vh-4.75rem)] max-w-[1440px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex min-w-0 flex-col justify-center px-5 py-16 md:px-10 md:py-24 lg:px-14 lg:py-28">
          <p className="font-mono text-[11px] tracking-[0.22em] text-cream/70 uppercase">
            Est. Uyo · Read from anywhere
          </p>
          <h1 className="mt-6 max-w-[16ch] font-display text-[2.45rem] leading-[1.14] font-medium tracking-[-0.015em] text-pretty sm:text-5xl lg:text-[3.65rem]">
            A state this dense with story should not be this hard to follow from abroad.
          </h1>
          <p className="mt-8 max-w-[38rem] font-body text-lg leading-[1.65] text-cream/82 md:text-[1.2rem]">
            Akisok is a curated reading room for Akwa Ibom: one original take,
            150 to 800 words, then a single source you can open. Not a
            timeline. Not a re-post. For people who still say “home” and mean
            a road, a market, or a language they do not want to lose.
          </p>
        </div>

        <ImagePlaceholder
          imageKey={HERO_IMAGE_KEY}
          resolved={image}
          className="min-h-[22rem] lg:min-h-full"
          priority
        />
      </div>
    </section>
  );
}
