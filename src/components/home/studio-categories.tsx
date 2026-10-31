import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { STUDIO_CATEGORIES } from "@/lib/studio-categories";

/**
 * Browse by Studio Categories: each card links to `/studios` with the
 * category pre-selected via the `?category=` query param.
 */
export function StudioCategories() {
  return (
    <section
      id="categories"
      className="border-y border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-amber-600 uppercase dark:text-amber-400">
            Browse by category
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Find the right room for the job
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pick a category and we&apos;ll take you to{" "}
            <span className="font-medium text-foreground">/studios</span> with
            that filter already applied.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STUDIO_CATEGORIES.map(({ slug, label, description, icon: Icon, accentClass }) => (
            <Link
              key={slug}
              href={`/studios?category=${slug}`}
              className="group flex flex-col gap-3 rounded-2xl bg-card p-5 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <span
                className={`flex size-12 items-center justify-center rounded-xl ${accentClass}`}
              >
                <Icon className="size-6" />
              </span>
              <span className="font-semibold">{label}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-amber-600 dark:text-amber-400">
                Explore
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
