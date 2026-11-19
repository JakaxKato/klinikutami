# Reimagined SAMI website

The visual direction was generated with the built-in image generator, using the existing clinic treatment photo and official logo as references. No separate tool named Imagine was exposed in the session.

`concept.png` is a design reference, not a runtime image. The implementation uses original clinic assets and real HTML text, preserving verified doctors, nine services, eleven schedule records, reviews, and contact destinations.

The subsequent user update replaces the hero and gallery photography with attributed Unsplash illustrations. It also adds npm-installed Motion, bundled locally with esbuild. The generated concept remains an archival layout reference.

The user later selected the pre-reimagine design again. That original visual layout is now the implemented version, with Motion and Unsplash photography retained. Source credits remain in `assets/sources.json` and are not displayed on the page. This directory is an archive of the abandoned visual direction.

## Generation prompt

Create a sophisticated Indonesian dental clinic homepage for Klinik Utama SAMI / Sukabumi Dental Care. Use the existing treatment photo and official logo. Warm white #FAFBF8, deep ink navy #18394A, pale blue #EAF2F5 and restrained accent #075EA8. Pair clean sans typography with Newsreader italic. Use a quiet rectangular header with a fine border, an asymmetric hero with “Senyum sehat, lebih dekat.” on the left and a softly rounded treatment photo on the right, one main contact action, and a discreet location line. Add a three-step patient guide and flat numbered service rows. Avoid invented ratings, statistics, certifications, prices and treatment promises. Calm, warm, refined medical editorial design.

## Implementation

- Header, hero, patient guide, services, about section and section headings are native HTML/CSS.
- Services and doctor profiles use native `details` elements.
- Original assets remain local; no new remote font, image or animation dependencies.
- Existing map remains loaded only when requested.
- Responsive verification covers 360, 390, 768, 1024 and 1440 pixel widths.
