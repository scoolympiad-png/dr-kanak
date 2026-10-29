# Mamta vaccination Patient OS — controlled launch plan (29 October 2026)

**Internal only — do not publish as a parent article or commit secrets/patient records.**

## Implementation status
- Dr Kanak site `scoolympiad-png/dr-kanak` uses a public education frontend and encrypted server-side CRM ingress capability.
- Website vaccination programme page `/vaccination/reminders/` is an educational gateway. Its callback uses the existing adult-only, Turnstile-protected enquiry contract; no child data, reminder consent or automated alerts.
- The private `scoolympiad-png/nuvyqo-patient-os` repository was confirmed **empty** on 29 Oct 2026. Earlier Patient OS source was on the Windows deployment folder `E:\NuvyqoAIChatbot\NuvyqoPatientConversionOS-v0.2-FULL` and has not been transferred from that machine. An empty repository is not the live Patient OS service.
- Mamta's authentic CRM tenant ID, Patient OS production endpoint, secure guardian portal, provider credentials, and live clinical vaccination events have not been verified in this website repository.
- The website CRM legacy adapter is opt-in and **off** without configured Mamta runtime secrets. See `integrations/patient-os/MAMTA-INTEGRATION-READINESS.md`.

## Next ordered work items
1. **Source/hosting inventory (read only):** Using authorised access on Windows, locate the real Patient OS source/solution, appsettings templates, database migrations, active IIS site/app pool, HTTPS host, health endpoint, identity authority, scheduling services and live config keys. Remove secrets, connection strings, live exports, logs and patient data from any planned Git transfer.
2. **Private repo transfer:** Upload the sanitised source to `scoolympiad-png/nuvyqo-patient-os` with a clear README, solution, `.gitignore`, examples only, and preserved deployment/version provenance. Do not upload production `appsettings.json` with secrets, `.env`, `bin/`, `obj/`, backups, certificates or database dumps. Run build/tests before considering the repo an authority. Coordinate with the existing owner to avoid overwriting a new branch.
3. **Mamta tenant:** Verify CRM and Patient OS organisation mapping, hospital ownership and RBAC; provision tenant-scoped routing, authorised roles, and explicit feature-off default. Never reuse Pahlajanis identifiers or secrets.
4. **Clinical authority:** Hospital clinician approves versioned IAP/ACVIP/NIP guidance, reconciles imported records and due events, reviews outside doses and catch-up plans. Never derive a child's personal due date from the public age guide, an LLM, or an unreviewed PDF.
5. **Guardian access/consent:** Hospital-controlled account and verified adult/child relationship. Separate logged, revocable consent for each reminder channel and for optional marketing; prevent cross-tenant access. Do not use browser local storage for PHI.
6. **Durable reminders:** Persist approved due event, plan version, reminder time window, unique idempotency key and outbox. Recheck authorisation, consent and plan status just before dispatch. Enforce quiet hours, approved Hindi/English SMS/WhatsApp templates, retries/callback integrity, opt-outs and cancellation.
7. **Care workflow:** Appointment availability from the authoritative scheduling system, slot hold/confirmed booking from its own acknowledgment, and clinical dose completion only by authorised staff. Deliveries are not visits and are not dose administrations.
8. **Isolated pilot:** Synthetic record in the Mamta test tenant; verify create, duplicate, changed date, withdrawn consent, deferral, wrong tenant, delivery failure, no-record disclosure and opt-out. Obtain doctor/business owner sign-off.
9. **Dr Kanak handoff:** Set `PATIENT_OS_PORTAL_URL` and `PATIENT_OS_CHAT_URL` only to the verified HTTPS URLs without bearer tokens. If CRM lead callback is authorised and tenant-tested, configure the server-side adapter and Turnstile with the correct Mamta-specific Worker secrets. Keep user-facing fallback links while unavailable.
10. **Go-live:** Approve rollback owners, alerting, support route, provider monitoring and audit retention. Enable Mamta's feature only after recorded UAT; monitor failures and stop or revoke by tenant.

## Go/no-go checklist
- [ ] Private sanitised Patient OS repo populated and tested
- [ ] Mamta tenant / HTTPS service / portal verified
- [ ] Guardian authorisation and consent withdrawal tested
- [ ] Clinician-approved versioned due events and source history
- [ ] SMS/WhatsApp provider sandbox and approved templates
- [ ] Durable queue, dedupe, failure routing and signed receipts
- [ ] Mamta-specific CRM callback test with matching receipt
- [ ] Cross-tenant, cancellation and opt-out tests passed
- [ ] Clinician and hospital owner approve rollout

**Do not interpret successful GitHub/Cloudflare builds of Dr Kanak as activation of Patient OS.**

Clinical sources: IAP ACVIP 2025 recommendation (published April 2026): https://doi.org/10.1007/s13312-026-00311-w ; IAP action plan 2026: https://www.iapindia.org/iap-action-plan-2026/ .
Privacy review source: MeitY DPDP Rules 2025 and enforcement schedule: https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa .
