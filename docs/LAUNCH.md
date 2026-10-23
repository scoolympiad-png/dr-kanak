# Launch and operations — drkanak.com

Prepared 23 October 2026 for the dedicated `scoolympiad-png/dr-kanak` repository. This is a Cloudflare **Workers** application with static assets and server routes. It is not a static-only Pages upload.

## Current prerequisites

The supplied screenshots show a GoDaddy domain with `ns63.domaincontrol.com` and `ns64.domaincontrol.com`, a parked apex record and `www` pointing to the apex. Cloudflare's import screen shows two parked apex addresses (`15.197.148.33` and `3.33.130.190`), a `_domainconnect` CNAME, `www` and a `_dmarc` TXT record. Screenshots are historical evidence, not a live DNS export. Recheck the account before changing records.

The available cloud browser reaches Cloudflare's sign-in page. A Cloudflare session or an authorised deployment connection is required to create the Worker, link GitHub, activate nameservers and bind the custom domains. No Cloudflare or GoDaddy credentials belong in Git or chat.

## 1. Deploy the repository

1. Sign into the intended Cloudflare account. The user-supplied account ID is `a4a46f0722b9b156054dfe08380a20fd`.
2. Under Workers & Pages, import `scoolympiad-png/dr-kanak`. Limit GitHub application access to the intended repository where the account permits that choice.
3. Name the Worker `dr-kanak`; select `main`; leave the root as `/`.
4. Build: `npm run build:cloudflare`. Deploy: `npm run deploy:cloudflare`.
5. Use Node 22 or later. The pinned package manager and lockfile control dependency installation.
6. Open the actual `workers.dev` URL returned by Cloudflare. Check the homepage, a parent article, vaccination hub, visit page, search and an unknown path. Confirm images and styles load. Do not guess the workers.dev hostname.

For an already authenticated local terminal, the same deployment is:

```sh
npm run check
npm run build:cloudflare
npm run deploy:cloudflare
```

Do not run a new framework migration or let a different preset replace the existing application. The project already has its Worker, Vite/Vinext configuration and scripts.

## 2. Activate the domain

1. In the existing `drkanak.com` zone, export or record current DNS. Preserve mail, verification and other active service records.
2. Complete Cloudflare's DNS review to reveal the **two exact nameservers assigned to this zone**. They are not available in the supplied screenshots. Never reuse another domain's nameservers.
3. At GoDaddy, open Domain Portfolio → `drkanak.com` → DNS → Nameservers → **I'll use my own nameservers**. Replace `ns63.domaincontrol.com` and `ns64.domaincontrol.com` with that assigned pair, then Save and Continue. Do this in the registrar's nameserver settings, not by adding two ordinary NS rows to the old zone. Complete any GoDaddy identity check in your own account.
4. Confirm the zone becomes Active. If DNSSEC is enabled, follow Cloudflare's documented migration process and verify the final DS state. Do not change DNSSEC blindly or leave a stale registrar DS record.
5. Once the Worker works at its actual `workers.dev` address and the zone is Active, compare the current DNS with the screenshots. If the apex `A` records still point to GoDaddy parking (`15.197.148.33` and `3.33.130.190`), replace those website records with the Worker's custom domain; do not copy either parking IP into a new record. If `www` still has `CNAME drkanak.com` solely for parking, remove that CNAME just before attaching `www` to the Worker: Cloudflare will reject a Custom Domain on a hostname with an existing CNAME. Do not remove a record that now serves an active service without reconciling it first.
6. In Workers & Pages → `dr-kanak` → Settings → Domains & Routes → Add → Custom Domain, add `drkanak.com`, then `www.drkanak.com`. Cloudflare creates the Worker DNS records and certificates. Both hostnames must be attached because Custom Domains match exact hostnames.
7. The application redirects `www.drkanak.com` to `drkanak.com` with HTTP 308. Preserve DMARC and any newly discovered MX, SPF, DKIM, verification or other service records.
8. Verify HTTPS, certificate status, apex homepage, www redirect and internal pages on the real domain. No redirect should return visitors to GoDaddy parking.

Cloudflare's primary-zone documentation: https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/
Workers custom domains: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
Workers Git builds: https://developers.cloudflare.com/workers/ci-cd/builds/configuration/

## 3. Configure the existing Patient OS and CRM

