// import "server-only";

// import { DEMO_STUDIOS } from "@/lib/demo-studios";
// import { getDatabase } from "@/lib/mongodb";
// import type { Studio, StudioCategory } from "@/lib/types";

// /** Document shape of the `studios` MongoDB collection. */
// interface StudioDocument {
//   title: string;
//   category: StudioCategory;
//   imageUrl?: string;
//   images?: string[];
//   hourlyRate: number;
//   rating: number;
//   reviewCount?: number;
//   location: string;
//   createdAt?: Date;
// }

// /**
//  * Returns the 6 featured studio spaces for the home page:
//  * top-rated first, newest first as a tiebreaker.
//  *
//  * Falls back to the bundled demo data when MongoDB is unreachable or the
//  * collection is still empty, so the home page always renders something.
//  */
// export async function getFeaturedStudios(): Promise<Studio[]> {
//   try {
//     const db = await getDatabase();

//     const studios = await db
//       .collection<StudioDocument>("studios")
//       .find({})
//       .sort({ rating: -1, createdAt: -1 })
//       .limit(6)
//       .toArray();

//     if (studios.length === 0) {
//       return DEMO_STUDIOS.slice(0, 6);
//     }

//     return studios.map((doc) => ({
//       id: String(doc._id),
//       title: doc.title,
//       category: doc.category,
//       imageUrl: doc.imageUrl ?? doc.images?.[0] ?? DEMO_STUDIOS[0].imageUrl,
//       hourlyRate: doc.hourlyRate,
//       rating: doc.rating,
//       reviewCount: doc.reviewCount ?? 0,
//       location: doc.location,
//     }));
//   } catch (error) {
//     console.warn(
//       "[getFeaturedStudios] MongoDB unreachable — serving demo studios.",
//       error instanceof Error ? error.message : error
//     );
//     return DEMO_STUDIOS.slice(0, 6);
//   }
// }

import { DEMO_STUDIOS } from "@/lib/demo-studios";
import type { Studio } from "@/lib/types";

/**
 * Returns the 6 featured studio spaces for the home page.
 * Fetches from your Express backend (http://localhost:8000/featured-studios).
 * Falls back to DEMO_STUDIOS if backend is unreachable or returns an empty list.
 */
export async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch("http://localhost:8000/featured-studios", {
      cache: "no-store", // Guarantees fresh listings during development
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: Studio[] = await res.json();

    // If MongoDB returns results, return them; otherwise, fallback to demo data
    if (data && data.length > 0) {
      return data;
    }

    return DEMO_STUDIOS.slice(0, 6);
  } catch (error) {
    console.warn(
      "[getFeaturedStudios] Express API unreachable — serving demo studios.",
      error instanceof Error ? error.message : error
    );
    return DEMO_STUDIOS.slice(0, 6);
  }
}