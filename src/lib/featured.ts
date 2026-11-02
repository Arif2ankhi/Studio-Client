import { Studio } from "@/lib/types";

export async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch("http://localhost:8000/featured-studios", {
      cache: "no-store", // Ensures fresh data from MongoDB during development
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured studios");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching featured studios:", error);
    return [];
  }
}