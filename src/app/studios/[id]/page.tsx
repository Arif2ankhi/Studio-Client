"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Check,
  Users,
  ShieldCheck,
  Calendar,
  ArrowLeft,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditStudioDialog from "@/components/EditStudioDialog";
import DeleteStudioDialog from "@/components/DeleteStudioDialog";
// import MyBookingCard from "@/components/MyBookingCard";
import { BookingModal } from "@/components/BookingModal";
import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenFromServer";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
// import { headers } from "next/headers"
// import { auth } from "@/lib/auth";
// import { getTokenServer } from "@/lib/getTokenFromServer"

interface Studio {
  _id: string;
  title: string;
  category: string;
  capacity: number;
  location: string;
  overview: string;
  amenities: string[];
  rate: number;
  deposit: number;
  image: string;
  images?: string[];
  hostInfo: {
    name: string;
    email: string;
  };
}

// Mock Reviews Data
const MOCK_REVIEWS = [
  {
    id: "1",
    author: "Sarah Jenkins",
    role: "Commercial Photographer",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Incredible space! The daylight and ceiling height made our editorial shoot seamless.",
  },
  {
    id: "2",
    author: "David Chen",
    role: "Podcast Host",
    rating: 5,
    date: "1 month ago",
    comment: "Super smooth check-in process and top-notch acoustic treatment.",
  },
];

export default function StudioDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    async function fetchStudioDetails() {
      try {


    const token = await getTokenFromClient()

    console.log(token);


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio/${id}`,{

          headers: {
            authorization: `Bearer ${token}`
          }
      
        });
        if (res.ok) {
          const data = await res.json();
          setStudio(data);
        }
      } catch (err) {
        console.error("Error fetching studio details:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchStudioDetails();
  }, [id]);

  // Gallery Array Fallback
  const galleryImages = studio
    ? studio.images && studio.images.length > 0
      ? studio.images
      : [studio.image]
    : [];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-sm text-muted-foreground">
          Loading workspace details...
        </p>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold">Studio Not Found</h2>
        <p className="text-muted-foreground mt-1">ID: {id}</p>
        <Link href="/studios" className="mt-4">
          <Button className="bg-amber-500 text-white">Back to Explore</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-amber-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Explore
          </Link>

          {/* Edit & Delete Host Controls */}
          <div className="flex items-center gap-2">
            <EditStudioDialog studio={studio} />
            <DeleteStudioDialog id={id} />
          </div>
        </div>

        {/* Title Header */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500 text-white capitalize">
              {studio.category?.replace("-", " ")}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-amber-500" />{" "}
              {studio.location}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            {studio.title}
          </h1>
        </div>

        {/* Gallery Carousel */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted mb-8 shadow-sm group">
          <img
            src={galleryImages[activeImageIndex]}
            alt={`${studio.title} view ${activeImageIndex + 1}`}
            className="h-full w-full object-cover transition-all duration-300"
          />

          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 text-white backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 text-white backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
            {activeImageIndex + 1} / {galleryImages.length}
          </div>
        </div>

        {/* Two Column Workspace Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Specifications, Amenities & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Details */}
            {studio.hostInfo && (
              <div className="flex items-center gap-4 p-4 rounded-xl border bg-muted/30">
                <div className="h-12 w-12 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hosted by</p>
                  <p className="font-bold text-sm text-foreground">
                    {studio.hostInfo.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {studio.hostInfo.email}
                  </p>
                </div>
              </div>
            )}

            {/* Workspace Specs */}
            <div>
              <h2 className="text-xl font-bold mb-3">About This Workspace</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {studio.overview}
              </p>
            </div>

            {/* Amenity List */}
            {studio.amenities && studio.amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Included Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {studio.amenities.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs font-medium p-2.5 rounded-lg border bg-card"
                    >
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Creator Reviews */}
            <div>
              <h2 className="text-xl font-bold mb-4">Creator Reviews</h2>
              <div className="space-y-4">
                {MOCK_REVIEWS.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border bg-card space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{rev.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {rev.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Book Workspace Now Button */}
          <div className="space-y-6">
            <Card className="sticky top-20 shadow-md">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-extrabold">
                      ${studio?.rate}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      / hour
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Deposit: ${studio?.deposit}
                  </span>
                </div>

                <div className="space-y-3 border-t border-b py-4 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" /> Max Capacity
                    </span>
                    <span className="font-semibold text-foreground">
                      {studio?.capacity} creators
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" /> Host Verification
                    </span>
                    <span className="font-semibold text-emerald-600">
                      Verified Host
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl gap-2 text-sm cursor-pointer"
                >
                  <Calendar className="h-4 w-4" /> Book Workspace Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking System Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        studio={studio}
      />
    </div>
  );
}
