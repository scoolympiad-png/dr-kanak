# Dr Kanak family wellbeing & autism illustrations — editorial source register
Date: 2026-10-27. Public content: `/family-wellbeing/stress/` and `/family-wellbeing/autism/`.

## Assets
These seven AI-generated graphics were created in the conversation for the Dr Kanak/Mamta parent-education project and then optimised as WebP for website delivery. They are illustrative (not photographs of patients or treatment outcomes).

- `/resources/stress-family-guide.webp`: all-in-one family stress poster
- `/resources/stress-calm-down-steps.webp`: gentle stress de-escalation
- `/resources/stress-daily-wellness.webp`: small, flexible daily wellbeing habits
- `/resources/autism-understanding.webp`: autism and diverse presentations
- `/resources/autism-family-support.webp`: family support strategies
- `/resources/autism-assessment-support.webp`: clinical conversations and services
- `/resources/autism-complete-guide.webp`: all-in-one vertical infographic

The website shows separate readable sections before and alongside the graphics and allows visitors to view/save full-size images. No real patient photos or identifiable child information were used to create these files.

## Research and important clinical distinctions
1. **American Heart Association**:
   - Stress Management: https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management
   - 3 Tips to Manage Stress: https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management/3-tips-to-manage-stress
   - Stress and Heart Health: https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management/stress-and-heart-health
   The AHA's 7–9 hours of sleep per night recommendation is **for adults**, not children. Some early AI illustrations repeat this adult figure beside drawings of children. The website foregrounds a neutral daily plan, supplies an adjacent correction on the all-in-one infographic and displays the age-specific pediatric sleep reference below. AHA guidance is a researched inspiration and not an AHA endorsement of this doctor, page or AI images.
2. **CDC pediatric sleep recommendations**: https://www.cdc.gov/sleep/about/
   Ages 3–5: 10–13 hours/day including naps; ages 6–12: 9–12 hours; ages 13–17: 8–10 hours. Do not use the adult recommendation as a pediatric target.
3. **WHO autism fact sheet**: https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders
   Autism is a diverse neurodevelopmental condition, with varying strengths and support needs. Prioritise agency, dignity, inclusion and individualised supports. Autism is not a result of poor parenting.
4. **CDC clinical autism screening**: https://www.cdc.gov/autism/hcp/diagnosis/screening.html
   AAP-referenced autism screening at 18 and 24 months as part of routine care, and additional evaluation whenever developmental concerns appear. A webpage and an infographic must not diagnose autism.
5. **CDC Screening & Diagnosis**: https://www.cdc.gov/autism/diagnosis/

## Website guardrails
- Public pages are written to help families, not as editorial audits or workflow logs.
- Distinguish adults' stress advice from pediatric sleep and child-specific adaptations.
- None of the images or activity suggestions should claim diagnosis, individual treatment, current appointments, medication advice, or guaranteed developmental outcomes.
- Do not advise stopping prescribed medication; medication concerns should be discussed with clinicians.
- Never imply that a staged Patient OS integration is functioning clinical assessment, scheduling or reminder delivery.
- Attribution and link to referenced health organisations, without claiming their partnership or approval.
- Obtain authorised clinical review by Dr Kanak or Mamta's clinical team before saying “medically reviewed” on the website.

## Integration
- Page routes registered as `stressGuide` and `autismGuide` in `lib/core-pages.ts`.
- Component implementation `components/family-wellbeing-guides.tsx`.
- Parent links added to homepage, parent resource hub, header and footer; styling in `app/globals.css`.
- This content does not submit or collect children's information.
