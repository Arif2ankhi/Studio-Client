// components/navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, PlusCircle, LayoutDashboard, Building2, CalendarCheck, LogOut, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock user interface - replace with your actual auth context or session type
interface User {
  name: string;
  email: string;
  image?: string;
}

interface NavbarProps {
  user?: User | null; // Pass user object when authenticated, null/undefined when guest
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/studios", label: "Explore Studios" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About Us" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left: Brand Logo & Icon */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Camera className="h-5 w-5 stroke-[2.2]" />
          </div>
          <span>Studio<span className="text-primary">Space</span></span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 transition-colors hover:text-foreground/80",
                  active ? "text-foreground font-semibold" : "text-muted-foreground"
                )}
              >
                {link.label}
                {/* Active Route Indicator */}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Auth Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            /* Authenticated State */
            <DropdownMenu>
              <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2"
                />
              }
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.name?.slice(0, 2).toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  render={<Link href="/dashboard" className="flex items-center cursor-pointer" />}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/studios/new" className="flex items-center cursor-pointer" />}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Studio
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/my-listings" className="flex items-center cursor-pointer" />}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  My Studio Listings
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/my-bookings" className="flex items-center cursor-pointer" />}
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Unauthenticated State */
            <div className="flex items-center gap-2">
              <Button variant="ghost" render={<Link href="/login" />}>
                Login
              </Button>
              <Button render={<Link href="/register" />}>
                Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b bg-background px-4 pb-6 pt-2 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-1 text-sm font-medium pt-1">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-accent">Dashboard</Link>
                  <Link href="/studios/new" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-accent">Add New Studio</Link>
                  <Link href="/my-listings" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-accent">My Studio Listings</Link>
                  <Link href="/my-bookings" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-accent">My Bookings</Link>
                  <button onClick={() => { onLogout?.(); setMobileMenuOpen(false); }} className="px-3 py-2 rounded-md text-left text-destructive hover:bg-destructive/10">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Button
                  variant="outline"
                  render={<Link href="/login" onClick={() => setMobileMenuOpen(false)} />}
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  render={<Link href="/register" onClick={() => setMobileMenuOpen(false)} />}
                  className="w-full"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

