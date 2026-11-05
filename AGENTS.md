<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# studio-client

Next.js 16 App Router frontend for "StudioSpace", a studio-rental marketplace. Frontend of a two-repo project: a separate Express + MongoDB backend (repo & live links in `README.md`) backs every page. Server-side rendering happens here, but all studio/booking data flows through that backend.

## Data flow (backend = separate repo)

- Every page fetches from `${process.env.NEXT_PUBLIC_API_URL}` (`.env` default: `http://localhost:8000`). Endpoints used: `/studios`, `/studio/:id` (GET/PUT/DELETE), `/add-studio` (POST), `/my-studios?email=`, `/my-bookings?email=`, `/bookings` (POST), `/bookings/:id/cancel`, `/featured-studios`.
- Listings and bookings are keyed by the signed-in user's **email**; several pages fall back to hardcoded demo emails when nobody is signed in.
- Home page is a server component (`revalidate = 60`) streaming `FeaturedStudios` behind `<Suspense>` (skeleton: `src/components/home/featured-studios-skeleton`). It calls `getFeaturedStudios` in **`src/lib/studios.ts`** → REST `/featured-studios` with `cache: "no-store"`, falling back to `DEMO_STUDIOS` (`src/lib/demo-studios.ts`) when unreachable/empty.
- The only Next.js API route is the better-auth catch-all `src/app/api/auth/[...all]/route.ts`. Don't add data endpoints here — pages hit the external backend.
- `src/lib/mongodb.ts` (direct Mongo reads, `MONGODB_DB` default `studio-space`) is currently imported by nothing. Do not wire it back in unless asked.

## Auth (better-auth)

- Server config `src/lib/auth.ts` (email+password + Google OAuth, MongoDB adapter); client `src/lib/auth-client.ts` (`baseURL` from `BETTER_AUTH_URL`, JWT plugin). Auth endpoints mount at `/api/auth/[...all]`.
- Auth data lives in DB `studiospace` (hardcoded in `auth.ts`), separate from the backend's app data — don't assume one database.
- Token helpers: `src/lib/getTokenFromClient.ts` (`authClient.token()`, used by `studios/[id]` for authorized PUT/DELETE) and `src/lib/getTokenFromServer.ts` (server-side `auth.api.getToken`); the server helper is currently imported-but-unused there.
- **Route protection lives in `src/proxy.ts`** — Next 16 renamed `middleware.ts` to `proxy.ts`. Its matcher has drifted from real routes (`/my-listing` vs actual `/my-listings`) and the handler returns `undefined` when authenticated. Don't assume protected routes are truly enforced; if touching auth flow, check both `proxy.ts` and per-page behavior.

## Commands (verified)

- `npm run dev` — Turbopack dev server, port 3000. Also (re)generates the agent-rules block above.
- `npm run build` / `npm run start`
- `npm run lint` — ESLint 9 flat config, runs with no args. **Baseline is not clean: 5 pre-existing errors** — `react-hooks/set-state-in-effect` at `src/components/ui/carousel.tsx` (:98), `src/hooks/use-mobile.ts` (:14), `src/components/EditStudioDialog.tsx` (:87), and `react/no-unescaped-entities` at `src/app/studios/page.tsx` (:169, twice). Plus 14 warnings (unused imports/vars, `<img>`). Compare failures against this list rather than assuming clean or newly-broken.
- No test runner and no `typecheck` script, but `npx tsc --noEmit` currently **passes clean**. If it fails after a fresh clone, run `npm run dev` or `npm run build` once first: `next-env.d.ts` imports `.next/types/routes.d.ts`, where the global `PageProps`/`LayoutProps` types live. `.next/`, `next-env.d.ts`, and `*.tsbuildinfo` are gitignored generated artifacts — don't commit or hand-edit them.

Verify changes with: `npm run lint` → `npx tsc --noEmit`, comparing failures against the baseline above.

## Traps

- **Base UI, not Radix — there is no `asChild`.** shadcn base-nova components wrap `@base-ui/react`; compose with the `render` prop or by nesting children directly (see `src/components/navbar.tsx` for correct usage).
- **Two Navbar components**: `src/components/navbar.tsx` (lowercase) is the live one, wired to the real session (`authClient.useSession()`, header avatar/sign-out). `src/components/shared/Navbar.tsx` is mock-auth and imported by nothing. `layout.tsx` already renders Navbar + `shared/Footer` — wiring another header would double-render.
- **Toast mounts are odd**: `layout.tsx` renders react-toastify's `<ToastContainer />` **and two** `<Toaster />` from react-hot-toast (duplicated — status quo, don't silently "fix"). Pages use `react-hot-toast`; `sonner` is also a dependency but not mounted. Don't assume a call from one lib appears in every mounted container.
- **Two `Studio` types**: the canonical one is `@/lib/types` — a loose superset (`_id?`/`id?`, `image`/`imageUrl`, `rate`/`hourlyRate`) matching the backend's evolving document shape. `src/lib/types/studio.ts` is stricter and unreferenced. Use `@/lib/types`.
- **Dead siblings coexist with live code**: `src/lib/featured.ts` is an unused near-duplicate of `src/lib/studios.ts`; `src/components/MyBooking Card.tsx` (filename contains a space) is unreferenced. Most pages are large `"use client"` files with big blocks of commented-out dead code at the top — that's their status quo, not something to clean up unprompted.
- **Theme is hand-rolled, not next-themes**: `src/hooks/use-theme.ts` is an external store (`useSyncExternalStore` reading the `.dark` class off `<html>`, persisting to `localStorage["studio-theme"]`), toggled by `src/components/theme-toggle.tsx`. There is no pre-hydration init script in `layout.tsx`, so the page flashes from light on reload — deliberate-looking state, not a bug to silently "fix".
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — no hand-rolled `memo`/`useMemo`/`useCallback` needed.
- Tailwind CSS v4: **no `tailwind.config.*`**. Theme tokens live in `src/app/globals.css` (`@theme inline` + CSS variables); dark mode is the `.dark` class via `@custom-variant`; CSS is served through the Turbopack loader rule in `next.config.ts`. Don't reintroduce a JS Tailwind config.
- `next.config.ts` allows `images.remotePatterns` hostname `**` (any https host) — external CDN images paste straight in.
- Path alias `@/*` → `src/*`. Entrypoints: `src/app/layout.tsx` and `src/app/page.tsx`.

## shadcn / UI kit

- `src/components/ui/*` is shadcn-generated (CLI v4, style `base-nova`, config in `components.json`). Treat as generated — hand-edits are overwritten by the next `npx shadcn add <component>`. Verify drift with `npx shadcn add <component> --dry-run` (prints `skip (identical)` or a `--diff`).
- The code-highlighting files are also registry-generated (owned by the `code-block` component): `src/lib/highlighter.tsx` and `src/hooks/use-highlighted-code.ts`. The hook deliberately re-tokenizes only newly completed lines, carrying Shiki grammar state forward — don't "simplify" it into re-highlighting the whole buffer. An unlisted language silently renders plain text; add it to the `languages`/`aliases` maps in `highlighter.tsx` to support it.
- `cn` is the npm `cn` package: `import { cn } from "cn"` (also re-exported from `@/lib/utils`). It is **not** the usual `clsx` + `tailwind-merge` combo.
