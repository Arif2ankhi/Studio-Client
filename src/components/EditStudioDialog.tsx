"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Upload, Info, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface StudioProps {
  _id: string;
  title?: string;
  category?: string;
  capacity?: number | string;
  location?: string;
  overview?: string;
  amenities?: string[];
  rate?: number | string;
  deposit?: number | string;
  image?: string;
  hostInfo?: {
    name: string;
    email: string;
  };
}

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
];

const amenityOptions = [
  "High-speed WiFi",
  "Professional Lighting",
  "Soundproofing",
  "Private Parking",
  "Air Conditioning",
  "Changing Room",
  "Kitchenette",
  "Studio Assistant",
];

export default function EditStudioDialog({
  studio,
  onUpdated,
}: {
  studio: StudioProps;
  /** Called after a successful update so parent pages can refetch instead of full-reloading. */
  onUpdated?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Form State pre-populated from the studio prop
  const [title, setTitle] = useState(studio?.title || "");
  const [category, setCategory] = useState(studio?.category || "");
  const [capacity, setCapacity] = useState(studio?.capacity?.toString() || "");
  const [location, setLocation] = useState(studio?.location || "");
  const [overview, setOverview] = useState(studio?.overview || "");
  const [amenities, setAmenities] = useState<string[]>(studio?.amenities || []);
  const [rate, setRate] = useState(studio?.rate?.toString() || "");
  const [deposit, setDeposit] = useState(studio?.deposit?.toString() || "");
  const [image, setImage] = useState(studio?.image || "");

  // Sync state whenever dialog opens or studio prop updates
  useEffect(() => {
    if (studio) {
      setTitle(studio.title || "");
      setCategory(studio.category || "");
      setCapacity(studio.capacity?.toString() || "");
      setLocation(studio.location || "");
      setOverview(studio.overview || "");
      setAmenities(studio.amenities || []);
      setRate(studio.rate?.toString() || "");
      setDeposit(studio.deposit?.toString() || "");
      setImage(studio.image || "");
    }
  }, [studio, open]);

  const hostInfo = studio?.hostInfo || {
    name: "James Bond",
    email: "jamesbond@studiospace.com",
  };

  const handleAmenityToggle = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      hostInfo,
    };

    setLoading(true);

    // `payload` already excludes the Mongo _id; send it as-is (PATCH).
    const updatedData = payload;
    
    
    
    try {
      // Sends PUT request to Express update endpoint
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio/${studio._id}`, {
        method: "PATCH",
        // method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error(`Update failed with status ${res.status}`);
      }

      const data = await res.json();
      console.log("Updated studio response:", data);

      toast.success("Studio listing updated!");

      setOpen(false); // Close dialog on success

      // Refresh the parent view so updated details show immediately.
      if (onUpdated) {
        onUpdated();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update studio:", error);
      toast.error("Failed to update studio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Edit studio details"
            className="text-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
          />
        }
      >
        <Pencil className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">Edit Studio Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Host Information (Read-only) */}
          <Card className="bg-muted/30 border-dashed">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-brand-pink" />
                Host Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3">
              <div className="space-y-1">
                <Label className="text-xs uppercase text-muted-foreground">Name</Label>
                <p className="font-medium text-sm">{hostInfo.name}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs uppercase text-muted-foreground">Email Address</Label>
                <p className="font-medium text-sm">{hostInfo.email}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Details</CardTitle>
                  <CardDescription>Update your studio name, category and address.</CardDescription>
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
                        onValueChange={(value) => setCategory(value ?? "")}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase().replace(" ", "-")}>
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
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {amenityOptions.map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox
                            id={item}
                            checked={amenities.includes(item)}
                            onCheckedChange={() => handleAmenityToggle(item)}
                          />
                          <label
                            htmlFor={item}
                            className="text-xs font-medium leading-none cursor-pointer"
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
                  <div className="p-3 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center space-y-2 bg-muted/10">
                    {image ? (
                      <img
                        src={image}
                        alt="Preview"
                        className="h-24 w-full object-cover rounded-md"
                      />
                    ) : (
                      <>
                        <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <Upload className="h-4 w-4 text-amber-600" />
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Preview will appear here when URL is provided.
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md"
              >
                {loading ? "Saving Changes..." : "Update Studio Details"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
