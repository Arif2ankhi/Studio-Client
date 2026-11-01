// "use client"
// import { useRouter } from "next/navigation"
// import * as React from "react"
// import {
//   Aperture,
//   CalendarDays,
//   ChevronDown,
//   CirclePlus,
//   Heart,
//   LayoutGrid,
//   LogOut,
// } from "lucide-react"
// import Link from "next/link";
// import { cn } from "cn"

// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ThemeToggle } from "@/components/theme-toggle"
// |

// const NAV_LINKS: { label: string; href: string; active?: boolean }[] = [
//   { href: "/",label: "Home", active: true },
//   {href:"/add-studio", label:"Add New Studio"},
//   {href:"/studios", label:"Explore Studios"},  
//   { href: "#how-it-works", label: "How It Works" },
//   {  href: "#about", label: "About Us"}
// ]

// // Demo-only signed-in user; this project has no auth backend yet.
// // const DEMO_USER = {
// //   name: "Alex",
// //   fullName: "Alex Rivera",
// //   email: "alex.creator@studiospace.io",
// //   initials: "AR",
// // }

// export function Navbar() {
//   const router = useRouter();
//   // const [user, setUser] = React.useState<typeof DEMO_USER | null>(null)
//   // const [user, setUser] = React.useState<typeof DEMO_USER | null>(DEMO_USER) // Defaulted to signed in for demovoa

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
//       <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
//         {/* Brand */}
//         <a href="#" className="flex shrink-0 items-center gap-2.5">
//           <span className="relative flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-orange-500">
//             <Aperture className="size-5 text-zinc-900" />
//             <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
//           </span>
//           <span className="flex flex-col leading-none">
//             <span className="text-lg font-bold tracking-tight">
//               Studio <span className="text-amber-500">Space</span>
//             </span>
//             <span className="mt-1 text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
//               CREATIVE MARKETPLACE
//             </span>
//           </span>
//         </a>

//         {/* Primary nav */}
//         <nav className="hidden items-center gap-1 md:flex">
//           {NAV_LINKS.map((link) => (
//             <a
//               key={link.label}
//               href={link.href}
//               aria-current={link.active ? "page" : undefined}
//               className={cn(
//                 "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
//                 link.active
//                   ? "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400"
//                   : "text-muted-foreground hover:bg-muted hover:text-foreground"
//               )}
//             >
//               {link.label}
//             </a>
//           ))}
//         </nav>

//         {/* Actions */}
//         <div className="flex shrink-0 items-center gap-2">
//           <ThemeToggle />
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger
//                 type="button"
//                 className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pl-1 pr-2.5 text-sm font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
//               >
//                 <Avatar size="sm">
//                   <AvatarFallback className="bg-amber-500/15 font-semibold text-amber-700 dark:text-amber-400">
//                     {user?.initials}
//                   </AvatarFallback>
//                 </Avatar>
//                 {user?.name}
//                 <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-data-popup-open:rotate-180" />
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-64 min-w-64 py-1.5">
//   {/* Signed in user header */}
//   <div className="px-2.5 pt-1 pb-2">
//     <p className="text-xs text-muted-foreground">Signed in as</p>
//     <p className="text-sm font-semibold">{user.fullName}</p>
//     <p className="truncate text-xs text-muted-foreground">{user.email}</p>
//   </div>
  
//   <DropdownMenuSeparator />

//   {/* 1. Add New Studio -> Routes to /add-studio */}
//   <DropdownMenuItem
//     onClick={() => router.push("/add-studio")}
//     className="gap-2.5 bg-amber-50 px-2.5 py-2 text-amber-600 hover:bg-amber-100 hover:text-amber-700 focus:bg-amber-100! focus:text-amber-700! dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20 cursor-pointer"
//   >
//     <CirclePlus className="size-4 shrink-0" />
//     <span>Add New Studio</span>
//   </DropdownMenuItem>

//   {/* 2. My Studio Listings -> Routes to /studios */}
//   <DropdownMenuItem
//     onClick={() => router.push("/studios")}
//     className="gap-2.5 px-2.5 py-2 cursor-pointer"
//   >
//     <LayoutGrid className="size-4 shrink-0" />
//     <span>My Studio Listings</span>
//   </DropdownMenuItem>

//   {/* 3. My Bookings */}
//   <DropdownMenuItem
//     onClick={() => router.push("/my-bookings")}
//     className="gap-2.5 px-2.5 py-2 cursor-pointer"
//   >
//     <CalendarDays className="size-4 shrink-0" />
//     <span>My Bookings</span>
//   </DropdownMenuItem>

