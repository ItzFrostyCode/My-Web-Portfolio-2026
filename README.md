# Joshua Wayman A. Arabejo — Cinematic Portfolio

Premium, scroll-driven personal portfolio. Ink black `#050505`, emerald accent,
warm cream typography, film grain, Lenis smooth scrolling, GSAP ScrollTrigger,
and a scroll-scrubbed hero video canvas.

## Stack
Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger ·
Framer Motion · Lenis · Lucide Icons · React Three Fiber + Drei (installed, ready for 3D extensions)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Cinematic videos

The **Hero Orbit** is already wired in: it streams from a hosted URL in `content/media.ts` and works out of the box. For faster loads (and full canvas frame-scrubbing), download that mp4 and save it as `public/media/hero-orbit.mp4` — the site automatically prefers the local file.

### Adding the remaining clips

Place the three Seedance 2.0 clips (1080p, 16:9, ~8s, no audio) here:

| File                       | Scene                                   | Used by                    |
| -------------------------- | --------------------------------------- | -------------------------- |
| `public/media/hero-orbit.mp4` | Hero Orbit — 360° orbit, emerald rim   | Scroll-scrubbed hero canvas |
| `public/media/builder.mp4`    | The Builder — holographic workspace    | About section               |
| `public/media/closer.mp4`     | The Closer — gallery walk, hero pose   | Contact section             |

No code changes needed — the site detects the files automatically. Until they
exist, each slot renders a styled emerald placeholder.

The hero extracts 96 frames from `hero-orbit.mp4` client-side and scrubs them
on a `<canvas>` with cross-fade frame interpolation tied to 300vh of pinned scroll.

## Edit your content

- `content/projects.ts` — add / remove / edit featured projects
- `content/socials.ts` — GitHub, LinkedIn, Facebook, Email, Resume links
- Contact email lives in `components/sections/Contact.tsx` (the "Contact Me" button)

## Structure

```
app/          layout, page, globals.css, self-hosted fonts
components/
  canvas/     HeroScrub (scroll-scrubbed frame canvas)
  providers/  SmoothScroll (Lenis + GSAP sync)
  sections/   Hero, About, Stats, Pillars, Projects, Skills, Contact
  ui/         KineticText, Counter, CinematicVideo
content/      projects.ts, socials.ts  ← edit these
hooks/        usePrefersReducedMotion
lib/          utils (cn)
types/        shared interfaces
public/media/ your video files go here
```

## Accessibility & performance
- `prefers-reduced-motion` disables smooth scroll, pinning, and grain animation
- Visible keyboard focus rings, semantic landmarks, aria labels
- GPU-composited transforms only; sections below the fold are dynamically imported
- Fonts self-hosted via `next/font/local` (zero external font requests)
