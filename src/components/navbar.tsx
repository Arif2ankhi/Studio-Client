"use client"

import * as React from "react"
import {
  Aperture,
  CalendarDays,
  ChevronDown,
  CirclePlus,
  Heart,
  LayoutGrid,
  Link,
  LogOut,
} from "lucide-react"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV_LINKS: { label: string; href: string; active?: boolean }[] = [
  { label: "Home", href: "#", active: true },
  { label: "Explore Studios", href: "#explore" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
]

// Demo-only signed-in user; this project has no auth backend yet.
const DEMO_USER = {
  name: "Alex",
  fullName: "Alex Rivera",
  email: "alex.creator@studiospace.io",
  initials: "AR",
}

export function Navbar() {
  const [user, setUser] = React.useState<typeof DEMO_USER | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <a href="#" className="flex shrink-0 items-center gap-2.5">
          <span className="relative flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-orange-500">
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
        </a>

        {/* Primary nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                link.active
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pl-1 pr-2.5 text-sm font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-amber-500/15 font-semibold text-amber-700 dark:text-amber-400">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                {user.name}
                <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-data-popup-open:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 min-w-64 py-1.5">
                <div className="px-2.5 pt-1 pb-2">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-semibold">{user.fullName}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <Link href="/add-studio">
                 <DropdownMenuItem
                  className="gap-2.5 bg-amber-50 px-2.5 py-2 text-amber-600 hover:bg-amber-100 hover:text-amber-700 focus:bg-amber-100! focus:text-amber-700! dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20 dark:focus:bg-amber-500/20! dark:focus:text-amber-300!"
                >
                  <CirclePlus />
                  Add New Studio
                </DropdownMenuItem>

                </Link>
               
                <DropdownMenuItem className="gap-2.5 px-2.5 py-2">
                  <LayoutGrid />
                  My Studio Listings
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2.5 px-2.5 py-2">
                  <CalendarDays />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2.5 px-2.5 py-2">
                  <Heart />
                  Saved Wishlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setUser(null)}
                  className="gap-2.5 bg-destructive/10 px-2.5 py-2 font-medium hover:bg-destructive/15 focus:bg-destructive/15! dark:bg-destructive/20"
                >
                  <LogOut />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setUser(DEMO_USER)}>
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => setUser(DEMO_USER)}
                className="bg-amber-500 text-white hover:bg-amber-600"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
