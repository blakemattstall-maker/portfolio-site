# Blake Stall portfolio

Static Next.js portfolio hosted on **Cloudflare Pages**, at https://blakestall.com.
No server functions, database, analytics, or runtime secrets are needed. The old
Vercel deployment and Thumb War backend are retired.

## Development and review

The redesign lives on `codex/portfolio-dev`, in the isolated local worktree
`/Users/blakestall/Portfolio-Site/dev`. The original checkout and production are
untouched. Run these commands from this directory:

```sh
npm ci
npm run dev
```

Open http://localhost:3001 for editing with automatic refresh.

To check the exact static output that Cloudflare will serve:

```sh
npm run check
npm run preview
```

Open http://localhost:4173. Preview handles clean project paths, the retired
Trifilm redirect, 404s, and video byte ranges. It binds only to this computer and
sends `noindex` headers. Rebuild after edits to refresh this exported preview.
`next start` is not used for a static export.

## Releasing when ready

1. Review the development preview at desktop, condensed, and phone sizes.
2. Run `npm run check` (lint plus production build).
3. Commit and push the development branch; open a pull request into `main`.
4. Review the diff before merging. If branch previews are enabled in Cloudflare,
   review that deployment too. Preview settings must be checked in the dashboard;
   they are not configured by this repository.
5. Merge into the production branch only when ready to publish.

Cloudflare Pages should use `main` as its production branch, `npm run build` as
its build command, and `out` as its output directory. These are the expected
settings for this source, not a claim that the dashboard has been inspected.
No deploy command runs automatically from local development. Never deploy this
branch directly to the production project while it is under review.

## Where to edit

- `src/content/site.ts`: all biography, project copy, homepage card summaries,
  and the dated Adobe MAX note (`site.home.current`). Update that note after the trip.
- `src/components/Canvas.tsx`: homepage, accessible project dialogs, navigation.
- `src/components/CaseContent.tsx`: case-study rendering.
- `src/app/globals.css`: palette and responsive layout rules.
- `public/images/`: prepared media. Originals remain outside the repository in
  `/Users/blakestall/Portfolio-Source-Media`.
- `public/_redirects`: Cloudflare redirects.

The existing case-study voice rules are at the top of `src/content/site.ts`.
The forthcoming Almanac explainer is not present yet. When supplied, place it
near the top of the case with a poster and explicit playback controls; keep the
current silent feature loops as supporting details. Do not add a dead play button.

## Responsive contract

- **1100px and wider:** introduction and portrait on the left, larger 2×2 work
  sheet on the right. Natural page height handles short windows and browser zoom.
- **600–1099px:** compact introduction beside portrait, then full-width 2×2 work.
- **Below 600px:** small portrait alongside the name, introduction, then single
  column projects with full readable captions and actions.
- Every grid track uses `minmax(0, ...)`; text remains in flow and wraps. No
  absolute-positioned text crosses a column boundary. Cards have no fixed height.
- Dialogs scroll independently, keep their close control available, trap focus
  natively, and restore focus. Video lightboxes are separate native dialogs.
- Existing clean URLs and old `?open=` links both work. Back/Forward follows
  project navigation. Reduced motion disables decorative animation.

## Build checks

`scripts/check-tk.mjs` rejects unfinished content on every build, independent of
hosting provider. It checks TypeScript string literals, ignoring comments and
placeholder-renderer regexes. Do not use fake metrics to pass it.

`BRAND.md`, `CONTENT.md`, `GATHER.md`, and `TODO.md` retain historical decisions;
this README and current source describe the current implementation.
