import Link from "next/link";
import { ArrowRight, Camera, CalendarClock, Wallet } from "lucide-react";

const HOST_STATS = [
  {
    value: "4 days/wk",
    label: "average weekday occupancy for hosts",
    icon: CalendarClock,
  },
  {
    value: "$1,900",
    label: "average monthly payout per space",
    icon: Wallet,
  },
  {
    value: "0",
    label: "listing fees — you only pay when you earn",
    icon: Camera,
  },
] as const;

/** Become a Host: closing CTA that turns browsing visitors into hosts. */
export function BecomeHostCta() {
  return (
    <section id="become-a-host" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 text-white sm:px-10 md:px-14 md:py-16">
          {/* soft amber glow, kept static so Tailwind can statically extract it */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-amber-500/20 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold tracking-wide text-amber-400 uppercase">
                For studio owners
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Have a space? Earn from it by the hour
              </h2>
              <p className="mt-4 max-w-xl text-zinc-400">
                List your studio once and StudioSpace brings you verified
                creators, insured bookings, and payouts without the back-and-forth.
                Publishing a listing takes less than ten minutes.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/add-studio"
                  className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-amber-500 px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
                >
                  List Your Studio
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/studios"
                  className="inline-flex h-11 items-center rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Browse Studios First
                </Link>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-1">
              {HOST_STATS.map(({ value, label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
                    <Icon className="size-5" />
                  </span>
                  <p className="text-sm text-zinc-400">
                    <span className="block text-lg font-bold text-white">
                      {value}
                    </span>
                    {label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
