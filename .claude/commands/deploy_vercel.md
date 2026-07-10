---
description: Build the project and deploy it to Vercel, then report the live URL
---

Deploy this local project to Vercel and give me the public URL at the end. Extra arguments: $ARGUMENTS

Steps:

1. Verify the Vercel CLI is available with `vercel --version`. If it is not installed, tell me to run `npm i -g vercel` and stop.
2. Verify I am logged in with `vercel whoami`. If not logged in, tell me to type `! vercel login` in the prompt and stop.
3. Run `npm run build` and confirm it succeeds. The build output goes to `build/` (not `dist/` — see `vite.config.ts`).
4. Deploy:
   - If the arguments include `prod` or `production`, run `vercel deploy --prod --yes`.
   - Otherwise run `vercel deploy --yes` for a preview deployment.
   - If this is the first deploy and the project is not linked yet, the CLI may need setup; use `vercel link --yes` first if required.
5. When the deploy finishes, print clearly at the end:
   - The deployment URL where I can see the project on the internet.
   - Whether it was a preview or production deployment.

Important notes:
- This repo also has an Express API server in `server/` using better-sqlite3 (`/api/auth/*`, `/api/scores*`). A plain Vercel static deploy only serves the frontend from `build/` — the API routes will NOT work. Warn me about this in the final summary; the game itself still works via "Play as Guest" style flows that don't need the API, but sign-in/score endpoints won't respond unless the server is deployed separately.
