import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedStudios } from "@/lib/studios";

import { StudioCard } from "@/components/home/studio-card";

/**
 * Featured Studios (dynamic): server component that loads the 6 top-rated /
 * newest spaces from MongoDB via `getFeaturedStudios()` and renders a card
 * grid. Rendered inside a <Suspense> boundary on the home page.
 */
export async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section
      id="featured"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide text-amber-600 uppercase dark:text-amber-400">
            Featured spaces
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Top-rated studios, ready to book
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The six newest and best-reviewed spaces on StudioSpace — every
            listing is verified, insured and bookable by the hour.
          </p>
        </div>
        <Link
          href="/studios"
          className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
        >
          View all studios
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <StudioCard key={studio.id} studio={studio} />
        ))}
      </div>
    </section>
  );
}
