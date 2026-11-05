import Link from "next/link";
import type { ComponentProps } from "react";
import { Camera, ArrowUp } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Social brand icons (inline SVG — modern lucide-react dropped brand  */
/* icons such as Instagram/YouTube/Twitter, so these are hand-built    */
/* to keep the footer dependency-free).                                */
/* ------------------------------------------------------------------ */

function XIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function InstagramIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.4" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29.4 29.4 0 0 0 2 12a29.4 29.4 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29.4 29.4 0 0 0 22 12a29.4 29.4 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2Z" />
    </svg>
  );
}

function LinkedinIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface SocialLink {
  label: string;
  /** Replace with the project's real handles when known. */
  href: string;
  Icon: (props: ComponentProps<"svg">) => React.JSX.Element;
}

// TODO: swap these placeholder handles for the project's real profiles.
const SOCIALS: SocialLink[] = [
  { label: "Follow StudioSpace on X", href: "https://x.com/studiospace", Icon: XIcon },
  { label: "Follow StudioSpace on Instagram", href: "https://instagram.com/studiospace", Icon: InstagramIcon },
  { label: "Watch studio tours on YouTube", href: "https://youtube.com/@studiospace", Icon: YoutubeIcon },
  { label: "Connect with StudioSpace on LinkedIn", href: "https://linkedin.com/company/studiospace", Icon: LinkedinIcon },
];

const LINK_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Browse studios", href: "/studios" },
      { label: "Featured spaces", href: "/#featured" },
      { label: "Categories", href: "/#categories" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    heading: "For hosts",
    links: [
      { label: "List your studio", href: "/add-studio" },
      { label: "Host guarantee", href: "/#about" },
      { label: "My listings", href: "/my-listings" },
      { label: "My bookings", href: "/my-bookings" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign in", href: "/signin" },
      { label: "Create account", href: "/registration" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Become a host", href: "/#become-a-host" },
    ],
  },
] as const;

/* ------------------------------------------------------------------ */

/** Site-wide footer: brand, socials, sitemap columns and legal bar. */
export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-zinc-950 text-zinc-400">
      {/* soft amber glow, static utility classes (no client JS) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/4 size-96 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr] md:gap-10">
          {/* Brand + socials */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-amber-500 text-zinc-950">
                <Camera className="size-5" />
              </span>
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                Studio<span className="text-amber-400">Space</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Book verified photo studios, film stages, podcast lounges, music
              suites and art workshops by the hour — or earn from your own
              space by hosting it with us.
            </p>

            <ul className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex size-9 items-center justify-center rounded-full text-zinc-400 ring-1 ring-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-500 hover:text-zinc-950 hover:ring-amber-500"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {LINK_COLUMNS.map((column) => (
              <div key={column.heading}>
                <h3 className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
                  {column.heading}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-amber-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Legal bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} StudioSpace, Inc. All rights reserved.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-amber-400"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
