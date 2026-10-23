# Patient OS / CRM contract

The website is the public education and patient-access layer. The existing Patient OS owns identity, child records and clinician-approved care plans. Healthcare CRM owns enquiry worklists, contact follow-up and delivery operations under the correct tenant. Clinical completion comes from the clinical system, not a message provider or LLM.

No live Mamta tenant ID, Patient OS URL, clinical API or notification credentials were supplied or verifiable during this build. The interfaces below define what must be connected. They do not assert that these API paths already exist.

## Public enquiry adapter — implemented

`POST /api/enquiry/` accepts a small JSON request with an adult `name`, `phone`, `intent` (`appointment`, `vaccination`, `reminder-enrolment`, `general`), `language` (`en`/`hi`), `consent:true`, empty honeypot `website`, and `captchaToken`. Send a UUID `Idempotency-Key` header from a same-origin browser request.

The adapter checks origin, a 4 KB body limit, fields, explicit contact consent and Turnstile result, action and hostname. It forwards only adult contact and intent to the configured `CRM_ENQUIRY_URL` with a server-side bearer secret and tenant. It does not forward arbitrary fields or a child record.

Forwarded payload:

```json
{
  "schemaVersion": 1,
  "tenantId": "SERVER_CONFIGURED_TENANT",
  "source": "drkanak-website",
  "adultContact": {"name": "ADULT_NAME", "phone": "+91…", "language": "hi"},
  "intent": "vaccination",
  "consent": {"contactReply": true, "recordedAt": "ISO_TIMESTAMP", "version": "contact-reply-v1"},
  "requestId": "UUID"
}
```

The CRM ingress must return a successful HTTP status and JSON `{"accepted":true,"requestId":"UUID"}` only after durable acceptance. It must authenticate and tenant-authorise the caller, enforce an atomic unique idempotency key, rate-limit, apply appropriate retention and route a task to the authorised hospital team. If your ingress uses a different receipt schema, adapt this server boundary after verifying its real contract.

Unconfigured requests return 503. Upstream refusal, timeout or an unrecognised receipt cannot appear as a successful submission. No patient contact data is written to browser storage or URL parameters. Add platform rate limiting to the ingress; CAPTCHA is not a substitute for rate controls.

## Source-verified Mamta CRM website-v1 compatibility adapter — staged, not activated

The public callback can optionally use the existing CRM tenant website ingress through `CRM_INTEGRATION_MODE=legacy-website-v1`, `CRM_WEBSITE_INGRESS_URL` (encrypted server secret), and `MAMTA_TENANT_ID`. The adapter translates the adult-only callback fields to `website_lead` and validates the CRM's `WebsiteIngressResult` against the original enquiry ID before acknowledging receipt. It never creates Patient OS vaccination data or enrolls a reminder.

**No live tenant, CRM endpoint version, secret, or Patient OS portal has been verified here.** The mode stays inactive until a Mamta-specific test and authorised production configuration. Review [MAMTA-INTEGRATION-READINESS.md](./MAMTA-INTEGRATION-READINESS.md) for exact source findings, security controls and the sequence for activation.

## Vaccination reminder contact gateway — public stage implemented

The vaccination schedule and `/my-child/reminders/` show a parent-facing reminder interest card. When the existing server-authorised callback ingress is available, the CTA opens the existing Turnstile-protected enquiry form preselected to `reminder-enrolment`. Otherwise, it presents the hospital's telephone contact. If `PATIENT_OS_PORTAL_URL` is configured, guardians can open the existing secure portal as a separate action.

The form accepts **adult name, telephone, language, reply consent and request intent only**. It rejects unexpected fields including child identity, date of birth, vaccine details, clinical notes, and uploaded records. The backend requires a matching CRM request receipt to acknowledge acceptance. Contact consent is **not** consent to care reminders. A successful enquiry is a callback request only; it does not create a guardian account, mark a clinical event, schedule a vaccination, opt a family in to messages, or issue a reminder.

Remaining private-service requirements before activation:

