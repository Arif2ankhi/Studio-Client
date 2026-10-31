"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSlide {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

const SLIDES: HeroSlide[] = [
  {
    eyebrow: "1,200+ verified creative spaces",
    titleLead: "Book iconic studios",
    titleAccent: "by the hour",
    subtitle:
      "Photo studios, sound stages, podcast rooms and music suites — verified, equipped and bookable in minutes.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
    imageAlt: "Warmly lit music studio with guitars and a mixing desk",
  },
  {
    eyebrow: "Film & photo ready",
    titleLead: "Lights, camera,",
    titleAccent: "roll.",
    subtitle:
      "Blackbox stages with lighting grids, cyc walls and grip gear on standby. Load in today, shoot tomorrow.",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1920&q=80",
    imageAlt: "Performers silhouetted against a deep red stage curtain",
  },
  {
    eyebrow: "Podcast & music spaces",
    titleLead: "Plug in and",
    titleAccent: "hit record.",
    subtitle:
      "Acoustically treated rooms, broadcast-grade mics and engineers on request — your next episode starts here.",
    image:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1920&q=80",
    imageAlt: "Studio condenser microphone and headphones in front of a DAW",
  },
];

/**
 * Banner / hero slider (Swiper.js): 3 high-res slides with autoplay,
 * pagination bullets, keyboard support and custom arrow controls.
 * Both CTAs point at `/studios`.
 */
export function HeroSlider() {
  const prevRef = React.useRef<HTMLButtonElement>(null);
  const nextRef = React.useRef<HTMLButtonElement>(null);

  const ctaClass = cn(
    buttonVariants({ size: "lg" }),
    "h-11 rounded-full bg-amber-500 px-6 text-base font-semibold text-zinc-950 hover:bg-amber-400"
  );
  const secondaryCtaClass = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "h-11 rounded-full border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur hover:bg-white/20 hover:text-white"
  );

  return (
    <section
      aria-label="Featured studios"
      className="relative h-[88svh] max-h-[840px] min-h-[560px] w-full overflow-hidden bg-zinc-950"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
        slidesPerView={1}
        speed={900}
        loop
        grabCursor
        keyboard={{ enabled: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation={{}}
        onBeforeInit={(swiper) => {
          // Wire Swiper's navigation up to our custom (Tailwind-styled) arrows.
          const nav = swiper.params.navigation;
          if (nav && typeof nav === "object" && prevRef.current && nextRef.current) {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        className="hero-swiper h-full w-full"
      >
        {SLIDES.map((slide, index) => {
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <SwiperSlide key={slide.titleAccent} className="overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* readability gradients over the photography */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/55 to-zinc-950/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/20" />

              <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6">
                <div className="max-w-2xl py-20">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    <Sparkles className="size-3.5 text-amber-400" />
                    {slide.eyebrow}
                  </span>

                  <Heading className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.titleLead}{" "}
                    <span className="text-amber-400">{slide.titleAccent}</span>
                  </Heading>

                  <p className="mt-5 max-w-xl text-base text-zinc-200 sm:text-lg">
                    {slide.subtitle}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href="/studios" className={ctaClass}>
                      Explore Studios
                      <ArrowRight className="ml-1 size-4" />
                    </Link>
                    <Link href="/studios" className={secondaryCtaClass}>
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom navigation arrows */}
      <button
        ref={prevRef}
        type="button"
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50 md:inline-flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label="Next slide"
        className="absolute top-1/2 right-4 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50 md:inline-flex"
      >
        <ChevronRight className="size-5" />
      </button>
    </section>
  );
}
