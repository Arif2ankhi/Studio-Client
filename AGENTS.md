<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# studio-client

Next.js 16 App Router frontend for "StudioSpace", a studio-rental marketplace. The home page (`src/app/page.tsx`) is composed of `src/components/home/*`: a Swiper.js hero slider (3 slides, client component), a dynamic Featured Studios grid, Browse by Categories, How Booking Works and Host Guarantee sections. Still no backend/API routes — but `src/lib/studios.ts` queries MongoDB **server-side** (driver, `.find().sort().limit(6)`) via `src/lib/mongodb.ts`, reading `process.env.MONGODB_URI`/`MONGODB_DB` (only place env vars are used; defaults to a local `mongodb://127.0.0.1:27017/studio-space`) and falling back to `src/lib/demo-studios.ts` when the DB is unreachable/empty. The home page sets `revalidate = 60`. (`README.md` is still the create-next-app default and points at a non-existent `app/` dir — source lives under `src/`.)

## Commands (verified)

- `npm run dev` — Turbopack dev server, port 3000. Also (re)generates the agent-rules block above.
- `npm run build` / `npm run start`
- `npm run lint` — ESLint 9 flat config, runs with no args. **Pre-existing: 2 errors** (`react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`) — don't assume you introduced them.
- No test runner and no `typecheck` script. Typecheck with `npx tsc --noEmit` (passes clean; the former 11 `asChild` errors in `src/components/shared/Navbar.tsx` were fixed to Base UI `render` style). Do not invent test commands; there is no CI workflow.
- **Typecheck on a fresh clone fails until `npm run dev` or `npm run build` has run once**: `next-env.d.ts` imports `.next/types/routes.d.ts`, and the global `PageProps` / `LayoutProps` types used by `src/app/layout.tsx` live there. Both `next-env.d.ts` and `*.tsbuildinfo` are gitignored generated artifacts — don't commit or hand-edit them.

Verify changes with: `npm run lint` → `npx tsc --noEmit`, comparing failures against the pre-existing lists above.

## Traps

- **Base UI, not Radix — there is no `asChild`.** The shadcn base-nova components wrap `@base-ui/react`; compose with the `render` prop or by nesting children directly (see `src/components/navbar.tsx` for correct usage). `src/components/shared/Navbar.tsx` was originally written with Radix conventions (`asChild` on Button/menu items, `forceMount` on menu content) and has been converted to `render`-style — keep it that way rather than adding `asChild` support to `ui/*`.
- **Two distinct Navbar components** — don't confuse them: `src/components/navbar.tsx` (lowercase, wired into `layout.tsx`, has `ThemeToggle`, demo sign-in) is the one that renders; `src/components/shared/Navbar.tsx` (mock-auth nav linking to routes that don't exist yet: `/studios`, `/login`, …) is currently rendered by no route (its `page.tsx` import was removed when the home page was rebuilt — re-wiring it to `page.tsx` would double-render a header since `layout.tsx` already provides one).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — no hand-rolled `memo`/`useMemo`/`useCallback` needed.
- Theme is hand-rolled, **not** next-themes: `src/hooks/use-theme.ts` is an external store (`useSyncExternalStore` reading the `.dark` class off `<html>`, persisting to `localStorage["studio-theme"]`), toggled by `src/components/theme-toggle.tsx`, and applied pre-hydration by an inline `beforeInteractive` script in `layout.tsx`. Keep that script, the `suppressHydrationWarning` on `<html>`, and the hook in sync.
- Tailwind CSS v4: **no `tailwind.config.*`**. Theme tokens live in `src/app/globals.css` (`@theme inline` + CSS variables); dark mode is the `.dark` class via `@custom-variant`. CSS is served through the Turbopack loader rule in `next.config.ts` — don't reintroduce a JS Tailwind config. `globals.css` also imports `tw-animate-css` and `shadcn/tailwind.css` (from the `shadcn` dependency); base-nova components rely on them.
- Path alias `@/*` → `src/*`. Entrypoints: `src/app/layout.tsx` (root layout, Geist fonts, Navbar, theme script) and `src/app/page.tsx`. Bundled Next.js docs: `node_modules/next/dist/docs/` (see top block).

## shadcn / UI kit

- `src/components/ui/*` is shadcn-generated (CLI v4, style `base-nova`, config in `components.json`). Treat as generated — hand-edits are overwritten by the next `npx shadcn add <component>`. All 63 files are currently byte-identical to registry output; check drift with `npx shadcn add <component> --dry-run` (prints `skip (identical)` / shows a `--diff`).
- **The code-highlighting files are also registry-generated** (owned by the `code-block` component): `src/lib/highlighter.tsx` and `src/hooks/use-highlighted-code.ts`. The hook deliberately re-tokenizes only newly completed lines, carrying Shiki grammar state forward for streaming output — don't "simplify" it into re-highlighting the whole buffer. Supported languages are the hard-coded `languages` map plus `aliases` in `highlighter.tsx`; an unlisted language silently renders unhighlighted (the hook returns `null`, fallback is plain text) — add an entry there to support a new one.
- `cn` is the npm `cn` package: import as `import { cn } from "cn"` (also re-exported from `@/lib/utils`). It is **not** the usual `clsx` + `tailwind-merge` combo.
- Icons: `lucide-react`.
