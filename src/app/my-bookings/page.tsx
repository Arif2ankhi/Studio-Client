
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  MapPin,
  Calendar,
  Clock,
  Loader2,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage?: string;
  image?: string;
  location?: string;
  shootDate?: string;
  startTime?: string;
  endTime?: string;
  hours?: number;
  totalPrice?: number;
  rate?: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export default function MyBookingsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!user?.email) return;

  //   async function fetchBookings() {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:8000/my-bookings?email=${encodeURIComponent(
  //           user.email
  //         )}`
  //       );
  //       if (res.ok) {
  //         const data = await res.json();
  //         console.log('Fetching booking data', data);
  //         setBookings(data);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching bookings:", err);
  //       toast.error("An error occurred. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchBookings();
  // }, [user]);

 useEffect(() => {
    const userEmail = user?.email;
    if (!userEmail) return;

    async function fetchBookings(email: string) {
      try {
        const res = await fetch(
          `http://localhost:8000/my-bookings?email=${encodeURIComponent(
            email
          )}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log('Fetching booking data', data);
          setBookings(data);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings(userEmail);
  }, [user]);

  const handleCancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setCancelingId(id);
    try {
      const res = await fetch(`http://localhost:8000/bookings/${id}/cancel`, {
        method: "PATCH",
      });

      if (res.ok) {
        toast.success("You have successfully cancelled your booking.");
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b))
        );
      } else {
        toast.error("Your booking has been cancelled.");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setCancelingId(null);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-sm text-muted-foreground">
          Your Booking is loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-10">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20 mb-2">
              <Sparkles className="h-3 w-3" /> Production Schedule
            </span>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              My Studio Bookings
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Track reservation statuses, cancellation requests, and shoot times.
            </p>
          </div>

          <Link href="/studios">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs gap-2 rounded-xl h-10 px-5 shadow-sm">
              Explore More Studios <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Bookings Card List */}
        {bookings.length > 0 ? (
          <div className="space-y-5">
            {bookings.map((booking) => {
              const imageSrc =
                booking.studioImage ||
                booking.image ||
                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04";

              const isPending =
                booking.status === "Pending" ||
                (booking.status as string) === "Pending Host Approval";
              const isCancelled = booking.status === "Cancelled";

              return (
                <Card
                  key={booking._id}
                  className="overflow-hidden border border-border/80 shadow-xs hover:shadow-md transition-shadow bg-card rounded-2xl"
                >
                  <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch gap-5">
                    
                    {/* Left: Studio Image */}
                    <div className="sm:w-48 aspect-[16/10] sm:aspect-auto shrink-0 relative rounded-xl overflow-hidden bg-muted">
                      <img
                        src={imageSrc}
                        alt={booking.studioTitle}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Middle & Right: Details and Controls */}
                    <div className="flex-1 flex flex-col justify-between gap-4">
                      
                      {/* Top Row: Title, Badge, ID & Total Price */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isCancelled ? (
                              <Badge
                                variant="destructive"
                                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                              >
                                ⨂ Cancelled
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 border-amber-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                                ⏱ Pending Host Approval
                              </Badge>
                            )}
                            <span className="text-[11px] text-muted-foreground font-mono">
                              ID: #{booking._id.slice(-6)}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-lg text-foreground leading-snug">
                            {booking.studioTitle}
                          </h3>
                        </div>

                        {/* Price Column */}
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                            Total Charged / Due
                          </p>
                          <p className="text-xl font-black text-amber-500">
                            ${booking.totalPrice || booking.rate || 0}
                          </p>
                        </div>
                      </div>

                      {/* Middle Row: Schedule Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          {booking.shootDate || "Date N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          {booking.startTime && booking.endTime
                            ? `${booking.startTime} - ${booking.endTime}`
                            : `${booking.hours || 1} hrs`}
                        </span>
                        {booking.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                            {booking.location}
                          </span>
                        )}
                      </div>

                      {/* Bottom Row: Action Buttons */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                        {isPending && (
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={cancelingId === booking._id}
                            onClick={() => handleCancelBooking(booking._id)}
                            className="h-8 text-xs font-semibold gap-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50"
                          >
                            {cancelingId === booking._id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5" />
                            )}
                            Cancel Booking
                          </Button>
                        )}
                      </div>

                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border rounded-2xl bg-card">
            <h3 className="text-lg font-bold">No Booking is available</h3>
            <p className="text-xs text-muted-foreground mt-1">
              You have not booked any Workplace or studio.
            </p>
            <Link href="/studios" className="mt-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs h-9">
               Book Workplace
              </Button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}