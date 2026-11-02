

import { DEMO_STUDIOS } from "@/lib/demo-studios";
import type { Studio } from "@/lib/types";

/**
 * Returns the 6 featured studio spaces for the home page.
 * Fetches from your Express backend (http://localhost:8000/featured-studios).
 * Falls back to DEMO_STUDIOS if backend is unreachable or returns an empty list.
 */
export async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-studios`, {
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