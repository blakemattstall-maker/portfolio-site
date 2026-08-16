# BRAND.md — blakestall.com

> **STATUS: v2 — THE DESK (one-screen canvas), pivoted at Blake's direction 2026-08-16.**
> v1 ("THE GRADE", long-scroller) was fully discarded — Blake's read: it felt like an
> agency, not a person. v2's references: **design.fago.us** (one viewport, name left,
> tilted contact-sheet object holding the work, chip nav) and
> **andreacruzportfolio.com** (background-removed cutout of the person set into a solid
> color field, orbited by role labels). Not copied — pivoted toward.

## The concept

Everything lives on ONE screen (desktop: literally no scroll — `overflow: hidden`).
Depth opens in overlays, never pages: each work tile, About, and Contact open a paper
"sheet" modal over the canvas. `?open=<slug|about|contact>` deep-links any overlay.

Canvas composition (desktop): name + one-liner + descriptor + status + social chips
(left) · Blake's cutout with three orbiting role labels (center) · tilted contact-sheet
with the 2×2 work grid and About/Contact chips (right) · credentials ticker along the
bottom edge · doodles (squiggle, star, arrow) scattered.

Mobile: same elements stacked compactly; currently scrolls ~1.5 screens — flagged to
Blake as an open call (strict no-scroll on phones means shrinking everything).

## Palette — Blake's own (supplied 2026-08-16)

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F9FAF4` | off-white — sheet/modal surfaces, text on field, ticker bg |
| `field` | `#4A6163` | slate teal — THE background |
| `peach` | `#F9A66C` | accent 1 — labels, diamonds, tags |
| `sun` | `#FFC94B` | accent 2 — squiggle, About chip, TK chips |
| `coral` | `#F17A7E` | accent 3 — star, Contact chip, hot moments |
| `ink` | `#2E3E40` | derived dark slate — text on paper/accents |

Rules: accents color small objects (chips, diamonds, doodles, labels) — never body
text. Text is paper-on-field or ink-on-paper only.

## Type

Clash Display 600/700 (display, self-hosted, Fontshare ITF license) · Switzer
400/500/700 (body, same license) · JetBrains Mono 400/500 (eyebrows/labels, OFL via
next/font). Unchanged from v1 — carried across the pivot.

## Imagery system

- **Cutout:** `public/images/cutout-web.png` — background removed natively via macOS
  Vision (script: scratchpad cutout.swift pattern; rerun on any new photo).
- **Photo slots:** dashed frames rendered wherever real media belongs — work tiles,
  case modals, About. Defined in `site.ts` as `photos: [{label, src?}]`; giving a slot
  a `src` swaps the frame for the image. Blake fills these as he gathers media.
- Real imagery present so far: the showreel's YouTube thumbnail (reel tile).

## Hard rules (carried from v1 + new)

- $0, properly licensed fonts only; never platform-default blues (`#0099FF`/`#3898EC`).
- `{{TK:}}` placeholders render loud and block Vercel deploys (scripts/check-tk.mjs).
- **Entrance animations are pure CSS** (`.enter`, `--d` delay) — JS/rAF-driven
  entrances freeze in throttled tabs and can leave content invisible. Motion (the
  library) is only for pointer-driven moments: hovers and overlay open/close.
- Every hover affordance has a tap/visible equivalent; `prefers-reduced-motion`
  respected everywhere (entrances, floats, ticker, blink).
- Overlays: ESC + backdrop click close; internal scroll allowed inside the sheet.

## v2.1 additions (2026-08-16, after Blake's hero/3D/minigame direction)

- **Hero, Jitu-Raiyan-style:** cutout enlarged to a true hero figure (54–66dvh),
  left-leaning into the composition; labels overhang the silhouette as stickers
  (center column carries `z-20` so they ride over neighbors). Availability pill
  top-right; coral **Hire me →** pill in the left column; credit line moved into
  the ticker.
- **Subtle 3D:** pointer-parallax via CSS vars `--mx/--my` set rAF-throttled on the
  canvas root; layers opt in with `.plx` + `--px/--py` depth (name 5px, cutout 14px,
  doodles 22px); the sheet gets `.plx-tilt` (≤2.4° perspective tilt). Fine pointers
  only; reduced-motion and touch get none. Full WebGL scenes (Kage/Towers-style)
  deliberately deferred.
- **THUMB WAR minigame + realtime leaderboard:** 30-second A/B thumbnail speedrun —
  every pair encodes a real thumbnail principle and flashes the "why" after each
  pick. Scores post with 3-letter arcade initials to `/api/scores` (validation,
  tiny blocklist, per-IP rate limit) and every open viewer's board updates live
  over SSE (`/api/scores/stream`). Store is adapter-based: in-memory in dev,
  **Upstash Redis via Vercel Marketplace at deploy** (Blake's pick) — wire
  `UPSTASH_REDIS_REST_URL/TOKEN` and it switches automatically. Game opens from
  the sheet's **Play ▸** chip or `?open=game`.
- **Mobile stance (Blake's call):** desktop strictly no-scroll; phones keep the
  compact ~1.5-screen stack.

## File map

`src/components/Canvas.tsx` (the screen) · `CaseContent.tsx` (overlay bodies) ·
`VideoGrid.tsx` (reel grid + lightbox) · `ui.tsx` (Copy/TK renderer, name stagger) ·
`src/content/site.ts` (ALL copy/data) · `src/app/globals.css` (tokens + animation).
