"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Calendar, Clock, Loader2, Users } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";

interface Studio {
  _id: string;
  title: string;
  rate: number;
  deposit: number;
  capacity: number;
  location: string;
  image: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  studio: Studio;
}

export function BookingModal({ isOpen, onClose, studio }: BookingModalProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Form Fields
  const [shootDate, setShootDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("14:00");
  const [crewCount, setCrewCount] = useState<number>(4);
  const [gearNotes, setGearNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculate Duration Hours based on Start/End Time Selection
  const calculatedHours = useMemo(() => {
    if (!startTime || !endTime) return 1;
    const [startH] = startTime.split(":").map(Number);
    const [endH] = endTime.split(":").map(Number);
    const diff = endH - startH;
    return diff > 0 ? diff : 1; // Default to minimum 1 hour
  }, [startTime, endTime]);

  // Price Calculation Breakdown
  const rateTotal = studio.rate * calculatedHours;
  const depositAmount = studio.deposit || 0;
  const totalCost = rateTotal + depositAmount;

  // Form Submission Handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to reserve a workspace slot.");
      router.push("/signin");
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      studioId: studio._id,
      studioTitle: studio.title,
      studioImage: studio.image,
      location: studio.location,
      userEmail: user.email,
      userName: user.name,
      shootDate,
      startTime,
      endTime,
      hours: calculatedHours,
      crewCount,
      gearNotes,
      hourlyRate: studio.rate,
      deposit: depositAmount,
      totalPrice: totalCost,
      status: "Pending", // Required requirement status
    };

    try {
      const res = await fetch("http://localhost:8000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (res.ok) {
        toast.success("Reservation request submitted!");
        onClose();
        router.push("/my-bookings");
      } else {
        toast.error("Failed to submit reservation. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Network error submitting booking request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-6 rounded-3xl bg-background border border-border shadow-2xl">
        <DialogHeader className="p-0 space-y-1">
          <p className="text-[11px] font-bold tracking-wider text-amber-500 uppercase">
            RESERVE CREATIVE SLOT
          </p>
          <DialogTitle className="text-xl font-black text-foreground leading-snug">
            {studio.title}
          </DialogTitle>
          <p className="text-xs text-muted-foreground font-medium pt-0.5">
            Rate: ${studio.rate}/hr • Deposit: ${depositAmount}
          </p>
        </DialogHeader>

        <form onSubmit={handleBookingSubmit} className="space-y-4 pt-3">
          {/* Shoot Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Shoot Date
            </label>
            <div className="relative">
              <Input
                type="date"
                value={shootDate}
                onChange={(e) => setShootDate(e.target.value)}
                required
                className="h-11 rounded-xl bg-muted/30 pr-10 text-sm font-medium border-border"
              />
            </div>
          </div>

          {/* Time Slot Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Start Time
              </label>
              <div className="relative">
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="h-11 rounded-xl bg-muted/30 pr-8 text-sm font-medium border-border"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                End Time
              </label>
              <div className="relative">
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="h-11 rounded-xl bg-muted/30 pr-8 text-sm font-medium border-border"
                />
              </div>
            </div>
          </div>

          {/* Expected Crew / Talent Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Expected Crew / Talent Count (Max {studio.capacity || 30})
            </label>
            <Input
              type="number"
              min={1}
              max={studio.capacity || 100}
              value={crewCount}
              onChange={(e) => setCrewCount(Number(e.target.value))}
              required
              className="h-11 rounded-xl bg-muted/30 text-sm font-medium border-border"
            />
          </div>

          {/* Gear / Production Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Production Requirements / Gear Notes{" "}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <Textarea
              value={gearNotes}
              onChange={(e) => setGearNotes(e.target.value)}
              placeholder="e.g. Bringing high-output lighting, smoke machine, heavy rigging..."
              className="min-h-[70px] rounded-xl bg-muted/30 text-xs resize-none border-border"
            />
          </div>

          {/* Pricing Calculation Summary Card */}
          <div className="rounded-2xl bg-muted/40 p-4 space-y-2 border border-border/60">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                ${studio.rate} × {calculatedHours} shoot hours
              </span>
              <span className="font-semibold text-foreground">${rateTotal}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Refundable Security Deposit</span>
              <span className="font-semibold text-foreground">
                ${depositAmount}
              </span>
            </div>

            <div className="border-t border-border/80 pt-2 flex items-center justify-between text-sm">
              <span className="font-bold text-foreground">Total Estimated Cost</span>
              <span className="font-extrabold text-amber-500 text-base">
                ${totalCost}
              </span>
            </div>
          </div>

          {/* Submit Action Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Checking Availability & Reserving...</span>
              </div>
            ) : (
              <span>Confirm & Reserve Workspace Slot</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}