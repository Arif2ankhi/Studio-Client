import { Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  /** Person's display name. */
  name: string;
  /** Role/context line, e.g. what they use StudioSpace for. */
  role: string;
  rating: number;
  /** Two-letter monogram shown in the avatar chip. */
  initials: string;
  /** Tailwind chip colors — static strings so Tailwind can see them. */
  accentClass: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Booked a podcast lounge for a three-episode run. Every mic, stand and cable was exactly as listed — check-in took two minutes.",
    name: "Maya Okafor",
    role: "Podcast producer",
    rating: 5,
    initials: "MO",
    accentClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    quote:
      "My photography studio sat empty most weekdays. Now it books four days a week and StudioSpace handles the payments and vetting.",
    name: "Daniel Reyes",
    role: "Studio host, Brooklyn",
    rating: 5,
    initials: "DR",
    accentClass: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  },
  {
    quote:
      "The cyclorama bay we rented for a campaign shoot was verified, insured and even had lighting gear we could add at checkout.",
    name: "Sofia Lindqvist",
    role: "Creative director",
    rating: 4,
    initials: "SL",
    accentClass: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  },
];

/** What creators & hosts say: social proof pulled from both sides of the marketplace. */
export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-amber-600 uppercase dark:text-amber-400">
            Testimonials
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by creators, trusted by hosts
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Real bookings, real studios — here is what people say after the
            lights come down.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li
              key={testimonial.initials}
              className="flex flex-col rounded-2xl bg-card p-6 ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5"
            >
              <Quote className="size-6 text-amber-500" aria-hidden="true" />

              <div
                className="mt-3 flex items-center gap-0.5"
                aria-label={`Rated ${testimonial.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={
                      index < testimonial.rating
                        ? "size-4 fill-amber-400 text-amber-400"
                        : "size-4 text-muted-foreground/40"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{testimonial.quote}”
              </blockquote>

              <figure className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span
                  aria-hidden="true"
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${testimonial.accentClass}`}
                >
                  {testimonial.initials}
                </span>
                <figcaption>
                  <p className="font-heading text-sm font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
