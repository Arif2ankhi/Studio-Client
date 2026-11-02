<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# studio-client

Next.js 16 App Router frontend for "StudioSpace", a studio-rental marketplace. Two separate data flows:

- **External REST backend, hard-coded at `http://localhost:8000`** (a separate project — not this repo) backs every page except the home page. Endpoints used: `/studios`, `/studio/:id` (GET/PUT/DELETE), `/add-studio` (POST), `/my-studios?email=`, `/my-bookings?email=`, `/bookings` (POST), `/bookings/:id/cancel`. Those URLs are literal strings in `src/app/*` and `src/components/*` — no env var, no proxy.
- **Direct MongoDB reads (server-side)** only for the home page's featured studios: `src/lib/studios.ts` → `src/lib/mongodb.ts` (`.find().sort().limit(6)`, 1.5 s server-selection timeout, falls back to `src/lib/demo-studios.ts` when the DB is unreachable/empty). Home page sets `revalidate = 60` and streams the grid behind `<Suspense>` (skeleton: `src/components/home/featured-studios-skeleton`).

The only Next.js API route is `src/app/api/auth/[...all]/route.ts` (better-auth catch-all). Don't add data endpoints here assuming the pages consume them — they hit `localhost:8000`.

Routes: `/` (server), `/studios`, `/studios/[id]`, `/add-studio`, `/my-bookings`, `/my-listings`, `/signin`, `/registration`. Most pages are large `"use client"` components containing big blocks of commented-out dead code at the top — that's their status quo, not something to clean up unprompted.

## Auth (better-auth)

- Server config `src/lib/auth.ts` (email+password + Google OAuth, MongoDB adapter); client `src/lib/auth-client.ts` (`baseURL` from `BETTER_AUTH_URL`). Auth endpoints mount at `/api/auth/[...all]`.
- Env keys in `.env`: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- **Two different databases**: `auth.ts` hardcodes `client.db("studiospace")`; `src/lib/mongodb.ts` uses `MONGODB_URI`/`MONGODB_DB` (default `studio-space`). Auth data and studio data do not live in the same DB out of the box.

## Commands (verified)

- `npm run dev` — Turbopack dev server, port 3000. Also (re)generates the agent-rules block above.
- `npm run build` / `npm run start`
- `npm run lint` — ESLint 9 flat config, runs with no args. **Baseline is not clean: 6 pre-existing errors** — `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` (:98), `src/hooks/use-mobile.ts` (:14), `src/components/EditStudioDialog.tsx` (:80), and `react/no-unescaped-entities` in `src/app/my-listings/page.tsx` (:207) and `src/app/studios/page.tsx` (:169, twice). ~19 warnings (unused imports, `<img>`). Compare the list against this baseline rather than assuming either clean or newly-broken.
- No test runner and no `typecheck` script. `npx tsc --noEmit` currently **fails with 14 pre-existing type errors** in the newer pages/components (add-studio, my-bookings, studios, studios/[id], EditStudioDialog — mostly `Studio`-shape mismatches, Base UI Select passing `null`, one `asChild`, and a broken import of `@/components/MyBookingCard`, whose real file is `src/components/MyBooking Card.tsx` — **space in the filename**). Don't chase "typecheck green"; diff against the baseline list. (`README.md` is still the default create-next-app file. No CI workflow — don't invent test commands.)
- **Typecheck on a fresh clone fails until `npm run dev` or `npm run build` has run once**: `next-env.d.ts` imports `.next/types/routes.d.ts`; the global `PageProps`/`LayoutProps` types live there. Both `next-env.d.ts` and `*.tsbuildinfo` are gitignored generated artifacts — don't commit or hand-edit them.

Verify changes with: `npm run lint` → `npx tsc --noEmit`, comparing failures against the baselines above.

## Traps

- **Base UI, not Radix — there is no `asChild`.** The shadcn base-nova components wrap `@base-ui/react`; compose with the `render` prop or by nesting children directly (see `src/components/navbar.tsx` for correct usage). `src/components/EditStudioDialog.tsx` still uses `asChild` — part of the tsc-error baseline; fix it to `render`-style rather than adding `asChild` support to `ui/*`.
- **Two distinct Navbar components** — `src/components/navbar.tsx` (lowercase) is the live one in `layout.tsx` and is wired to the real auth session (`authClient.useSession()`, header avatar/sign-out); `src/components/shared/Navbar.tsx` is mock-auth and rendered by no route. `layout.tsx` already renders Navbar + `shared/Footer` — re-wiring anything else would double-render headers.
- **Three toast libraries coexist**: `react-hot-toast` (used by most pages), `react-toastify` (its `<ToastContainer />` is the one rendered in `layout.tsx`), and `sonner`. Don't assume `toast.success` from one lib shows up in the rendered container.
- **Theme is hand-rolled, not next-themes**: `src/hooks/use-theme.ts` is an external store (`useSyncExternalStore` reading the `.dark` class off `<html>`, persisting to `localStorage["studio-theme"]`), toggled by `src/components/theme-toggle.tsx`. The pre-hydration init script in `layout.tsx` that applies the persisted theme on load is **currently commented out** — its absence is deliberate-looking state, not a bug to silently re-add or re-delete.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — no hand-rolled `memo`/`useMemo`/`useCallback` needed.
- Tailwind CSS v4: **no `tailwind.config.*`**. Theme tokens live in `src/app/globals.css` (`@theme inline` + CSS variables); dark mode is the `.dark` class via `@custom-variant`; CSS is served through the Turbopack loader rule in `next.config.ts`. `globals.css` also imports `tw-animate-css` and `shadcn/tailwind.css` (from the `shadcn` dependency). Don't reintroduce a JS Tailwind config.
- Path alias `@/*` → `src/*`. Entrypoints: `src/app/layout.tsx` and `src/app/page.tsx`. Bundled Next.js docs: `node_modules/next/dist/docs/` (see top block). `next.config.ts` also allows `images.remotePatterns` for hostname `**` (any https host).

## shadcn / UI kit

- `src/components/ui/*` is shadcn-generated (CLI v4, style `base-nova`, config in `components.json`). Treat as generated — hand-edits are overwritten by the next `npx shadcn add <component>`. Files check out byte-identical to registry output; verify drift with `npx shadcn add <component> --dry-run` (prints `skip (identical)` or a `--diff`).
- The code-highlighting files are also registry-generated (owned by the `code-block` component): `src/lib/highlighter.tsx` and `src/hooks/use-highlighted-code.ts`. The hook deliberately re-tokenizes only newly completed lines, carrying Shiki grammar state forward — don't "simplify" it into re-highlighting the whole buffer. An unlisted language silently renders plain text; add it to the `languages`/`aliases` maps in `highlighter.tsx` to support it.
- `cn` is the npm `cn` package: `import { cn } from "cn"` (also re-exported from `@/lib/utils`). It is **not** the usual `clsx` + `tailwind-merge` combo.
- Icons: `lucide-react`.
