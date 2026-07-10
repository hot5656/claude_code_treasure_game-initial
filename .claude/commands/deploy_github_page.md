---
description: Build the project and deploy it to GitHub Pages, then report the live URL
---

Deploy this local project to GitHub Pages and give me the public URL at the end. Extra arguments: $ARGUMENTS

Steps:

1. Verify the GitHub CLI is available with `gh --version`. If it is not installed, tell me to run `brew install gh` and stop.
2. Verify I am logged in with `gh auth status`. If not logged in, tell me to type `! gh auth login` in the prompt and stop.
3. Make sure this directory is a git repository with a GitHub remote:
   - If it is not a git repo yet, run `git init -b main`, create a `.gitignore` (at minimum: `node_modules/`, `build/`, `server/data.db*`), then commit all files.
   - If there is no `origin` remote, create the GitHub repo and push with `gh repo create <repo-name> --public --source=. --push` (Pages on a free plan requires a public repo — ask me before making it public if the repo doesn't exist yet).
4. Ensure the Vite `base` path is correct for GitHub Pages. The site will be served from `https://<owner>.github.io/<repo>/`, so `vite.config.ts` must set `base` to `'/<repo>/'` (or `'./'`). If it's missing, add it — otherwise assets 404 and the page renders blank.
5. Run `npm run build` and confirm it succeeds. The build output goes to `build/` (not `dist/` — see `vite.config.ts`).
6. Deploy the `build/` directory to the `gh-pages` branch:
   - Use `npx gh-pages -d build` (add `gh-pages` as a devDependency if needed), or push `build/` to the `gh-pages` branch manually with git if `npx` fails.
7. Enable GitHub Pages on the repo if it isn't already, serving from the `gh-pages` branch root:
   - `gh api repos/{owner}/{repo}/pages -X POST -f "source[branch]=gh-pages" -f "source[path]=/"` (ignore the error if Pages is already enabled).
8. Wait for the Pages build to finish (poll `gh api repos/{owner}/{repo}/pages` until status is `built`, or curl the URL until it returns 200 — the first deploy can take a couple of minutes).
9. When done, print clearly at the end:
   - The public URL: `https://<owner>.github.io/<repo>/`.
   - A reminder that redeploying is just: build again + `npx gh-pages -d build`.

Important notes:
- This repo also has an Express API server in `server/` using better-sqlite3 (`/api/auth/*`, `/api/scores*`). GitHub Pages only serves static files — the API routes will NOT work. Warn me about this in the final summary; the game itself still works via "Play as Guest" style flows that don't need the API, but sign-in/score endpoints won't respond unless the server is deployed separately.
- The `base` path change in `vite.config.ts` affects other deploy targets: a repo-specific base like `/<repo>/` would break the Vercel deploy. Prefer `base: './'` (relative paths) so both targets keep working, and mention in the summary which value was used.
