# Atomic Chat Admin

Web admin panel for editing the mobile app's on-device model catalog. Static SPA, deployed to GitHub Pages, talks to the `backend-app` NestJS admin API (`/v1/admin/mobile-models`, see Sprint 2 plan).

## Stack

- Vite 6 + React 19 + TypeScript (`strict`, `noUncheckedIndexedAccess`)
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- `react-hook-form` + `zod`
- `react-router-dom`

## Setup

```sh
yarn install
cp .env.example .env
# fill in values (see below)
yarn dev
```

Open http://localhost:5173/login.

## Environment variables

| Var | Where used | Notes |
| --- | --- | --- |
| `VITE_API_BASE_URL` | HTTP client base URL | e.g. `http://localhost:3000` |
| `VITE_BASE_PATH` | Vite `base` for GH Pages | `/atomic-chat-admin/` for project pages, `/` for user pages |
| `VITE_ADMIN_USERNAME` | Login-form check | Bundled into the static build |
| `VITE_ADMIN_PASSWORD` | Login-form check | Bundled into the static build |
| `VITE_ADMIN_TOKEN` | `Authorization: Bearer …` header | Bundled into the static build |
| `VITE_USE_MOCK` | `true` swaps the HTTP client for an in-browser mock (seeded from the mobile app snapshot, persisted in `localStorage`) | Handy while the backend is not ready |

> ⚠️ **All `VITE_*` variables are inlined into the JS bundle at build time.** They are visible to anyone who opens devtools on the deployed site. Keep the GH Pages repo private, or rely on the backend to reject requests without a valid `ADMIN_TOKEN`, and rotate the token if leaked.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `yarn dev` |
| Type-check + lint | `yarn lint` |
| Production build | `yarn build` |
| Preview built bundle | `yarn preview` |

## Deploy

`.github/workflows/deploy.yml` builds and deploys on push to `main`. Configure the secrets/vars in the repo settings before the first push:

- **Secrets:** `VITE_API_BASE_URL`, `VITE_ADMIN_USERNAME`, `VITE_ADMIN_PASSWORD`, `VITE_ADMIN_TOKEN`
- **Variables:** `VITE_BASE_PATH`, `VITE_USE_MOCK` (`true` / `false`)

The build step copies `dist/index.html` → `dist/404.html` so client-side routes (`/models/:id/edit`) survive a direct load on GitHub Pages.

## Field model

Zod schema lives in [src/schemas/model.ts](src/schemas/model.ts). Any change to the form fields must be mirrored server-side in the Sprint 2 backend DTO. Runtime-only fields from the mobile `TModel` (`status`, `path`, `progress`, `mmprojLocalPath`) are intentionally not part of the admin schema — they live on the device.

## Related

- Mobile catalog: [`atomic-chat-mobile-app/src/store/models/data.ts`](../atomic-chat-mobile-app/src/store/models/data.ts) — the current static source, snapshotted into [`src/api/mock-seed.ts`](src/api/mock-seed.ts).
- Backend admin pattern: [`backend-app/src/api/admin/banners/`](../backend-app/src/api/admin/banners/) — reference for the Sprint 2 `admin/mobile-models` module.
- Plan file: `~/.claude/plans/noble-noodling-fern.md`.
