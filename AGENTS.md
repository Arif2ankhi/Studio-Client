<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# studio-client

Next.js 16 App Router frontend (single route so far). No backend and no env vars — no `fetch()`, `process.env`, `.env*` files, or API routes anywhere.

`src/app/page.tsx` is still the untouched create-next-app starter (same for `README.md`, which points at a non-existent `app/page.tsx` — source lives under `src/`). The actual code so far is the component kit (`src/components/ui/`), the Shiki highlighter (`src/lib/highlighter.tsx` + `src/hooks/use-highlighted-code.ts`), and `src/app/globals.css`.

## Commands (verified)

- `npm run dev` — Turbopack dev server, port 3000. Also (re)generates `AGENTS.md` block above.
- `npm run build` / `npm run start`
- `npm run lint` — ESLint 9 flat config, runs with no args. Currently reports **2 pre-existing errors** (`react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`) — don't assume you introduced them.
- No test runner and no `typecheck` script exist. Typecheck with `npx tsc --noEmit` (passes clean today). Do not invent test commands; there is no CI workflow either.
- **Typecheck on a fresh clone fails until `npm run dev` or `npm run build` has run once**: `next-env.d.ts` imports `.next/types/routes.d.ts`, and the global `PageProps` / `LayoutProps` types used by `src/app/layout.tsx` live there.

Verify changes with: `npm run lint` → `npx tsc --noEmit`.

## Toolchain quirks

- Next.js 16.4.3 + React 19.3, TypeScript `strict`. Bundled docs: `node_modules/next/dist/docs/` (see block above).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — no hand-rolled `memo`/`useMemo`/`useCallback` needed.
- Tailwind CSS v4: **no `tailwind.config.*`**. Theme tokens live in `src/app/globals.css` (`@theme inline` + CSS variables); dark mode is the `.dark` class via `@custom-variant`. CSS is served through the Turbopack loader rule in `next.config.ts` — don't reintroduce a JS Tailwind config. `globals.css` also imports `tw-animate-css` and `shadcn/tailwind.css` (from the `shadcn` dependency); base-nova components rely on them.
- Path alias `@/*` → `src/*`.
- Entrypoints: `src/app/layout.tsx` (root layout, Geist fonts) and `src/app/page.tsx`.

## Code highlighting (hand-written)

- Shiki runs on the core API with the JS regex engine. Supported languages are a **hard-coded `languages` map plus `aliases`** in `src/lib/highlighter.tsx`; an unlisted language silently renders unhighlighted (the hook returns `null`, fallback is plain text) — add an entry there to support a new one.
- `src/hooks/use-highlighted-code.ts` intentionally re-tokenizes only newly completed lines, carrying Shiki grammar state forward for streaming output. Don't "simplify" it into re-highlighting the whole buffer each render.

## shadcn / UI conventions

- `src/components/ui/*` is shadcn-generated (CLI v4, style `base-nova`, config in `components.json`). Add or update with `npx shadcn add <component>`; treat these files as generated — hand-edits will be overwritten by the next `add`. All 63 local files are currently **byte-identical to registry output**; check drift with `npx shadcn add <component> --dry-run` (prints `skip (identical)` / `--diff` / `--view`).
- `cn` is the npm `cn` package: import as `import { cn } from "cn"`. It is **not** the usual `clsx` + `tailwind-merge` combo (`src/lib/utils.ts` only re-exports it).
- Base primitives are `@base-ui/react`, not Radix. Icons: `lucide-react`.
