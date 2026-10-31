import {
  AudioLines,
  Camera,
  Clapperboard,
  Mic,
  Palette,
  type LucideIcon,
} from "lucide-react";

import type { StudioCategory } from "@/lib/types";

export interface StudioCategoryMeta {
  /** Also the `?category=` value used on `/studios`. */
  slug: StudioCategory;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind classes for the icon tile. Static strings so Tailwind can see them. */
  accentClass: string;
}

export const STUDIO_CATEGORIES: StudioCategoryMeta[] = [
  {
    slug: "photo-studio",
    label: "Photo Studios",
    description: "Cycloramas, daylight bays and continuous lighting.",
    icon: Camera,
    accentClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    slug: "sound-stage",
    label: "Sound Stages",
    description: "Blackbox stages with grids, cyc walls and grip gear.",
    icon: Clapperboard,
    accentClass: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  },
  {
    slug: "podcast-room",
    label: "Podcast Rooms",
    description: "Acoustically treated rooms with broadcast mics.",
    icon: Mic,
    accentClass: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  },
  {
    slug: "music-suite",
    label: "Music Suites",
    description: "Tracking rooms, control desks and instrument lockers.",
    icon: AudioLines,
    accentClass: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
  {
    slug: "art-workshop",
    label: "Art Workshops",
    description: "Wet studios, clay rooms and messy-material friendly.",
    icon: Palette,
    accentClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
];

export const CATEGORIES_BY_SLUG: Record<StudioCategory, StudioCategoryMeta> =
  Object.fromEntries(
    STUDIO_CATEGORIES.map((category) => [category.slug, category])
  ) as Record<StudioCategory, StudioCategoryMeta>;
