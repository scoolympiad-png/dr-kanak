# Mamta vaccination enquiry → CRM → Patient OS: connection gate

Status: **Code adapter implemented and unit-tested; live tenant connection not verified or activated.**

## Evidence from checked repositories

- Dr Kanak website: `POST /api/enquiry/` already has same-origin, Turnstile, adult-only input, contact reply consent, and idempotency checks.
- The *source code* in `scoolympiad-png/nuvyqo-healthcare-crm` includes `WebsiteIngressService` and a tenant-scoped `POST /api/crm/integrations/website/{organizationId}/{secret}` route. It expects `website_lead`/`patient_data`/`metadata` and returns `WebsiteIngressResult`; it does **not** accept the Dr Kanak website's original versioned bearer-schema as-is.
- This repository now supports `CRM_INTEGRATION_MODE=legacy-website-v1` with a server-side adapter that maps the preexisting public form to the CRM's documented source shape and validates its matching receipt.
- The connected GitHub installations do **not** expose the private Patient OS application repository, and no live Mamta tenant or authorised guardian portal configuration has been verified here.
- Source-level evidence is not a deployment test. Do not treat the CRM source code as confirmation that the running CRM has the same version.

## Existing compatibility adapter

Set only after the hospital's authorised CRM admin has verified the deployed route and correct **Mamta** organisation. Do not paste credentials into issues, chat, screenshots, a `wrangler.jsonc` variable, or Git commits.

| Variable | Deployment placement | Description |
| --- | --- | --- |
| `CRM_INTEGRATION_MODE` | Worker plaintext variable | `legacy-website-v1` explicitly selects the adapter. Leave unset until ready. |
| `MAMTA_TENANT_ID` | Worker server variable | Actual Mamta CRM organisation GUID, never another hospital's organisation. |
| `CRM_WEBSITE_INGRESS_URL` | **Encrypted Worker secret** | Exact tenant-scoped CRM URL, including its secret path segment. Never use an example or placeholder. |
| `TURNSTILE_SITE_KEY` | Worker public server variable | Hostname-authorised site key for `drkanak.com`. |
| `TURNSTILE_SECRET` | **Encrypted Worker secret** | Corresponding private site-verification secret. |
| `PATIENT_OS_PORTAL_URL` | Worker server variable, optional | Verified HTTPS guardian portal entry point after Patient OS owner confirms it. |
| `PATIENT_OS_CHAT_URL` | Worker server variable, optional | Verified HTTPS existing Patient OS assistant entry point. |

The adapter requires exactly the HTTPS origin `crm.nuvyqo.com`, the path `/api/crm/integrations/website/{MamtaOrgGUID}/{48-hex-secret}`, no query string and no mismatched tenant. It returns a public `callbackEnabled` boolean only; it never returns credentials. A configured variable does not prove the upstream is reachable or correctly provisioned.

**Legacy CRM credential warning:** the CRM route authenticates with a secret embedded in the URL *path*. Even with encrypted Worker variables, reverse-proxy and server request logs can capture such paths. Review/sanitize those logs and scope access; do not use the secret in client-side code. A future versioned bearer/HMAC endpoint is preferable. Do not rotate an existing hospital's integration secret without a coordinated cutover.

### Adult callback handoff (not clinical enrolment)

On an explicit, consented parent submission, the Worker sends the CRM's `website_lead` format with:
- Unique `event_id` and `metadata.lead_id` from the original request ID;
- `form_type=callback_request`;
- `patient_data` containing **adult name and phone only** (CRM legacy field name does not mean an enrolled patient);
- `metadata.service_requested` distinguishing vaccination enquiry / reminder callback interest; source URL, reply language, contact-reply consent and timestamp.
- No child name, DOB, vaccine schedule, diagnosis, files, clinical plan or message-enrolment consent.

The CRM must return `status=created` or `already-imported`, `eventType=callback_request`, the **same** `externalId`, a nonempty `inquiryNumber`, and `historical=false`. Anything else is an unsuccessful receipt from the website's perspective. The response never promises appointment confirmation or notification enrolment.

## Verification order (do not skip)

1. **CRM source-to-live parity:** authorised CRM admin confirms the deployed `WebsiteIngressService` route, current schema, Mamta organisation existence/active status, correct hospital owner and location mapping. Read-only inspection first.
2. **Tenant-specific ingress:** verify Mamta has its own configured `WEBSITE` ingress secret. Do **not** reuse Pahlajanis or another tenant's URL/secret. Creating or rotating a key is a separate, coordinated administrative step.
3. **Tenant-safe test:** with an approved adult test contact and the hospital's explicit authority, set the Worker secrets in an isolated deployment/preview; send a single test, confirm exactly one CRM inquiry under Mamta with accurate `Source=WEBSITE`, follow-up assignment and no child record. Verify duplicate request ID does not create a second inquiry.
4. **Failure path:** deliberate wrong token, offline CRM, malformed receipt, wrong tenant, Turnstile refusal and withdrawal must not report successful submission. Check logging avoids full webhook URL and adult phone.
5. **Production gate:** only then set the exact production Worker environment variables and check callback availability on `drkanak.com` without exposing the underlying secret. Do not edit unrelated CRM production behavior.
6. **Separate Patient OS activation:** verify actual Patient OS code and runtime access, guardian auth, relationship verification, tenant isolation, revocable channel-specific consent, clinician-approved vaccine plan, durable outbox/scheduler, approved templates/quiet hours, delivery reconciliation, revocation and cancellation. Run synthetic data first.
7. **Clinical sign-off:** Dr Kanak / authorised hospital clinician approves the plan rules and record-review workflow. A static public vaccination table may NEVER write dose-completion, calculate individual due dates or trigger direct messages.

**Not yet done:** live CRM API test, credential installation, Mamta tenant attestation, Patient OS code review, private clinical data flow, real reminder enrollment or message dispatch.

## Rollback

Unset `CRM_INTEGRATION_MODE` in the Worker runtime (and redeploy/recheck), which returns the current safe phone fallback if no separate compatible standard CRM adapter is configured. Do not delete clinical data or rotate production keys as part of rollback without a separate authorised change.

## Automated checks

`npm test` / GitHub CI validates the adapter's opt-in behavior, strict URL/tenant matching, adult-only payload, contact consent metadata, matching receipts, duplicate response handling and failure closure. These are **mocked** tests, not proof of live availability.
