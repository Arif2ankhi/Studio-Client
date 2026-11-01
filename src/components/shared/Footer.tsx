"use client";

import Link from "next/link";
import { Camera } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 text-sm text-muted-foreground">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Camera className="h-4 w-4" />
          </div>
          <span className="font-semibold text-foreground tracking-tight">
            Studio<span className="text-primary">Space</span>
          </span>
          <span className="text-xs">© {new Date().getFullYear()} StudioSpace, Inc.</span>
        </div>

        {/* Center/Right: Quick Links */}
        <nav className="flex items-center gap-6 text-xs font-medium">
          <Link href="/studios" className="hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link href="/how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
        </nav>

      </div>
    </footer>
  );
}