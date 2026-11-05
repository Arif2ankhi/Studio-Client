"use client";

import { useState } from "react";
import { Users, ShieldCheck, Calendar, User, Check, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

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
  hostInfo?: {
    name: string;
    email: string;
  };
}

export default function MyBookingCard({ studio }: { studio?: Studio }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!studio) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[250px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
          <p className="text-xs text-muted-foreground">Loading studio details...</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {studio.hostInfo && (
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-muted/30">
              <div className="h-12 w-12 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hosted by</p>
                <p className="font-bold text-sm text-foreground">{studio.hostInfo.name}</p>
                <p className="text-xs text-muted-foreground">{studio.hostInfo.email}</p>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold mb-3">About This Workspace</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {studio.overview}
            </p>
          </div>

          {studio.amenities && studio.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Included Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {studio.amenities.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-medium p-2.5 rounded-lg border bg-card">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="sticky top-20 shadow-md">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-extrabold">${studio.rate}</span>
                  <span className="text-xs text-muted-foreground"> / hour</span>
                </div>
                <span className="text-xs text-muted-foreground">Deposit: ${studio.deposit}</span>
              </div>

              <div className="space-y-3 border-t border-b py-4 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Max Capacity</span>
                  <span className="font-semibold text-foreground">{studio.capacity} creators</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Host Verification</span>
                  <span className="font-semibold text-emerald-600">Verified Host</span>
                </div>
              </div>

              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl gap-2 text-sm cursor-pointer shadow-md"
              >
                <Calendar className="h-4 w-4" /> Book Workspace Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studio={studio}
      />
    </>
  );
}