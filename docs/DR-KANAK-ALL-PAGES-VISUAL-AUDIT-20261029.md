# Dr Kanak complete visual audit and replacement plan — 29 October 2026

The site registry contains **65 routes**. All of them are listed, with canonical links, in `docs/DR-KANAK-ALL-PAGES-VISUAL-LINKS.csv`.

## Site-wide corrections
- Original route-specific illustrations replace duplicated AI doctor-parent consultation visuals in highlighted autism, vaccination, child-development, ADHD and wellbeing content.
- Genuine Dr Kanak and Mamta Hospital images are preserved only where they authentically show the doctor or facility.
- The homepage doctor portrait uses an existing verified photographic Dr Kanak asset rather than repeated synthetic doctor visual treatment. Activity-focused photography is added in a separate home section (distinct from the doctor portrait).
- Each page has a unique activity illustration assigned in `lib/page-visuals.ts`; the shared page intro renders it for articles and care/service pages.
- On specialised pages, direct hero visuals are updated to show activity rather than repetitive doctors sitting at a desk.
- Parent-facing pages must never contain audit/internal language. Illustrated children are never labelled as diagnosed or as hospital patients.

## Visual QA status
The code-level route audit checks all 65 page routes, and photo provenance is kept separately. **Not yet a pixel-by-pixel browser audit of every page**. Run production screenshot review for 360px/mobile and desktop after Cloudflare build. Check layout, crop, alt text, missing images, asset response, title, responsive links and genuine-photo provenance.

## Photography licences
Stock photos in activity strips are generic illustrations of daily life, not clinical evidence or endorsements. Sources may include public Unsplash free-use image URLs; review Unsplash licensing and model/property releases for sensitive medical marketing before broader distribution. https://unsplash.com/license and https://help.unsplash.com/en/articles/2612329-releases-and-trademarks

## Rules
1. No repetitive AI synthetic clinician portraits on multiple priority pages.
2. Every visually featured page has its own activity motif and colour treatment.
3. Real authenticated Dr Kanak clinical imagery only for identity and medical visits.
4. Human activity visuals are generic and never identify an autistic child or patient.
5. Preserve pages for the complete route inventory and require build checks.
