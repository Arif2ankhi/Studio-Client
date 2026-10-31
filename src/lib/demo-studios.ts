import type { Studio } from "@/lib/types";

/**
 * Seed / fallback data for the `studios` MongoDB collection.
 *
 * Used in two places:
 *  - as a reference for the document shape the app expects;
 *  - as a graceful fallback so the home page still renders when MongoDB
 *    is not reachable (local dev without a database, CI, demos, ...).
 *
 * Images are high-res Unsplash assets; swap them for your own CDN URLs.
 */
export const DEMO_STUDIOS: Studio[] = [
  {
    id: "demo-lumiere-photo-loft",
    title: "Lumière Photo Loft",
    category: "photo-studio",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    hourlyRate: 45,
    rating: 4.9,
    reviewCount: 128,
    location: "Brooklyn, NY",
  },
  {
    id: "demo-red-curtain-stage",
    title: "Red Curtain Sound Stage",
    category: "sound-stage",
    imageUrl:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80",
    hourlyRate: 120,
    rating: 4.9,
    reviewCount: 86,
    location: "Atlanta, GA",
  },
  {
    id: "demo-analog-dreams-suite",
    title: "Analog Dreams Music Suite",
    category: "music-suite",
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=1200&q=80",
    hourlyRate: 55,
    rating: 5.0,
    reviewCount: 74,
    location: "Nashville, TN",
  },
  {
    id: "demo-echo-chamber-podcast",
    title: "Echo Chamber Podcast Room",
    category: "podcast-room",
    imageUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    hourlyRate: 32,
    rating: 4.7,
    reviewCount: 203,
    location: "Los Angeles, CA",
  },
  {
    id: "demo-pigment-canvas",
    title: "Pigment & Canvas Workshop",
    category: "art-workshop",
    imageUrl:
      "https://images.unsplash.com/photo-1452802447250-470a88ac82bc?auto=format&fit=crop&w=1200&q=80",
    hourlyRate: 28,
    rating: 4.6,
    reviewCount: 51,
    location: "Portland, OR",
  },
  {
    id: "demo-golden-hour-studio",
    title: "Golden Hour Photo Studio",
    category: "photo-studio",
    imageUrl:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=80",
    hourlyRate: 38,
    rating: 4.8,
    reviewCount: 97,
    location: "Austin, TX",
  },
  {
    id: "demo-sunlit-guitar-room",
    title: "Sunlit Guitar Room",
    category: "music-suite",
    imageUrl:
      "https://images.unsplash.com/photo-1519508234439-4f23643125c1?auto=format&fit=crop&w=1200&q=80",
    hourlyRate: 40,
    rating: 4.8,
    reviewCount: 63,
    location: "Denver, CO",
  },
  {
    id: "demo-brushworks",
    title: "The Brushworks Studio",
    category: "art-workshop",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    hourlyRate: 26,
    rating: 4.5,
    reviewCount: 39,
    location: "Seattle, WA",
  },
];