//   {/* 4. Saved Wishlist */}
//   <DropdownMenuItem
//     onClick={() => router.push("/wishlist")}
//     className="gap-2.5 px-2.5 py-2 cursor-pointer"
//   >
//     <Heart className="size-4 shrink-0" />
//     <span>Saved Wishlist</span>
//   </DropdownMenuItem>

//   <DropdownMenuSeparator />

//   {/* Sign Out Button */}
//   <DropdownMenuItem
//     variant="destructive"
//     onClick={() => setUser(null)}
//     className="gap-2.5 bg-destructive/10 px-2.5 py-2 font-medium hover:bg-destructive/15 focus:bg-destructive/15! dark:bg-destructive/20 cursor-pointer"
//   >
//     <LogOut className="size-4 shrink-0" />
//     <span>Sign Out</span>
//   </DropdownMenuItem>
// </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <>

//             <Link href="/signin">
//               <Button variant="ghost" size="sm" onClick={() => setUser(DEMO_USER)}>
//                 Sign In

//               </Button>
//             </Link>


//                 <Link href="/registration">
//                 <Button
//                 size="sm"
//                 onClick={() => setUser(DEMO_USER)}
//                 className="bg-amber-500 text-white hover:bg-amber-600"
//               >
//                 Register
//               </Button>
                
//                 </Link>

              
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   )
// }

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Aperture,
  CalendarDays,
  ChevronDown,
  CirclePlus,
  Heart,
  LayoutGrid,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

// Type definition for authenticated user
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  initials?: string;
}

const NAV_LINKS = [
  { href: "/", label: "Home", active: true },
  { href: "/add-studio", label: "Add New Studio" },
  { href: "/studios", label: "Explore Studios" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About Us" },
];

export function Navbar() {
  const router = useRouter();

  // Replace this state with your global Auth state or Session (e.g., NextAuth, BetterAuth, or Context)
  const [user, setUser] = useState<User | null>(null);

  // Helper to extract initials if user has no avatar image
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = () => {
    // Perform your logout API call or session clear logic here
    setUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
            <Aperture className="size-5 text-zinc-900" />
            <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">
              Studio <span className="text-amber-500">Space</span>
            </span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
              CREATIVE MARKETPLACE
            </span>
          </span>
        </Link>

        {/* Primary Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                link.active
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions Section */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          {/* Conditional Auth Rendering */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-3 text-sm font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="h-7 w-7">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback className="bg-amber-500/15 font-semibold text-amber-700 dark:text-amber-400 text-xs">
                    {user.initials || getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 min-w-64 py-1.5">
                {/* User Info Header */}
                <div className="px-3 pt-1.5 pb-2">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>

                <DropdownMenuSeparator />

                {/* 1. Add New Studio */}
                <DropdownMenuItem
                  onClick={() => router.push("/add-studio")}
                  className="gap-2.5 bg-amber-50 px-2.5 py-2 text-amber-600 hover:bg-amber-100 hover:text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20 cursor-pointer font-medium"
                >
                  <CirclePlus className="size-4 shrink-0" />
                  <span>Add New Studio</span>
                </DropdownMenuItem>

                {/* 2. My Studio Listings */}
                <DropdownMenuItem
                  onClick={() => router.push("/studios")}
                  className="gap-2.5 px-2.5 py-2 cursor-pointer"
                >
                  <LayoutGrid className="size-4 shrink-0" />
                  <span>My Studio Listings</span>
                </DropdownMenuItem>

                {/* 3. My Bookings */}
                <DropdownMenuItem
                  onClick={() => router.push("/my-bookings")}
                  className="gap-2.5 px-2.5 py-2 cursor-pointer"
                >
                  <CalendarDays className="size-4 shrink-0" />
                  <span>My Bookings</span>
                </DropdownMenuItem>

                {/* 4. Saved Wishlist */}
                <DropdownMenuItem
                  onClick={() => router.push("/wishlist")}
                  className="gap-2.5 px-2.5 py-2 cursor-pointer"
                >
                  <Heart className="size-4 shrink-0" />
                  <span>Saved Wishlist</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Sign Out Action */}
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="gap-2.5 bg-destructive/10 text-destructive px-2.5 py-2 font-medium hover:bg-destructive/20 cursor-pointer"
                >
                  <LogOut className="size-4 shrink-0" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Logged Out State: Sign In and Register Buttons */
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/registration">
                <Button size="sm" className="bg-amber-500 text-white hover:bg-amber-600">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}