- Verify the actual Mamta hospital tenant, Patient OS guardian portal endpoint, CRM enquiry ingress and notification service.
- Confirm guardian relationship/authority and channel-specific, revocable consent in Patient OS.
- Import vaccination evidence through an authenticated healthcare workflow, with clinician review and source attribution.
- Calculate due events only from approved clinical rules and records, not from this public age guide.
- Use a durable scheduler, approved templates, quiet hours, opt-out handling and replay-safe webhooks.
- Perform test-tenant end-to-end receipt, notification and cancellation verification before enabling any real family.

## Chat and portal — configurable handoff implemented

- `PATIENT_OS_CHAT_URL`: an approved HTTPS address of the existing assistant. The navigator opens it explicitly in a new tab. This keeps its own authentication boundary and avoids assuming iframe support.
- `PATIENT_OS_PORTAL_URL`: an approved HTTPS address of the authorised guardian portal. Every private-care landing page uses this same verified entry point; the public website does not invent downstream portal paths.
- URLs must not contain credentials or secret access tokens. Bearer tokens are never embedded in links. Authentication, authorisation and session expiry remain in Patient OS.
- The LLM may explain approved content and help route a question. It must not decide vaccine validity, due dates, identity grants, slot confirmation, payments or dose completion.

## Reminder policy — reference code, not deployed service

`reminder-policy.mjs` is framework-independent reference code intended for the PRIVATE care service. It consumes already approved due events and explicit reminder windows. There are no DOB-to-vaccine rules or default clinical intervals in the public website.

Inputs include tenant, child/event/plan IDs, current plan version, clinical review, planned state, reviewed `sendAt`/`expiresAt` windows, authorised guardian relationship, channel/language-specific consent and a hospital-approved template policy. It returns `enqueue` with an idempotency key or `hold` with a reason.

Required production persistence and workflow:

1. Store clinical plan versions and original dose evidence in the authorised clinical database. Review uncertain entries, combination products, catch-up intervals and guidance changes with the clinician.
2. Use a durable scheduler and outbox. Atomically reserve a unique `(tenant,event,planVersion,reminder,channel)` key before calling a provider. The `deliveredKeys` argument demonstrates the policy check; it is not production concurrency protection.
3. Recheck consent, guardian access, plan version and clinical status immediately before dispatch. A queued item is not permission to send forever.
4. Use approved templates for the selected channel/language. Keep lock-screen messages minimal. An example concept is: “Mamta Hospital: a planned child-care visit is coming up. Contact the team to confirm.” Do not put diagnosis or detailed vaccination history in a notification.
5. Track provider acceptance, delivery, failure, bounce and opt-out separately. Retry transient failures with a cap and quiet-hour checks; route exhausted failures to a CRM task. Reconcile an ambiguous timeout using provider idempotency/status rather than blindly repeating.
6. Verify signed delivery callbacks over raw bytes, enforce a short timestamp window and atomically record provider event IDs to reject replay. `verifyProviderSignature` demonstrates a generic HMAC envelope; match the actual WATI/SMS/email provider's documented signature scheme before using it.
7. Clinician deferral, outside vaccination, cancellation, plan supersession or consent withdrawal invalidates pending reminder jobs. Reconcile before issuing a new plan.
8. Maintain tenant-scoped role controls and audit events for every clinical and operational transition. Master Admin activates the feature by tenant. Hospital staff see only authorised worklists; verified guardians see only children they are allowed to access.

Clinical event states and messaging states are separate. The exported transition function requires a clinician actor for clinical state changes; the real service must derive that actor from server-side authentication, not a caller-supplied object. A clinician marking a dose administered must also persist its actual date, product, batch/site information as required, record source and audit history in the clinical system. The reference function does not implement that clinical record.

## Acceptance scenarios

The included tests cover unconfigured/failing enquiry service, cross-site submission, invalid consent/inputs, challenge rejection, receipt validation, tenant and guardian mismatch, withdrawn consent, stale plans, deferred/administered events, quiet hours, duplicate reminders, signed-body tampering and provider-versus-clinician state separation.

Before real messages: test the actual private service end to end with approved test identities, verified contact channels, durable queue, provider sandbox or approved recipients, opt-out and cancellation. No real patient enrolment or notification is performed by this repository build.
