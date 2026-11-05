import { Suspense } from "react";

import { BecomeHostCta } from "@/components/home/become-host-cta";
import { FeaturedStudios } from "@/components/home/featured-studios";
import { FeaturedStudiosSkeleton } from "@/components/home/featured-studios-skeleton";
import { HeroSlider } from "@/components/home/hero-slider";
import { HostGuarantee } from "@/components/home/host-guarantee";
import { HowBookingWorks } from "@/components/home/how-booking-works";
import { StudioCategories } from "@/components/home/studio-categories";
import { Testimonials } from "@/components/home/testimonials";

// Featured studios are loaded from MongoDB — refresh periodically so new

export const revalidate = 60;

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSlider />
      
      {/* Streamed: the hero renders instantly while the studio query resolves. */}
      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>
      <StudioCategories />
      <HowBookingWorks />
      <Testimonials />
      <HostGuarantee />
      <BecomeHostCta />
    </main>
  );
}
