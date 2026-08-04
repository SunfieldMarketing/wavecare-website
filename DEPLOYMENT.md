# Deployment

The site is a Next.js 16 app with Payload CMS 3 mounted at `/admin` in the same
deployment. There is no second service to host.

## Current state

CMS-managed (editable in `/admin`):

- `/photoservices`, `/commercial`, `/testimonials`, `/case-studies`,
  `/privacy-policy`, `/terms-of-service`
- 4 case studies at `/case-studies/<slug>`
- 5 testimonials (reusable records)
- Navigation, Footer, Design & Colours, Site Settings
- The sitemap, generated from published content

Still hardcoded in TSX (they render fine, they are just not editable yet):

- `/`, `/about`, `/services`, `/design-print`, `/videoservices`, `/webdesign`,
  `/contact`

## The one thing that will break a deploy

The database is **not** committed. A fresh environment starts with no content, so
every CMS-backed page would call `notFound()` and ship as a 404 with a green
build. Guards in `src/lib/cms.ts` fail the production build instead, with the
commands needed to fix it.

**Set up the database before deploying this branch.**

## Database

The adapter is chosen from `DATABASE_URI`. No code change is needed to switch.

| Value | Adapter |
| --- | --- |
| `file:./wavecare-cms.db` | local SQLite — development only |
| `libsql://name-org.turso.io` | Turso, hosted SQLite — also set `DATABASE_AUTH_TOKEN` |
| `postgres://user:pass@host/db` | Postgres (Neon, Supabase, RDS) |

Local SQLite cannot `ALTER` existing tables, so a schema change means dropping
and re-seeding. That is fine while all content is script-generated; it destroys
real editor work. Use a hosted database as soon as anyone edits content for real.

### Getting Turso credentials

The Turso CLI has **no native Windows build** — it requires WSL. The web
dashboard does the same job with no CLI, and is the recommended route on Windows:

1. <https://turso.tech> → sign up (GitHub login, free, no card)
2. **Create Database** → name it `wavecare` → pick the nearest region
3. On the database page, copy the **Database URL** (`libsql://wavecare-<org>.turso.io`)
4. **Create Token** (full access) → copy it — it is shown only once

On macOS or Linux the CLI is equivalent:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
turso auth signup
turso db create wavecare
turso db show wavecare --url
turso db tokens create wavecare
```

### First-time setup

```bash
# .env.local:
#   DATABASE_URI=libsql://wavecare-<org>.turso.io
#   DATABASE_AUTH_TOKEN=<token>

npm run migrate      # create the tables (migration is committed)
npm run seed         # load all content — safe to re-run, it upserts
```

A fresh hosted database runs `migrate` without prompting. The local SQLite file
prompts about data loss because dev mode pushed schema into it directly.

`npm run migrate:create` is only needed after changing a block or collection
schema. Commit the generated file in `src/migrations`.

## Media

Vercel's filesystem is ephemeral: anything written to `public/media` is lost on
the next deploy or cold start, so CMS uploads would silently disappear.

Create a Blob store (Vercel dashboard → Storage → Blob). Vercel sets
`BLOB_READ_WRITE_TOKEN`, and the storage plugin activates only when that variable
is present — locally uploads keep going to `public/media`.

Client-side uploads are enabled, which also avoids Vercel's 4.5 MB server-upload
cap. Several existing photos exceed it.

## Environment variables

| Variable | Notes |
| --- | --- |
| `DATABASE_URI` | see table above |
| `DATABASE_AUTH_TOKEN` | Turso only |
| `PAYLOAD_SECRET` | **generate a fresh one for production** |
| `NEXT_PUBLIC_SERVER_URL` | live origin, e.g. `https://wavecare.io` — used for canonical URLs, the sitemap and live preview |
| `BLOB_READ_WRITE_TOKEN` | set automatically by Vercel |
| `GHL_API_TOKEN`, `GHL_LOCATION_ID` | contact form → GoHighLevel |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | optional; blank disables that script |

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Never reuse the development secret in production — anyone with repository history
could forge admin sessions.

## Deploy

1. Database set up and seeded (above)
2. Blob store created
3. Environment variables set for Preview **and** Production
4. Deploy the branch as a **preview** first
5. Check the preview: `/admin` login, the migrated pages, the contact form
6. Promote to production

## Verifying

```bash
npm run check:routes      # status, size and section count for every route
npm run audit:fidelity <url> <git-ref>   # compares rendered classes to the original
npm run build             # what Vercel runs
```

`check:routes` judges on status code and rendered size. Next ships strings like
"Application error" inside its dev overlay bundle on every page, so matching those
would flag healthy routes.

## Admin access

`/admin`, username + password (no email login). The first administrator is
created by `npm run seed` from `ADMIN_USERNAME` and `ADMIN_INITIAL_PASSWORD`.
Payload stores only a salted scrypt hash, and lowercases usernames.

Change the password after first login: the bootstrap value passes through a seed
script and an env file.

Roles: **admin** (full access including team and settings) and **editor** (all
site content, no user management or tracking IDs).

## Known follow-ups

- 7 pages still hardcoded (listed above)
- `public/videos` holds 413 MB, of which ~338 MB is unreferenced — 8 files
  already hosted on Vimeo. Deleting them does not shrink clone size without a
  history rewrite.
- `ScrollGuard` is a compatibility shim keeping one Lenis instance alive across
  navigation, because the hand-written pages each create their own without
  cleanup. It can be removed once every page is CMS-driven.
