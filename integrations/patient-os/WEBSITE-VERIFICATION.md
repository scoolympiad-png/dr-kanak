# Patient OS website binding — verified-domain hook

This website exposes an **optional, inactive-by-default** ownership-verification endpoint for Nuvyqo Patient OS. It is **not** a chat widget, AI activation or hospital-data connection. Existing public pages and contact pathways are unchanged.

## Route

`GET https://<canonical-website-host>/.well-known/nuvyqo-site-verification.txt`

This returns HTTP 404 until the Cloudflare Worker **runtime** has BOTH:

- `PUBLIC_SITE_URL`: exact canonical HTTPS origin, e.g. `https://drkanak.com`. For another website configure its actual host; do not hardcode Dr Kanak in the shared Patient OS product.
- `NUVYQO_SITE_VERIFICATION_TOKEN`: a Patient OS-issued random challenge of 40–128 URL-safe letters, digits, underscores and hyphens. Set it through **Cloudflare Worker Secrets**, never Git, browser code or query strings.

If configured, GET serves the exact token plus a newline with `Cache-Control: no-store`, `X-Robots-Tag: noindex` and `Content-Type: text/plain`. A missing/invalid token, a non-HTTPS origin or another hostname returns 404.

## End-to-end process — Patient OS server work is still required

1. Choose the **existing** Dr Kanak tenant/facility in Patient OS. Do not create a duplicate hospital.
2. Patient OS creates a short-lived, random binding challenge and stores its hash and expiry.
3. Authorized website operator installs the token in the Dr Kanak Cloudflare runtime secrets.
4. Patient OS verifies the exact HTTPS path with no redirect and a secure fetch that denies private/reserved IPs and DNS rebinding.
5. On success, the challenge is invalidated and the website is recorded as `VERIFIED`, not yet chat-active.
6. A hospital administrator approves public knowledge; the AI system verifies its runtime, tenant-scoped conversations and origin restrictions.
7. Super Admin activates Advanced AI for the selected hospital. The live system issues a widget ID and a one-line installation snippet.
8. The operator installs only the **generated verified widget snippet**. Never load the old demo `widget.js` or select `LOCALHOSPITAL` by default.

**This Git change implements the website's ownership-proof hook only.** The R88 Patient OS service remains unaffected. Widget installation and AI activation await the independently authorized Patient OS backend release.

## Verification and rollback

Run `node --test tests/nuvyqo-site-verification.test.mjs`.

To disable this route after verification, remove the runtime secret: all requests revert to HTTP 404 immediately. Reverting the three source files removes the hook. There are no SQL updates or visitor-facing changes when the token is unset.

Children's identifiable clinical records must not be collected through anonymous website chat. Dr Kanak's public site is educational; individual diagnoses and appointment availability must be handled by the authorized clinical and hospital team.
