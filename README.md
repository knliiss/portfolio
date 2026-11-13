# Vitalii Lototskyi · Portfolio

Editorial, bilingual portfolio for a software engineer. Built with **Astro 6 + TypeScript**, static-first HTML, and deliberately minimal client-side JavaScript.

## Pages

- English and Ukrainian landing pages: /en/ and /uk/
- Four full engineering case studies per language: Mnemos, WaveCode, C7xBotManager, Studium
- Printable, accessible resume pages for both languages
- Minimal dark/light theme switch, no tracking, no backend

## Development

Requires Node.js 22.23.4+.

    npm install
    npm run check
    npm run test
    npm run build
    npm run dev

## Deployment

Builds to a static dist/ directory. Deploy it to a static hosting service (Cloudflare, GitHub Pages, etc.). Set SITE_URL to the final public domain and BASE_PATH to the hosting path, then build.

The project deliberately does not assume ownership of a custom domain. Before production, set the actual URL to produce correct canonical/hreflang/OG metadata. To enable sitemap generation, configure Astro's sitemap integration at deployment.

## Content

Case studies and both localizations live in src/data/content.ts. All figures are intentionally qualified rather than exaggerated. Product photography is linked from the author's own public GitHub repositories, while the C7xBotManager visual is a CSS/SVG diagram generated for this portfolio—not a fabricated product screenshot. Links and artifacts can be revised through the typed content data.

The resume sections are HTML and print-friendly, so visitors can open and save them as a PDF without a hosted form service. To add downloadable pre-rendered PDF files later, place them in public/cv/ and update the resume actions.

## Privacy and performance

No cookies, trackers, analytics scripts, or remote fonts. The only JavaScript running on static pages handles color theme persistence. Images use lazy loading where appropriate.

## Accuracy

Project descriptions are based on implementation details of the repositories; usage figures and awards are based on the author's confirmed statements. No runtime benchmark or employer affiliation is implied.
