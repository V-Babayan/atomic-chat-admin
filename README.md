# Atomic Chat Admin

Web admin panel for editing the mobile app's on-device model catalog. Static SPA hosted on GitHub Pages. Writes go straight to a JSON file (`models.json`) in a separate GitHub repo via the Contents API — no backend, no database. The mobile app reads that same file via jsDelivr.

## Stack

- Vite 6 + React 19 + TypeScript (`strict`, `noUncheckedIndexedAccess`)
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- `react-hook-form` + `zod`
- `react-router-dom`

## Data flow

```
┌──────────────┐  PUT contents (PAT)   ┌─────────────────────────┐
│ Admin (SPA)  │ ─────────────────────▶│ atomic-chat-mobile-data │
│ GH Pages     │                       │ models.json (main)      │
└──────────────┘                       └──────────┬──────────────┘
                                                  │
                                                  ▼ (jsDelivr CDN)
                                       ┌─────────────────────────┐
                                       │ Mobile app on startup   │
                                       │ fetches catalog         │
                                       └─────────────────────────┘
```

## Setup

```sh
yarn install
cp .env.example .env
# fill in VITE_DATA_REPO_OWNER / VITE_DATA_REPO_NAME
yarn dev
```

Open http://localhost:5173/login and paste a fine-grained GitHub PAT (see below).

## Environment variables

| Var | Purpose | Notes |
| --- | --- | --- |
| `VITE_BASE_PATH` | Vite `base` for GH Pages | `/atomic-chat-admin/` for project pages, `/` for user pages |
| `VITE_DATA_REPO_OWNER` | Owner of the data repo | e.g. `V-Babayan` |
| `VITE_DATA_REPO_NAME` | Data repo name | e.g. `atomic-chat-mobile-data` |
| `VITE_DATA_FILE_PATH` | Path to catalog inside data repo | defaults to `models.json` |
| `VITE_DATA_BRANCH` | Branch to read/write | defaults to `main` |
| `VITE_USE_MOCK` | `true` swaps GitHub client for an in-browser mock (seeded from the mobile app snapshot, persisted in `localStorage`) | Handy for local UI work |

**No secrets are bundled.** The GitHub PAT is entered in the sign-in screen and lives in `localStorage`.

## Auth: fine-grained PAT

1. https://github.com/settings/personal-access-tokens/new — click "Generate new token".
2. **Resource owner:** you.
3. **Repository access:** "Only select repositories" → pick your data repo (`atomic-chat-mobile-data`).
4. **Repository permissions → Contents:** `Read and write`.
5. Copy the token (`github_pat_…`) and paste it on the admin sign-in page.

The token is stored in your browser's `localStorage`. Sign-out clears it. If it leaks, revoke it in GitHub settings and generate a new one — no other blast radius (the token only has `contents:write` on one repo).

## Data repo layout

The data repo just needs to exist. The panel will create `models.json` on the first save if it isn't there. Example initial contents:

```json
[]
```

Public repo required (so jsDelivr and the mobile app can read it without auth).

## Mobile app fetch (Sprint 3)

```ts
const CATALOG_URL =
  'https://cdn.jsdelivr.net/gh/<owner>/<data-repo>@main/models.json';

const models = await fetch(CATALOG_URL).then(r => r.json());
```

jsDelivr caches for ~12 hours. To force a refresh right after editing, hit the [purge endpoint](https://www.jsdelivr.com/documentation#id-purge-cache) or use `?_=<timestamp>` from the app.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `yarn dev` |
| Type-check + lint | `yarn lint` |
| Production build | `yarn build` |
| Preview built bundle | `yarn preview` |

## Deploy

`.github/workflows/deploy.yml` builds and deploys on push to `main`. Configure repo **variables** (not secrets) — nothing here is sensitive:

- `VITE_BASE_PATH` (`/atomic-chat-admin/`)
- `VITE_DATA_REPO_OWNER`, `VITE_DATA_REPO_NAME`
- `VITE_DATA_FILE_PATH` (optional, default `models.json`)
- `VITE_DATA_BRANCH` (optional, default `main`)
- `VITE_USE_MOCK` (`false` in prod)

The build step copies `dist/index.html` → `dist/404.html` so client-side routes (`/models/:id/edit`) survive a direct load on GitHub Pages.

## Field model

Zod schema lives in [src/schemas/model.ts](src/schemas/model.ts). Runtime-only fields from the mobile `TModel` (`status`, `path`, `progress`, `mmprojLocalPath`) are intentionally not part of the admin schema — they live on the device.

## Related

- Mobile catalog source: [`atomic-chat-mobile-app/src/store/models/data.ts`](../atomic-chat-mobile-app/src/store/models/data.ts) — the current static array. To bootstrap the data repo, seed `models.json` with a snapshot of `MODELS`. There's already one in [`src/api/mock-seed.ts`](src/api/mock-seed.ts).
- Plan file: `~/.claude/plans/noble-noodling-fern.md` (original 3-sprint plan; superseded — no backend needed anymore).
