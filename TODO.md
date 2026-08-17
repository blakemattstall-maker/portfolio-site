# TODO — ordered until launch

Owners: **YOU** (Blake) · **ME** (Claude) · **US** (together). Work top to bottom;
phases 1–3 can overlap, 4 needs 1–3 mostly done, 5 is launch day.

## Phase 1 — Words (no materials needed, highest leverage)

- [ ] **YOU — Ink verdict.** Click your face on the live site. Keep the splat or
      say "kill it" — last call.
- [ ] **YOU — Voice pass** on `src/content/site.ts`, top to bottom: the one-liner
      (current: "A curious student creative, becoming a strategist." — alternates
      in chat history), the three descriptor bullets, orbit labels, About
      paragraphs, contact heading/sub, ticker items. Edit the file directly or
      dictate to me. Rule of thumb from your wording model (stephsmith.io):
      every claim carries its receipt, chatty register, specific-weird > generic.
- [ ] **ME — Rebuild the OG share card** once the one-liner is final (the card
      bakes the text in).

## Phase 2 — Media (gather as you go)

- [ ] **YOU — Photos**, phone-quality fine, full res:
      - Redbird Creative: first shipped piece + on-the-job/team shot (tile + 2 slots)
      - Trifilm: client-safe gear/set photo + Kirkland/travel shot (tile + 2 slots)
      - About: one BTS shot of you working + the keyboard (2 slots)
- [ ] **YOU — Pick the PersonalOS screen** for its tile (dashboard vs the 3D
      graph). **ME — capture the screenshots** from the demo and wire all slots.
- [ ] **YOU — Confirm the reel**: the 6 videos and their one-liners in site.ts —
      retitle/swap/cut freely.
- [ ] **YOU (optional) — Real thumbnails** for the reel videos; also unlocks
      real-image Thumb War rounds. **ME — wire them.**

## Phase 3 — Facts (kills the TK chips)

- [ ] **YOU — Trifilm story**: one client-safe set anecdote + one real number
      (days on set, TB ingested, call times).
- [ ] **YOU — PersonalOS link decision**: does the portfolio link the public
      repo / read-only demo? (Repo is name-free today; linking connects it to
      your name permanently.)
- [ ] **ME — Rephrase the Redbird Creative placeholder** to non-TK copy so the
      card reads "receipts land here" without tripping the deploy gate.

## Phase 4 — Hardening (mostly ME)

- [ ] **ME — Enable Vercel Analytics** (free tier; one component + dashboard
      toggle — **YOU** flip the toggle when I say).
- [ ] **ME — sitemap.ts + robots.ts** (5 minutes, matters at cutover).
- [ ] **US — Real-phone pass**: you open the site on your actual phone, we fix
      whatever looks off (throttled-tab testing can't catch feel).
- [ ] **ME — Lighthouse + accessibility sweep**: contrast, focus states,
      keyboard nav through overlays and the game, image weights.
- [ ] **YOU — Safari check** (cursor PNG fallback, splat, game) if you have
      Safari handy; **ME** — everything else cross-browser via tooling.
- [ ] **YOU — Leaderboard**: beat CLD 777 or delete the `thumbwar:scores` key
      in Upstash's data browser for a clean board.

## Phase 5 — Launch day

- [ ] **ME — Arm the TK gate**: remove `ALLOW_TK` from Vercel env once phases
      1–3 are done. From then on, unfinished claims physically can't deploy.
- [ ] **YOU — Domain cutover** (your stated last step):
      1. Vercel dashboard → portfolio-site → Settings → Domains → add
         `blakestall.com` (+ `www`).
      2. GoDaddy DNS: set the A / CNAME records Vercel shows.
         **Touch nothing else — especially not MX** (blake@blakestall.com
         lives on those records).
      3. Wait for green checks in Vercel.
- [ ] **US — Post-cutover verify**: blakestall.com loads the new site, an email
      to blake@blakestall.com still arrives, share preview shows the OG card
      (fresh domain = no stale cache).
- [ ] **YOU — Cancel Framer.** The $10/month that started this whole project. 🎉
- [ ] **YOU — Point everything at blakestall.com**: LinkedIn, resume, IG bio.
- [ ] **YOU — Resume side-quest** (from the audit): next resume revision, decide
      whether the E-League line survives the same defensibility test.

## Ongoing (not launch-blocking)

- [ ] **YOU — Redbird Barbell receipts**, starting BEFORE the first meeting:
      baseline follower/member screenshots today, then every flyer, post, event
      photo, attendance count. Becomes the campaign card that replaces nothing —
      it earns its own slot.
- [ ] **YOU — Redbird Creative receipts** as pieces ship (full-res + numbers).
- [ ] **US — Card swaps each semester**: retire weakest card as stronger
      current-tense work lands.
