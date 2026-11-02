"use client";
import { useEffect, useState, useMemo } from "react";
import { StudioCard } from "@/components/studiosComponents/StudioCard";
import { Studio } from "@/lib/types";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// List of available categories matching your database slugs
const CATEGORIES = [
  { label: "All Categories", value: "all" },
  { label: "Photo Studio", value: "photo-studio" },
  { label: "Film Stage", value: "film-stage" },
  { label: "Podcast Lounge", value: "podcast-lounge" },
  { label: "Music Suite", value: "music-suite" },
  { label: "Art Workshop", value: "art-workshop" },
  { label: "Dance Studio", value: "dance-studio" },
];

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  // Fetch all studios from your API on component mount
  useEffect(() => {
    async function fetchStudios() {
      try {
        const res = await fetch("http://localhost:8000/studios");
        if (res.ok) {
          const data = await res.json();
          setStudios(data);
        }
      } catch (error) {
        console.error("Failed to fetch studios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudios();
  }, []);

  // Filter studios dynamically based on Search Query and Category
  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      // 1. Category Filter Check
      const matchesCategory =
        selectedCategory === "all" || studio.category === selectedCategory;

      // 2. Search Input Check (Title, Location, Overview, or Category)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        studio.title?.toLowerCase().includes(q) ||
        studio.location?.toLowerCase().includes(q) ||
        studio.category?.toLowerCase().includes(q) ||
        studio.overview?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [studios, searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header & Filter Controls */}
      <div className="bg-background border-b pt-10 pb-8 mb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Find your{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              Creative Space
            </span>
          </h1>
          <p className=" text-green-800 font-semibold mb-8">
            Discover and book unique studios from local hosts.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-3xl relative">
            {/* Real-time Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, category, or location..."
                className="pl-10 h-12 text-sm bg-background"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`flex items-center justify-center gap-2 px-6 h-12 rounded-md border text-sm font-medium transition-colors w-full md:w-auto ${
                  selectedCategory !== "all"
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-background hover:bg-muted"
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>
                  {selectedCategory === "all"
                    ? "Filters"
                    : CATEGORIES.find((c) => c.value === selectedCategory)?.label}
                </span>
              </button>

              {/* Filter Dropdown Popover */}
              {showFilterDropdown && (
                <div className="absolute right-0 top-14 z-20 w-64 rounded-xl border bg-card p-3 shadow-lg space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                    Select Category
                  </p>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        selectedCategory === cat.value
                          ? "bg-amber-500 text-white"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Active Filter Badges */}
          {(selectedCategory !== "all" || searchQuery) && (
            <div className="flex items-center gap-2 mt-4 text-xs">
              <span className="text-muted-foreground">Active Filters:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 font-semibold border border-amber-500/20">
                  Category: {CATEGORIES.find((c) => c.value === selectedCategory)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedCategory("all")}
                  />
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-foreground font-medium border">
                  Query: "{searchQuery}"
                  <X
                    className="h-3 w-3 cursor-pointer hover:opacity-80"
                    onClick={() => setSearchQuery("")}
                  />
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Grid View Output */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <p className="text-sm text-muted-foreground">Loading studio spaces...</p>
          </div>
        ) : filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredStudios.map((studio) => (
              // <StudioCard key={studio._id || studio.id} studio={studio} />
              // <StudioCard key={studio.id || studio.id} studio={studio} />
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-card">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <h2 className="text-xl font-bold">No studios found</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              We could not find any studio matching your current search or category filter.
            </p>
            <Button onClick={clearFilters} variant="outline" className="mt-4 text-xs font-semibold">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}