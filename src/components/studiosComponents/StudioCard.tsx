"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Studio } from "@/lib/types/studio";
import { Studio } from "@/lib/types";

interface StudioCardProps {
  studio: Studio;
}

export const StudioCard = ({ studio }: StudioCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-card">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={studio?.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800"}
            alt={studio.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 dark:bg-black/60 backdrop-blur-md text-foreground border-none font-semibold px-3 py-1">
              {studio.category}
            </Badge>
          </div>

          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1 bg-brand-gradient p-[1px] rounded-full overflow-hidden">
              <div className="bg-white dark:bg-zinc-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 text-brand-pink fill-brand-pink" />
                {/* <span className="text-xs font-bold">{studio.rating.toFixed(1)}</span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-5">
          <h3 className="text-lg font-bold truncate group-hover:text-brand-pink transition-colors">
            {studio.title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm mt-2 gap-1">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <span className="truncate">{studio.location}</span>
          </div>
          
          <div className="mt-4 flex items-baseline gap-1">
            {/* <span className="text-2xl font-black text-foreground">${studio.rate}</span> */}
            <span className="text-2xl font-black text-foreground">${studio.hourlyRate}</span>
            <span className="text-muted-foreground text-sm font-medium">/ hour</span>
          </div>
        </CardContent>

        {/* Footer Section */}
       {/* Footer Section */}
<CardFooter className="p-5 pt-0">
  <Link href={`/studios/${studio._id || studio._id}`} className="w-full">
    <Button className="w-full bg-blue-500 hover:opacity-90 text-white border-none shadow-lg shadow-brand-pink/20 group/btn">
      <span>View Details</span>
      {/* <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" /> */}
    </Button>
  </Link>
</CardFooter>
      </Card>
    </motion.div>
  );
};