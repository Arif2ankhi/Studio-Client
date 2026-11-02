// "use client";

// import Link from "next/link";
// import { Camera } from "lucide-react";

// export function Footer() {
//   return (
//     <footer className="w-full border-t bg-background py-6">
//       <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 text-sm text-muted-foreground">
        
//         {/* Left: Brand & Copyright */}
//         <div className="flex items-center gap-2">
//           <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
//             <Camera className="h-4 w-4" />
//           </div>
//           <span className="font-semibold text-foreground tracking-tight">
//             Studio<span className="text-primary">Space</span>
//           </span>
//           <span className="text-xs">© {new Date().getFullYear()} StudioSpace, Inc.</span>
//         </div>

//         {/* Center/Right: Quick Links */}
//         <nav className="flex items-center gap-6 text-xs font-medium">
//           <Link href="/studios" className="hover:text-foreground transition-colors">
//             Explore
//           </Link>
//           <Link href="/how-it-works" className="hover:text-foreground transition-colors">
//             How It Works
//           </Link>
//           <Link href="/privacy" className="hover:text-foreground transition-colors">
//             Privacy
//           </Link>
//           <Link href="/terms" className="hover:text-foreground transition-colors">
//             Terms
//           </Link>
//         </nav>

//       </div>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import { Aperture, Github, Instagram, Twitter, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background/95 text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Description Column (Spans 2 cols on desktop) */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
                <Aperture className="size-5 text-zinc-900" />
                <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight">
                  Studio <span className="text-amber-500">Space</span>
                </span>
                <span className="mt-1 text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
                  CREATIVE MARKETPLACE
                </span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">
              Discover and book verified, top-tier creative studios, film stages, podcast suites, and art workshops by the hour.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Platform
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/studios" className="transition-colors hover:text-foreground">
                  Explore Studios
                </Link>
              </li>
              <li>
                <Link href="/add-studio" className="transition-colors hover:text-foreground">
                  Host Your Studio
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="transition-colors hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#about" className="transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Categories
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/studios?category=photo-studio" className="transition-colors hover:text-foreground">
                  Photo Studios
                </Link>
              </li>
              <li>
                <Link href="/studios?category=film-stage" className="transition-colors hover:text-foreground">
                  Film Stages
                </Link>
              </li>
              <li>
                <Link href="/studios?category=podcast-lounge" className="transition-colors hover:text-foreground">
                  Podcast Lounges
                </Link>
              </li>
              <li>
                <Link href="/studios?category=music-suite" className="transition-colors hover:text-foreground">
                  Music Suites
                </Link>
              </li>
              <li>
                <Link href="/studios?category=art-workshop" className="transition-colors hover:text-foreground">
                  Art Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Stay Connected
            </h3>
            <p className="text-xs text-muted-foreground">
              Subscribe for new studio listings and host discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-9 text-xs pr-8 bg-background"
                />
                <Mail className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <Button type="submit" size="sm" className="w-full h-8 text-xs font-bold bg-amber-500 text-white hover:bg-amber-600">
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row text-xs text-muted-foreground">
          <p>© {currentYear} StudioSpace. All rights reserved.</p>
          
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for creators everywhere.
          </p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}