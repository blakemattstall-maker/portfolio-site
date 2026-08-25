# TODO — path to internship-application-ready (rev. Aug 24)

Owners: **YOU** (Blake) · **ME** (Claude) · **US** (together).

## Done (as of tonight)
- Four case studies live with real media: Video Portfolio (8 clips), Trifilm
  (photos + the intern-week film link), Almanac (2 demo videos in phone frames,
  2 screens, globe tile, deep tech copy, stats, live-site CTAs), QsCables
  (scroll gallery + Reddit/Instagram marketing callout).
- About rewritten in Blake's voice; Resume Engine removed.
- Every user-facing em dash purged (the "sounds like AI" tell).
- Game moved to a corner controller icon; click-me/ink-splat removed.
- Videos autoplay silently and start from the top only when scrolled into view.
- Full desktop + mobile audit: no horizontal overflow anywhere, overlays and
  phone frames render clean at 375px, About head-crop fixed.
- Live at the vercel.app URL; auto-deploys on push.

## Before it's application-ready (critical path)

- [ ] **YOU — read every word as if you wrote it.** About, all four case
      studies, the descriptor bullets, the one-liner. Flag anything that isn't
      your voice and I'll fix it. (The one-liner "A curious student creative,
      becoming a strategist" is the one you were least sure of; a couple of
      alternates are in tonight's report.)
- [ ] **US — put it on blakestall.com.** This is the #1 item: applications
      should link your domain, not a vercel.app URL. Vercel → Domains → add
      blakestall.com; GoDaddy A/CNAME per Vercel; DO NOT touch MX (email).
      Then cancel Framer.
- [ ] **YOU — decide on a resume PDF.** Most applications expect one. Want a
      "Resume" download button on the site (I'd add it to the contact area)?
      If so, send the PDF.
- [ ] **YOU — the game.** You want it simpler/revamped. For applications it can
      stay as-is (tucked in the corner) or I can hide the controller until we
      rebuild it. Your call.

## Nice-to-have (not blocking applications)
- [ ] **ME — Vercel Analytics** (free) so you can see who visits.
- [ ] **ME — sitemap.ts + robots.ts** for SEO.
- [ ] **ME — video poster frames** so there's zero flash before a clip plays.
- [ ] **YOU — leaderboard** still has my test scores; clear the Upstash key or
      beat them (only matters if the game stays).
- [ ] Optional extra media: a couple more Trifilm set/gear stills if you have
      client-safe ones.

## Parked
- [ ] Game revamp (simpler concept, real thumbnails/metrics).
- [ ] Redbird Creative + Redbird Barbell cards once they have receipts.
- [ ] Almanac hardware add-ons, when there's media.
