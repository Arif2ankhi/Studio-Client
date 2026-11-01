// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, MapPin, Star } from "lucide-react";

// import { cn } from "cn";
// import { buttonVariants } from "@/components/ui/button";
// import { CATEGORIES_BY_SLUG } from "@/lib/studio-categories";
// import type { Studio } from "@/lib/types";

// /**
//  * Single studio space card: image, category badge, rating badge,
//  * title, hourly rate, location and a "View Details" CTA.
//  */
// export function StudioCard({ studio }: { studio: Studio }) {
//   const category = CATEGORIES_BY_SLUG[studio.category];

//   return (
//     <article className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5">
//       <div className="relative aspect-[4/3] overflow-hidden">
//         <Image
//           src={studio.imageUrl}
//           alt={`${studio.title} — ${category.label}`}
//           fill
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           className="object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
//           <span className="inline-flex h-5 items-center rounded-4xl bg-zinc-950/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
//             {category.label}
//           </span>
//           <span className="inline-flex h-5 items-center gap-1 rounded-4xl bg-amber-400 px-2 py-0.5 text-xs font-semibold text-zinc-950">
//             <Star className="size-3 fill-current" />
//             {studio.rating.toFixed(1)}
//             <span className="font-medium opacity-70">({studio.reviewCount})</span>
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-1 flex-col gap-3 p-4">
//         <h3 className="font-heading text-base leading-snug font-semibold">
//           {studio.title}
//         </h3>
//         <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
//           <MapPin className="size-4 shrink-0" />
//           {studio.location}
//         </p>

//         <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
//           <p className="text-sm">
//             <span className="text-lg font-bold">${studio.hourlyRate}</span>{" "}
//             <span className="text-muted-foreground">/ hr</span>
//           </p>
//           <Link
//             href={`/studios/${studio.id}`}
//             className={cn(
//               buttonVariants({ size: "sm" }),
//               "gap-1.5 bg-amber-500 font-semibold text-zinc-950 hover:bg-amber-400"
//             )}
//           >
//             View Details
//             <ArrowRight className="size-3.5" />
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CATEGORIES_BY_SLUG } from "@/lib/studio-categories";
import type { Studio } from "@/lib/types";

export function StudioCard({ studio }: { studio: Studio }) {
  // Safe category lookup with fallback
  const categoryLabel = CATEGORIES_BY_SLUG[studio.category]?.label || studio.category;
  
  // Safe rating fallback
  const ratingValue = studio.rating ?? 5.0;
  const reviewCountValue = studio.reviewCount ?? 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"}
          alt={`${studio.title} — ${categoryLabel}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="inline-flex h-5 items-center rounded-full bg-zinc-950/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur capitalize">
            {categoryLabel}
          </span>
          <span className="inline-flex h-5 items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-zinc-950">
            <Star className="size-3 fill-current" />
            {ratingValue.toFixed(1)}
            <span className="font-medium opacity-70">({reviewCountValue})</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-heading text-base leading-snug font-semibold line-clamp-1">
          {studio.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground truncate">
          <MapPin className="size-4 shrink-0 text-amber-500" />
          {studio.location}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
          <p className="text-sm">
            <span className="text-lg font-bold">${studio.rate}</span>{" "}
            <span className="text-muted-foreground">/ hr</span>
          </p>
          <Link
            href={`/studios/${studio._id}`}
            className={cn(
              buttonVariants({ size: "sm" }),
              "gap-1.5 bg-amber-500 font-semibold text-zinc-950 hover:bg-amber-400"
            )}
          >
            View Details
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}