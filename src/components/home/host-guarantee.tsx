import Link from "next/link";
import { ArrowRight, BadgeCheck, Headset, ShieldCheck, Wrench } from "lucide-react";

const GUARANTEES = [
  {
    title: "Liability protection",
    description:
      "Every booking includes up to $2M in liability cover, so accidental damage never becomes a disaster.",
    icon: ShieldCheck,
  },
  {
    title: "Verified profiles",
    description:
      "Hosts are ID-checked and studios are inspected before going live — you always know who you're booking with.",
    icon: BadgeCheck,
  },
  {
    title: "Equipment safety",
    description:
      "Gear inventories are documented at check-in and check-out, with clear damage terms protecting both sides.",
    icon: Wrench,
  },
  {
    title: "24/7 host support",
    description:
      "Real humans on call around the clock — before, during and after your shoot, in every time zone.",
    icon: Headset,
  },
] as const;

/** Host Guarantee & Creator Support: platform assurances for both sides. */
export function HostGuarantee() {
  return (
    <section id="about" className="bg-zinc-950 text-white">
      <div className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-amber-400 uppercase">
              Host guarantee &amp; creator support
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Protected on both sides of the booking
            </h2>
            <p className="mt-4 text-zinc-400">
              StudioSpace backs every hour booked with insurance, verification
              and round-the-clock support — so hosts can rent confidently and
              creators can shoot without drama.
            </p>
            <Link
              href="/studios"
              className="mt-8 inline-flex h-9 items-center gap-1.5 rounded-lg bg-amber-500 px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
            >
              Host Your Space
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {GUARANTEES.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-400">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
