"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Upload, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop"
];

const amenityOptions = [
  "High-speed WiFi",
  "Professional Lighting",
  "Soundproofing",
  "Private Parking",
  "Air Conditioning",
  "Changing Room",
  "Kitchenette",
  "Studio Assistant"
];

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [overview, setOverview] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [rate, setRate] = useState("");
  const [deposit, setDeposit] = useState("");
  const [image, setImage] = useState("");

  const hostInfo = {
    name: user?.name || "Anonymous Host",
    email: user?.email || "host@studiospace.com"
  };

  const handleAmenityToggle = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      category,
      capacity: Number(capacity),
      location,
      overview,
      amenities,
      rate: Number(rate),
      deposit: Number(deposit),
      image,
      hostInfo
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success("Studio listing created!");
        // Navigate to My Listings page
        router.push("/my-listings");
      } else {
        toast.error("Failed to add studio listing.");
      }
    } catch (err) {
      console.error("Add studio error:", err);
      toast.error("An error occurred while creating the listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          List Your Workspace
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill out the details below to share your creative space with our
          community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Host Information (Read-only) */}
        <Card className="bg-muted/30 border-dashed">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-500" />
              Host Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            <div className="space-y-1">
              <Label className="text-xs uppercase text-muted-foreground">
                Name
              </Label>
              <p className="font-medium text-sm">{hostInfo.name}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs uppercase text-muted-foreground">
                Email Address
              </Label>
              <p className="font-medium text-sm">{hostInfo.email}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Details</CardTitle>
                <CardDescription>
                  Give your studio a catchy name and category.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Studio Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Downtown Daylight Loft"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>

                    <Select
                      value={category}
                      onValueChange={(val) => setCategory(val as string)}
                      required
                    >
                      {/* <Select value={category} onValueChange={setCategory} required> */}
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat}
                            value={cat.toLowerCase().replace(" ", "-")}
                          >
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Max Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder="10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location / Address</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="123 Creative Way, Arts District"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description & Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="overview">Detailed Overview</Label>
                  <Textarea
                    id="overview"
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    placeholder="Describe the vibe, equipment, and rules of your space..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <div className="space-y-4">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {amenityOptions.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={amenities.includes(item)}
                          onCheckedChange={() => handleAmenityToggle(item)}
                        />
                        <label
                          htmlFor={item}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing & Media */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rate">Hourly Rate ($)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit ($)</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="100"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Main Image URL</Label>
                  <div className="relative">
                    <Input
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                    <Upload className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center space-y-2 bg-muted/10">
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="h-28 w-full object-cover rounded-md"
                    />
                  ) : (
                    <>
                      <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                        <Upload className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Preview will appear here once valid URL is provided.
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md rounded-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Publishing Studio...</span>
                </div>
              ) : (
                "Publish Studio Listing"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
