import { DashedDivider } from "@/components/DashedDivider";
import { FeaturedAndLatest } from "@/components/FeaturedAndLatest";
import { HERO_IMAGE_KEY, Hero } from "@/components/Hero";
import { PillarGrid } from "@/components/PillarGrid";
import { resolveImage } from "@/lib/images";

export default async function Home() {
  const heroImage = await resolveImage(HERO_IMAGE_KEY);

  return (
    <main>
      <Hero image={heroImage} />
      <div className="bg-cream px-5 py-4 md:px-10 lg:px-14">
        <DashedDivider />
      </div>
      <FeaturedAndLatest />
      <PillarGrid />
    </main>
  );
}
