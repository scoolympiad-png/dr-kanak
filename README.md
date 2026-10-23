# Dr Kanak Ramnani — paediatric care website

Personal doctor website for **Dr Kanak Ramnani**, consultant paediatrician at **Mamta Super Speciality Hospital, Raipur**. Target domain: **https://drkanak.com**. Source of record: **https://github.com/scoolympiad-png/dr-kanak**.

The design follows the requested Dr Dina editorial pattern: a blue primary navigation, secondary resource navigation, doctor introduction, six topic shortcuts, a substantial parent library, age-based journeys and contact prompts. All copy is original; no Dr Dina branding, photos, articles, subscriber lists or Canadian service claims are included.

## What is included

- Doctor profile, seven childhood stages from birth to 18 years, seven areas of paediatric care, hospital photography and visit preparation.
- Vaccination hub with schedule guidance, catch-up, after-care, adolescent/HPV information and FAQs. It does not calculate or approve a child's doses.
- Ten original parent guides with source links, article navigation, related reading, FAQs, search and Hindi titles/summaries. A Hindi introduction and visit-help page are included; full guides are in English.
- Verified Mamta phone, WhatsApp, hospital appointment page and directions; callback modal with an accurate contact fallback.
- Care navigator with emergency routing and a configurable existing Patient OS handoff. Private-record and reminder pages hand off to the authorised portal when configured.
- Server-side enquiry adapter; consent, payload/origin checks, Turnstile verification, timeouts and upstream receipt validation. It remains disabled until all required service settings exist.
- A tested reference reminder policy for integration into the private Patient OS/CRM service. It includes consent, guardian and tenant checks, approved templates, quiet hours, duplicate keys and clinical state separation. **It is not a running reminder service.**
- Responsive layouts, keyboard support, reduced-motion support, print styling, metadata, sitemap, robots control and security headers.
- Nine selected, compressed Mamta photos, image provenance, original decorative SVGs, source notes, deployment settings and an operations checklist.

## Run locally

Node **22.13 or later** and the package manager pinned in `package.json` are required. From this folder:

```sh
corepack enable
corepack pnpm install --frozen-lockfile
npm run dev
```

`npm run dev` prints the local preview address. Copy `.dev.vars.example` to `.dev.vars` only when adding development service settings; never commit credentials.

## Verify

```sh
npm run check
npm run build:cloudflare
```

The build produces `dist/client/` and `dist/server/`, including `dist/server/wrangler.json`. Do not deploy only the client folder: server routes support configuration and enquiry handling.

## Deploy to Cloudflare

Use **Workers & Pages → Create application → Import a repository** and select `scoolympiad-png/dr-kanak`:

| Setting | Value |
| --- | --- |
| Worker name | `dr-kanak` |
| Production branch | `main` |
| Root | `/` |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npm run deploy:cloudflare` |
| Node build version | `22` or later |

The external Cloudflare build sets the public canonical URL to `https://drkanak.com` and enables indexing. Its generated deployment configuration is the one used by `deploy:cloudflare`. Ordinary preview builds keep indexing off. The tracked root `wrangler.jsonc` is the source configuration, not the built application.

See **[docs/LAUNCH.md](docs/LAUNCH.md)** for nameservers, DNS, custom domains, secrets and the exact remaining live-service prerequisites. See **[integrations/patient-os/CONTRACT.md](integrations/patient-os/CONTRACT.md)** before connecting the clinical care system.

## Maintain

- Main content: `lib/core-pages.ts`, `lib/stage-content.ts`, `lib/parent-guides.json`.
- Doctor/hospital contact details: `lib/site-config.ts`.
- Layouts: `components/website.tsx`; interactions: `components/site-client.tsx`; styles: `app/globals.css`.
- Public enquiry boundary: `lib/integration.mjs`; API handlers: `app/api/`.
- Full route inventory: `docs/page-inventory.json`; photo provenance: `docs/asset-provenance.json`.

Never add patient records, child identifiers, private clinical documents or credentials to this public repository. Photos retain their owners' rights. No invented reviews, success rates, experience totals, consultation hours, prices or book/product endorsements are included.
