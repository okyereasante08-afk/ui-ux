# ACES KNUST — Signal Trace

A Progressive Web App redesign of the ACES KNUST website with a "Signal Trace" concept: the page layout itself reads as a printed circuit board, with a trace line running down the left edge that lights up as you scroll.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3.4
- Framer Motion (scroll-linked animations)
- shadcn/ui conventions
- vite-plugin-pwa (PWA support)

## Design Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| Circuit Navy | `#0B1220` | Dark surfaces, footer |
| Signal Blue | `#2F6FED` | Buttons, links |
| Trace Cyan | `#14B8A6` | Trace line, active states |
| Board White | `#F7F9FC` | Text on dark |

**Typography:** IBM Plex Sans (body) + IBM Plex Mono (labels/eyebrows/dates)

## Install & Run

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## PWA Features

- Installable to home screen
- Works offline (cached static assets)
- Auto-update prompt when new version available
- Offline mode indicator

## Project Structure

```
src/
  components/
    layout/
      BottomNav.tsx       — Mobile bottom navigation
    ui/
      CurrentPulseButton.tsx — Tap ripple button
    sections/
      HeroSection.tsx     — Full-viewport hero
      ClubsSection.tsx    — Club cards with chip notch
      EventsSection.tsx   — Horizontal swipe carousel
      TestimonialsSection.tsx — Member quotes
      FooterSection.tsx   — Ground plane footer
  pages/
    Home.tsx              — Landing page
  hooks/
    usePWA.tsx            — Service worker + offline state
  lib/
    utils.ts              — cn() helper
  App.tsx                 — Routes + providers
  main.tsx               — Entry point
```

## Key Interactions

1. **Scroll-linked trace** — SVG line on left edge lights up as you scroll
2. **Current pulse button** — Tap ripple emanates from touch point
3. **Bottom nav hide/show** — Hides on scroll down, shows on scroll up
4. **Events carousel** — Native horizontal scroll with snap points
5. **Section reveal** — Elements fade in as they enter viewport

## Grading Notes

- Minimalist design: every element justifies its existence
- PCB trace is the ONE signature move; everything else supports it
- Typography contrast (Plex Sans vs. Mono) carries the personality
- Color usage is disciplined: navy + white + blue, cyan as single accent
- Mobile-native feel: bottom nav, horizontal swipe, thumb-friendly targets