Set runtime variables in Worker Settings → Variables & Secrets. Build variables alone are not runtime bindings. Values are examples of setting names, not working credentials or endpoint guesses.

| Runtime key | Required for | Secret? |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Public canonical URL; external build supplies `https://drkanak.com` | No |
| `PUBLIC_LAUNCH` | Indexing; external build supplies `true` | No |
| `PATIENT_OS_CHAT_URL` | Verified HTTPS URL of the existing Mamta care assistant | No; use an address without secret query tokens |
| `PATIENT_OS_PORTAL_URL` | Verified HTTPS URL of the authorised guardian portal | No; use an address without secret query tokens |
| `CRM_ENQUIRY_URL` | Hospital-approved enquiry ingress matching CONTRACT.md | Treat as server configuration |
| `CRM_ENQUIRY_SECRET` | Bearer authentication for that ingress | Yes |
| `MAMTA_TENANT_ID` | Server-owned Mamta tenant routing | Treat as secret/server configuration |
| `TURNSTILE_SITE_KEY` | Public challenge key for the deployed hostname | No |
| `TURNSTILE_SECRET` | Server challenge verification | Yes |

A new deployment applies changed runtime settings. Never use a CRM sales login as a guardian portal. The public enquiry form does not activate care reminders or upload clinical records. Do not put API keys into `PATIENT_OS_CHAT_URL` or `PATIENT_OS_PORTAL_URL`.

### What works before these settings exist

Public pages, age navigation, search, source links, direct Mamta phone/WhatsApp, directions and the hospital appointment page. The callback dialog shows contact options. The care navigator provides deterministic navigation. Personal-record pages explain how to ask for access.

### What requires the existing private care service

Verified guardian login, child-record access, record reconciliation, clinician-approved vaccination plans, actual notification scheduling, WATI/SMS/email delivery, opt-out processing and CRM worklists. The reference policy is tested code for that service to adopt; the public website does not run it or send messages.

## 4. Activate vaccination reminders in the private system

- Master Admin enables the feature for Mamta only after the correct tenant and clinical owner are set.
- A guardian is verified and authorised for the child. The dose record is reconciled by the clinical team.
- The clinician approves the due event and reminder timestamps against the correct schedule/version/product. The uploaded blank card must not become an unreviewed rules engine.
- Record purpose-specific reminder consent, channel, language, recipient verification and withdrawal state. Keep care and marketing consent separate.
- Configure approved message templates and local send windows, then wire the durable outbox, retries, atomic idempotency, signed delivery webhooks and opt-outs in the actual service.
- Test with explicitly approved test records. Confirm that deferral, rescheduling, outside vaccination, consent withdrawal and a superseded plan cancel pending work.
- Provider delivery and appointment confirmation never mark a dose administered. Only an authorised clinician can do that with the clinical record/audit trail.

## 5. Release verification

| Check | Required result |
| --- | --- |
| Code | Type check, content checks, integration tests and production build pass |
| Domain | Active delegation, correct apex/www routing, valid HTTPS |
| Navigation | All inventory routes reachable; unknown route returns 404 |
| Contact | Hospital confirms phone, WhatsApp, current profile and appointment process |
| Enquiry | Unconfigured returns 503; configured challenge + ingress acknowledge a test request |
| Patient OS | Authorised Mamta assistant and portal; verified guardian boundaries |
| Reminders | Approved plan, consent, template, quiet hours, cancellation, deduplication, delivery audit |
| Content | Named clinical owner reviews medical pages and schedule-source version before adding a doctor-review badge |
| Search | Canonicals use drkanak.com; sitemap resolves; private/API/search pages stay noindex |
| Operations | Hospital owner for contact requests, escalation, privacy requests and content updates |

## Rollback and maintenance

Keep each released commit and Cloudflare deployment ID. If a release fails, roll back the Worker deployment to the last verified version; do not change unrelated DNS or the hospital website. Remove or pause a faulty care integration through runtime configuration while keeping direct hospital contacts available. Private-system reminder work must also be paused there if needed; removing a chat link cannot cancel an already queued notification.

Review contact details whenever hospital arrangements change, resource links periodically, and vaccination guidance whenever IAP/UIP/MoHFW recommendations change. Store clinical review dates and reviewer identity only after an actual review. Add analytics only after deciding what is necessary; do not transmit child-health details into advertising tools.
