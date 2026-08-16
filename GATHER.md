# GATHER.md — what Blake collects to finish the site

Everything editable lives in `src/content/site.ts` (copy) and `public/images/`
(media). A photo slot becomes a real image the moment its entry gets a `src`.
Work through this in any order; each section is independent.

## 0. Voice pass (highest leverage, zero collecting)

Rewrite these strings in your own voice — they're my drafts, and you said so:

- `oneLiner` — the sentence under your name. The single most-read line on the site.
- `descriptor` — the three bullet lines. Facts, but your phrasing.
- `orbitLabels` — MARKETING / MEDIA PRODUCTION / AI BUILDER. Are these the three
  words you want orbiting your head? (They define the whole positioning.)
- `about.body` — three paragraphs. Mine are serviceable; yours will be better.
- `contact.heading` + `sub` — the closer.
- Ticker items — now de-targeted ("Open to work — internships, freelance, collabs").
  Reorder/reword freely; the credit line rides at the end.

## 1. Hero cutout — done, optional upgrade later

Your edited cutout shipped. If you ever reshoot: straight-on or 3/4, tack-sharp
eyes, hands/arms in frame add energy to cutouts, plain background lifts cleanest.
The Vision-framework cutout pipeline is one command away (see BRAND.md).

## 2. Work tiles (the 2×2 sheet) — 3 photos, 4:3-ish

- **Merch Line tile:** one hero product shot — the merch itself or the sales
  table mid-rush. Phone photo fine; loud > polished.
- **Trifilm tile:** client-safe gear/set photo — cases, rigs, the truck, a wide
  of a set with no client branding/screens visible.
- **PersonalOS tile:** app screenshot — I can capture this myself from the demo;
  say the word and pick a screen (dashboard? the 3D graph is the flashiest).
- **Reel tile:** already real (showreel thumbnail). Optional: a custom frame you
  like better than YouTube's pick.

## 3. Case studies — per case

**Merch Line (the flagship — needs the most):**
- The numbers: revenue and/or units, the 50%-of-student-body claim confirmed,
  anything on repeat buyers. (Replaces 2 TK chips.)
- What the campaigns actually were: channels, creative, drop mechanics, anything
  you tested. (1 TK chip.)
- One honest "what I'd change" paragraph. (1 TK chip.)
- 2 photos: campaign creative (poster/story/post) + the product.

**Reel:**
- Confirm the 6 videos and their one-liners; retitle or swap any.
- Optional: per-video real thumbnails (also unlocks real-image Thumb War rounds).

**Trifilm:**
- One client-safe story from a set + one number that makes it real (days on set,
  TB ingested, call times). (1 TK chip.)
- 2 photos: Kirkland/travel + gear (client-safe).

**PersonalOS — mostly on me:**
- `PersonalOS/docs/PersonalOS-Case-Study.md` is excellent and I can port it —
  the four-decisions structure, ~240 tests, ~$7/mo, the deleted-feature story.
  Your call needed on two things: tone-check my port, and decide whether the
  portfolio links the public repo and/or the read-only demo (repo is name-free
  by design today; linking it from your named site connects them forever). That
  decision is the last TK chip.
- Screenshots: I can take them from the demo myself.

## 4. About — 2 photos

- One BTS shot of you working (on set, behind a camera).
- The keyboard build.

## 5. Meta polish (mine, once imagery lands)

OG share image (1200×630) in the palette; real Thumb War thumbnails; any new
photos wired into slots. Ask me anytime.

## 6. The rule that guards all of it

`{{TK: ...}}` chips render loud and block production deploys once you delete the
`ALLOW_TK` env var in Vercel. When this list is done — delete it, and the site
can never ship an unfinished claim again.
