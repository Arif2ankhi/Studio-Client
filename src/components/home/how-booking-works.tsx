import { Clapperboard, Search, Timer, Zap } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Discover Spaces",
    description:
      "Filter verified studios by category, location, gear and hourly rate until the right room stands out.",
    icon: Search,
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    description:
      "Pick the exact hours you need — pricing updates live, with no minimum-day surprises.",
    icon: Timer,
  },
  {
    step: "03",
    title: "Book Instantly",
    description:
      "Confirm and pay in one go. Your booking, access details and host contact land in your inbox.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Create & Produce",
    description:
      "Show up, plug in and make the work. The studio is prepped, insured and ready for call time.",
    icon: Clapperboard,
  },
] as const;

/** How Booking Works: the 4-step booking workflow. */
export function HowBookingWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-amber-600 uppercase dark:text-amber-400">
          How booking works
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          From search to shoot in four steps
        </h2>
        <p className="mt-3 text-muted-foreground">
          No back-and-forth emails, no deposit chasing. Book a professional
          studio the same way you book a flight.
        </p>
      </div>

      <ol className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* dashed connector behind the step cards (desktop only) */}
        <div
          aria-hidden="true"
          className="absolute top-7 right-[12%] left-[12%] hidden border-t border-dashed border-border lg:block"
        />

        {STEPS.map(({ step, title, description, icon: Icon }) => (
          <li
            key={step}
            className="relative flex flex-col gap-3 rounded-2xl bg-card p-5 ring-1 ring-foreground/10"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Icon className="size-6" />
              </span>
              <span className="font-heading text-3xl font-bold text-foreground/10">
                {step}
              </span>
            </div>
            <h3 className="font-heading text-base font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
