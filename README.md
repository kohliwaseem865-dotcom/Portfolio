# Waseem Kohli — Portfolio

A premium, interactive 3D developer portfolio. Built with Next.js (App Router),
TypeScript, Tailwind CSS, Three.js / React Three Fiber / Drei, Framer Motion and
Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Make it yours — everything lives in `src/data/`

No component edits needed for the common changes:

| What | File |
| --- | --- |
| Name, role, headline, intro, SEO, **photo path** | `src/data/site.ts` |
| About paragraphs + focus areas | `src/data/about.ts` |
| Skills & levels | `src/data/skills.ts` |
| Projects (incl. GitHub / demo links, case-study fields) | `src/data/projects.ts` |
| Services | `src/data/services.ts` |
| Journey / experience timeline | `src/data/journey.ts` |
| Stats (numbers shown in About) | `src/data/stats.ts` |
| Social links | `src/data/socialLinks.ts` |
| Nav items | `src/data/navigation.ts` |

### Add your photo
Save it as `public/profile.jpg`. Until then the About section shows a monogram.
See [`public/README.md`](public/README.md).

### Add real project links
In `src/data/projects.ts`, set `github` / `demo` to real URLs. Leave them `null`
to show a clearly-marked "coming soon" state — links are never faked.

### Deploy
Set `site.seo.url` in `src/data/site.ts` to your real domain (for canonical URLs,
sitemap and Open Graph), then deploy to any Node host (Vercel recommended).

## Architecture

```
src/
  app/            layout, page, globals.css, icon, opengraph-image, sitemap, robots
  components/
    Navbar/ Hero/ About/ Skills/ Projects/ Services/ Journey/ Stats/ Contact/ Footer/
    Cursor/ LoadingScreen/
    3d/           HeroScene/ Particles/ FloatingObjects/
    ui/           reusable primitives (SectionHeading, Reveal, MagneticButton, …)
  data/           all editable content
  hooks/          device performance, reduced-motion, scroll spy, count-up, …
  lib/            small utilities
```

## Notes on quality & honesty
- No fake testimonials, companies, awards, clients, revenue or invented repos.
- Stats and timeline are editable and framed as a learning journey.
- 3D is lazy-loaded, scaled down on mobile/low-power devices, and disabled under
  `prefers-reduced-motion` (a lightweight static fallback is shown instead).
- The contact form has client-side validation and uses `mailto:` — no API keys
  are ever placed in the frontend.
