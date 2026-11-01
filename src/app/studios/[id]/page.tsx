// import React from 'react';

// const StudioDetailsPage = async ({params}) => {
// const {id} = await params
    

//     const res = await fetch(`http://localhost:8000/studio/${id}`)
//     const data = await res.json()
//     console.log(data)


//     return (
//         <div>
//             Studio details page 
//         </div>
//     );
// };

// export default StudioDetailsPage;

import React from 'react';
import Link from 'next/link';
import { MapPin, Users, DollarSign, Check, User, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ id: string }>;
}

const StudioDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  let studio = null;

  try {
    const res = await fetch(`http://localhost:8000/studio/${id}`, {
      cache: 'no-store', // Ensures fresh data from Express API
    });
    if (res.ok) {
      studio = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch studio details:", error);
  }

  if (!studio) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold">Studio Not Found</h2>
        <p className="text-muted-foreground mt-2">Could not find a studio matching ID: {id}</p>
        <Link href="/studios" className="mt-4 text-amber-500 underline text-sm">
          Return to Explore Studios
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Back Link */}
        <Link
          href="/studios"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore Studios
        </Link>

        {/* Title Header */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500 text-white capitalize">
              {studio.category?.replace('-', ' ')}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-amber-500" /> {studio.location}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">{studio.title}</h1>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted mb-8 shadow-sm">
          <img
            src={studio.image || studio.imageUrl}
            alt={studio.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Overview & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Host Banner */}
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

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-3">About This Studio</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {studio.overview}
              </p>
            </div>

            {/* Amenities Checklist */}
            {studio.amenities && studio.amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Included Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {studio.amenities.map((item: string) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs font-medium p-2.5 rounded-lg border bg-card shadow-xs"
                    >
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Pricing & Booking Widget */}
          <div className="space-y-6">
            <Card className="sticky top-20 shadow-md">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-extrabold">${studio.rate || studio.hourlyRate}</span>
                    <span className="text-xs text-muted-foreground"> / hour</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Deposit: ${studio.deposit}</span>
                </div>

                <div className="space-y-3 border-t border-b py-4 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" /> Max Capacity
                    </span>
                    <span className="font-semibold text-foreground">{studio.capacity} creators</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" /> Host Status
                    </span>
                    <span className="font-semibold text-emerald-600">Verified Listing</span>
                  </div>
                </div>

                <Button className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl">
                  Reserve This Studio
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudioDetailsPage;