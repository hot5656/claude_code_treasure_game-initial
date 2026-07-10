# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small single-page "Interactive Treasure Box Game" (React + TypeScript + Vite). The player clicks one of three
treasure chests; one hides treasure (+$100), the other two hide a skeleton (-$50). This repo is used as a teaching
example for Claude Code workflows (see README.md for the walkthrough of prompts/commands used to build it).

## Commands

- `npm install` — install dependencies
- `npm run dev` — runs client + server concurrently (`dev:client` = Vite on port 3000, `dev:server` =
  `node server/index.js` on port 4001, override with `PORT` env var) <!-- 2026-07-09 -->
- `npm run build` — production build, output goes to `build/` (not `dist/`, see `vite.config.ts`)
- `npm start` — run the Express server alone, serving the built `build/` output + API from one process
  <!-- 2026-07-09 -->

There is no test suite, no lint script, and no `tsconfig.json` in this repo — TypeScript is transpiled by
`@vitejs/plugin-react-swc` without a separate type-check step. Don't assume `npm test` or `npm run lint` exist.

## Architecture

- **`src/App.tsx`** owns game state (`boxes`, `score`, `gameEnded`) and renders the three chests. It now also owns
  auth flow state (`handleAuthenticated`, `handlePlayAsGuest`, `handleSignOut`), switching between `AuthScreen`
  and the game view. There is still no routing library — the auth/game switch is plain conditional rendering,
  and there is no state management library. <!-- updated 2026-07-09: previously described as having no other
  page-level component and no auth -->
- **`src/components/AuthScreen.tsx`** is the sign-in/sign-up screen: a shadcn `Tabs` card with a shared
  `AuthForm` (mode: `'signin' | 'signup'`) plus a "Play as Guest" option. On success it calls
  `onAuthenticated(session)`, passed down from `App.tsx`. <!-- added 2026-07-09 -->
- **`src/lib/api.ts`** is the API client: `signUp`/`signIn`/`signOut` hit `/api/auth/*`, `fetchMyScores`/
  `submitScore` hit `/api/scores*`. Session (`{ token, username }`) is persisted in `localStorage`
  (`getStoredSession`/`storeSession`/`clearSession`), not a cookie. <!-- added 2026-07-09 -->
- **`server/`** is an Express backend — this app is no longer purely frontend-only. <!-- added 2026-07-09 -->
  - `server/index.js` — routes: `POST /api/auth/signup|login|logout`, `GET /api/scores/me`,
    `POST /api/scores`; serves the Vite `build/` output directly in production.
  - `server/auth.js` — bcrypt password hashing (`bcryptjs`), token sessions via `crypto.randomBytes(32)`,
    `requireAuth` middleware.
  - `server/db.js` — `better-sqlite3`, WAL mode, file at `server/data.db`, tables `users`/`sessions`/`scores`.
- **`src/components/ui/`** is a shadcn/ui component library (Radix UI primitives + Tailwind). These files are
  generated/vendored; treat them as a library, not app code — prefer composing them from `App.tsx` rather than
  editing them, unless the task specifically calls for customizing a primitive.
- **`src/components/figma/ImageWithFallback.tsx`** is a Figma Make helper for images with a fallback; unrelated to
  the shadcn components.
- **`vite.config.ts`** remaps versioned import specifiers (e.g. `sonner@2.0.3`, `@radix-ui/react-dialog@1.1.6`) to
  their unversioned package names via `resolve.alias`. This is a leftover convention from the Figma Make export —
  when adding a new dependency that shadcn components import by a versioned specifier, add a matching alias entry
  rather than changing the import in the component file. The `@` alias maps to `src/`.
- **Styling**: Tailwind v4 with no `tailwind.config.js` (Tailwind v4 is configured via CSS). `src/index.css` is the
  actual compiled/used stylesheet, imported from `src/main.tsx`. `src/styles/globals.css` defines the shadcn theme
  tokens (light/dark CSS variables) but is **not imported anywhere** — it's currently dead/unused; check before
  assuming design tokens from it apply.
- **Assets**: images in `src/assets/`, sound effects in `src/audios/` (chest opening sounds), referenced directly
  via ES module imports in `App.tsx`.
- **`src/guidelines/Guidelines.md`** is an empty shadcn template for project-specific AI guidelines — no actual
  rules have been filled in yet.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
