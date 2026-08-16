# Reference Research — distilled from 28-site review (Aug 2026)

Three research passes: 9 flagged portfolios, 12 more portfolios, 7 inspo/brand sites +
the old blakestall.com. This file is the keeper knowledge; raw per-site notes live in the
session archives.

## The verdict

Every single reference portfolio is a page-builder site (Framer ×6, Squarespace ×3,
Cargo ×3, Wix ×2, Webflow, Readymag, Carrd, Adobe Portfolio) running the platform's stock
animation primitives. Nothing in the set exceeds what Next.js + Motion + GSAP can do;
most is below it. **Five of the sites still carry Framer/Webflow's un-customized default
accent blue (`#0099FF` / `#3898ec`) — never use these hexes.**

The credibility split, consistent across all agents: disciplined near-monochrome + 1–2
accents reads professional; rainbow multi-hue + 4-6 mixed fonts reads art-school indie.
**Loudness that stays credible comes from three levers: SCALE (oversized display type,
negative tracking), MOTION (staggered reveals, marquees, pinned scenes), and COMMITMENT
(one premise carried into every corner, including 404s and form-success microcopy) — not
from hue count.**

## Old site inventory (content to migrate before Framer dies)

Platform: Framer "StoryStream" template, barely customized — OG share image is still the
template's own marketing screenshot; 404 meta description is unedited template copy.
Design was Inter + Syne, charcoal + hot red `rgb(255,0,13)` — the stock videographer look.

**Videos (YouTube, channel "Blake Matthew" @BlakeMatt):**

| ID | Title | Note |
|---|---|---|
| `QBmQVm6qBg8` | Gonzo Recap V2 | was the showreel |
| `8nQZRL5_Bgk` | Cinematic Workout Sequence | reel piece |
| `GNrm7LdIxZs` | Acton Contest Video 1 | school tie-in |
| `LHQpXGTwbxk` | Breaking Grounds In Music Commercial | real client |
| `4B626q57J5c` | Zevia Summer Drink Commercial | spec |
| `XtaIgoFJZnI` | Seq3v2 2 | raw filename — rename or cut |
| `dlFG1q6c2kc` | Oreo Spec Commercial | spec, vertical 9:16, 3D motion graphics |

**Bio facts:** shooting since 2017 ("a cheap camera and the first video editor I could
find"); 20+ client projects in the past year; directed *The Age of Isolation* mini-doc
(screened July 2025, made with his Acton graduating class); lifelong Chicago suburbs.
**Client logos:** Acton Academy, Love Local Media, Music IN Breaking Grounds.
**Contact:** blake@blakestall.com · IG @blakemattbts · YouTube @BlakeMatt · LinkedIn /in/blakestall.

## Mechanics library (ranked, deduped)

Signature-hero candidates (all proven desktop+mobile in the reference set):

1. **Bistable labeled toggle** — operate.so's "Chaos ⇄ Clarity": ~70 SVG shapes morph
   between scattered and aligned states via plain CSS transitions; shipped separate
   purpose-built desktop/mobile markup. Best narrative fit for a pivot story.
2. **Pinned/fixed hero with content scrolling over it** — seeunis.me (`position:fixed` +
   spacer div) and brittanytoombs.com (sticky full-bleed backdrop). Pure CSS, identical
   rules across breakpoints.
3. **Word-by-word staggered headline reveal** — blur/rise/scale per word (seeunis.me),
   per-character splits (wildyriftian). Load/scroll-triggered → inherently touch-safe.
   GSAP SplitText (now free) or Motion stagger.
4. **Ambient site-wide video underlay** — lewvvk's background-video-with-panel;
   derekshafer's autoplay muted loop reel. `autoplay muted loop playsinline` + poster =
   iOS-safe. The one medium Blake owns that no reference designer does.
5. **Marquee/ticker band** — pure CSS translateX loop, cheapest loud mechanic, touch-identical.

Supporting cast: video-first project tiles (Toombs) · desaturate-at-rest → color on
hover/in-view (simonkamali) · hover/tap thumbnail state-swap incl. animated variant
(TitleScream's `_thumb`/`_thumb_over`/`_thumb_animated`) · die-cut sticker photo
treatment w/ white border + shadow (ounlidos) · pinned-image/scrolling-text split
case-study sections (pizzeriabeddia) · zigzag alternating case rows w/ clean 1-col mobile
collapse (derekshafer) · WebGL film-grain that self-destroys on `prefers-reduced-motion`
(madisonhartzell) · status/availability chip + "currently viewing" wayfinding (xiushoppe)
· mono-font credibility stamps: geo-coords, class-of (wildyriftian) · commit-the-bit
throwaway states: joke in the age-gate rejection (sacredseltzer), voice in the marquee
(ounlidos) · draggable elements with native touch support (pohwp, react-draggable) ·
named per-category color mapping (malaproject's 18 named hues) · footer version/changelog
line (ronaldlu).

## Type findings

- The current pattern: **one big expressive display face + one small mono/technical
  label face + one neutral body**. Each font gets exactly one job.
- Closest industry peer (madisonhartzell — entertainment marketing): Anton display +
  Epilogue body, zero hue, photography carries all color. Proof the 2-font discipline
  works for exactly Blake's audience.
- Anti-patterns seen in the wild: "Unlicensed Trial" webfonts in production (2 sites),
  4-6 fonts with overlapping jobs, testimonial wall before outcomes, hover-only signature
  mechanics (dead on touch), fixed-pixel desktop-only heroes.

## Blocked sites

angelinawwu.com (Vercel bot wall) and ryanpatterson.cargo.site (set private) could not be
analyzed — Blake browses manually if curious. mikaela-jane.com/posters 404s (page gone).
