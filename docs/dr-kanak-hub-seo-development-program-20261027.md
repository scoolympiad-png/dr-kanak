# Dr Kanak — hub-based page development & release discipline
Updated: 27 October 2026
Master Google Drive register: https://docs.google.com/spreadsheets/d/1s3L9q_EE9hXKhiSJ8lff8rcv3wWhCgXr10HoFpIQlvs/edit
Project Drive folder: https://drive.google.com/drive/folders/1l8MmyNNVM1RthTPW1SwR0gDzoHZx3dLh

This is **private internal planning**, not a public website article. Never publish audit scores, page-build instructions or internal placeholders as visitor content.

## Architecture
The site retains its authoritative existing URLs while adding clear topical pillars:
- `/autism/` — built; reader-friendly hub connecting existing `/family-wellbeing/autism/`, `/autism/early-signs/`, `/autism/sensory-needs/` and child development care. Do not redirect or delete the original page.
- `/vaccination/` — existing hub, upgraded with a connected resource directory. Keep schedule, after-care, catch-up, FAQs, vaccine questions and future reminder explanations as individual destinations.
- `/learning-and-adhd/` — existing hub for strengths, writing and classroom support.
- `/family-wellbeing/stress/` — existing guide. `/family-wellbeing/` is a proposed **future** hub only; do not link to an unbuilt path.
- `/care-by-age/`, `/parent-resources/`, `/care/` — existing age, parent and care navigation hubs.
- On homepage, use one four-hub showcase below the quiet professional hero. Do not add lengthy paragraphs into the main hero.

## Publishing workflow, one page at a time
1. Choose the highest priority unstarted record in **Future Roadmap** from Drive; check for duplication or cannibalisation against **Page Register**.
2. Verify current clinical guidance using relevant source agencies: WHO, CDC, MoHFW, IAP, AAP, AHA as appropriate. Record exact links and edition/date where available. Never use old scanned patient registers as a dosing engine or public content.
3. Define actual parent need, age range, primary intent and concise SEO title/description/H1. Write in an inviting educator/doctor voice: teach, inspire and answer questions, not internal audit talk.
4. Link parent hub → child page; child page → hub; add 2–3 context-relevant links and one measured Mamta appointment CTA. Never promise a confirmed appointment, vaccination reminder or diagnosis.
5. Use vetted official Dr Kanak/Mamta photos or genuinely illustrative AI imagery; retain original doctor identity and permissions. Optimise WebP, alt text, loading and mobile composition. Never publish identifiable hospital vaccination records or consent-unverified patient media.
6. Accessibility and technical QA: responsive at mobile sizes; meaningful H1, keyboard/focus, image alt, source links, clean canonical, public/private indexing, sitemap, schema only for true facts and no invented ratings.
7. Confirm authenticated publication consent/clinical review before labelling content as reviewed. Record reviewer/date only when genuinely approved.
8. Commit to GitHub `main`; wait for content check, TypeScript and Cloudflare Worker build to pass.
9. Confirm latest Cloudflare deployment and real URL `https://drkanak.com/` including desktop/mobile, image delivery, navigation and 404 behavior. GitHub CI success alone is not proof of a production deployment.
10. Update Drive tabs: Page Register state, SEO target/meta/internal links, sources/asset provenance, GSC validation date, next work, release link.

## Priority release queue
1. Source-backed Autism Hub `/autism/` and early developmental signs `/autism/early-signs/`: implemented in source, verify live deployment.
2. Vaccination Hub: resource directory implemented in source, verify live deployment.
3. **Built 27 Oct 2026:** `/autism/sensory-needs/` — responsive and evidence-informed parent guide on sensory differences, comfort, and everyday adaptations, linked from Autism Hub and navigation. GitHub CI passed; live URL and doctor approval still to verify.
4. **Next recommended page:** `/autism/communication-support/` — parent communication strategies, AAC awareness and support conversations after clinical review.
5. `/vaccination/record-keeping/` — blank sample card and privacy-first recordkeeping, without collecting any child data in public forms.
6. `/family-wellbeing/healthy-sleep/` — pediatric age ranges, not adult AHA targets.

The Drive register contains the rest of the roadmap and should remain the source of truth for ongoing prioritisation and release status.

## Measurable outcomes (future GSC/analytics inputs)
- Impression, click, CTR and query set per canonical URL (only after real GSC data has been connected).
- Discoverability: inclusion in sitemap, index coverage, internal link navigation and search results; do not claim indexing based on site code alone.
- UX: internal hub clicks, successful resource downloads and appointment-page visits; privacy-safe aggregated analytics only.
- Care enquiries: authorised hospital follow-up and outcomes only when confirmed in CRM; do not attribute revenue or appointment completions without system-of-record proof.

## Clinical and privacy guardrails
- The public site is information, not a diagnostic device. ADHD/autism pages do not assign labels, calculate clinical scores or prescribe treatment.
- Patient OS remains unverified for Mamta: do not claim activated vaccination reminders, verified guardian access, EHR integration or hospital CRM routing until live tenant tests and authorisation.
- Store staff/clinical review names and dates only after confirmation; never claim independent agency endorsement.
- Follow Google Search Central's people-first, trustworthy medical content standards: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Latest page release: Autism sensory needs (27 October 2026)
- Canonical URL: https://drkanak.com/autism/sensory-needs/
- Primary parent search intent: sensory differences in autistic children; adjustments for noise, light, touch, eating, movement and body awareness.
- Existing assets reused: `/images/illustrative-play-consultation.webp` and `/images/illustrative-family-consultation.webp` (AI-generated illustrative consultations, not real clinical encounter photos).
- Sources: NHS autism support, National Autistic Society sensory guidance, CDC signs and symptoms, NHS Autism Central sensory differences.
- Page component: `components/autism-sensory-support.tsx`; route registry: `lib/core-pages.ts`; styling: `app/globals.css`; backlinks: Autism hub and parent menu.
- No survey, child identifying data, diagnostic assessment, sensory score or promise of treatment. Clinical signoff and public deployment confirmation have not been recorded.
- Follow-up: investigate valid canonical page on the production domain, view it at mobile size, then update GSC and mark published only after verification.
