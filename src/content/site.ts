/**
 * All site copy and data lives here. Design lives in globals.css/BRAND.md.
 * VOICE RULE (Blake, permanent): everything on the site is written as if
 * Blake is saying it — first person, his register. No third-person bios.
 * Placeholder markers (the double-brace TK syntax; see scripts/check-tk.mjs)
 * mark a fact only Blake can supply — rendered loud, and they block deploys
 * while any remain.
 * `photos` entries are blank slots (dashed frames) until Blake drops real media
 * into public/images/ and adds a `src` to the slot.
 */

import type { Block } from "@/components/RichBlocks";

export type Accent = "peach" | "sun" | "coral";

/** Stable DOM id for a desk project, so the canvas can deep-scroll to it. */
export const deskId = (title: string) =>
  `desk-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export const site = {
  name: "Blake Stall",
  email: "blake@blakestall.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/blakestall" },
    { label: "Instagram", href: "https://www.instagram.com/blakes.tall/" },
  ],
  oneLiner: "Marketing student and compulsive builder creating videos, brands, and software.",
  descriptor: [
    "marketing major @ illinois state",
    "three years behind a camera",
    "i build software people actually use",
  ],
  status: "Open to work · Summer 2027",
  orbitLabels: [
    { text: "MARKETING", accent: "peach" as Accent },
    { text: "MEDIA PRODUCTION", accent: "sun" as Accent },
    { text: "CURRENTLY BUILDING…", accent: "coral" as Accent },
  ],
  ticker: [
    "Open to work · Summer 2027",
    "GA4 certified",
    "HubSpot Content Marketing certified",
    "Adobe Student Ambassador",
    "Jesse W. Fell Scholar",
    "Dean's List ×2",
  ],
  credit: "hand-built · no templates · v2 · 08.2026",
  about: {
    heading: "About me",
    body: [
      "Hi, I'm Blake! I study marketing at Illinois State University, and you can usually find me skipping sleep to work on a new project! Off the clock I lift weights (I'm the marketing chair of Redbird Barbell!) and play video games (I was on my university's Valorant team, and we made it to two tournament finals in one semester!).",
      "I love pulling concepts out of the classroom and using projects as a way to learn on my own terms! I'm aiming for marketing analytics, product marketing, and brand strategy, and I'm always up to connect & chat!",
    ],
    stamps: ["20+ PROJECTS", "CLASS OF 2029"],
    photo: { src: "/images/proj/about-mountains.jpg", caption: "Out west, summer 2026" },
    desk: [
      {
        title: "The Keyboard",
        label: "Where it started",
        date: "2022",
        status: "SHIPPED",
        blurb: "A 40% mechanical keyboard I designed and built from nothing: the key layout, the switch plate, the PCB, and the case, all of it. I finished it in October 2022, a month before ChatGPT launched.",
        blocks: [
          { kind: "photo", src: "/images/proj/kb-layout.png", caption: "1. Started with the layout, a 40% with a few keys moved to where I actually reach for them." },
          { kind: "photo", src: "/images/proj/kb-cad.png", caption: "2. Modeled the whole case from scratch in Fusion 360, learning as I went: tight tolerances, sizing the screw holes so the screws actually fit, and when to fillet an edge versus chamfer it." },
          { kind: "photo", src: "/images/proj/kb-pcb.jpg", caption: "3. Designed the board by hand in KiCad, powered by a microcontroller I soldered on and flashed with custom firmware." },
          { kind: "photo", src: "/images/proj/kb-case.jpg", caption: "4. Resin printed the case, dialing in the fit until it was right. I went resin for the accuracy, the smooth finish, and the low cost, all at once." },
          { kind: "photo", src: "/images/proj/kb-weight.jpg", caption: "5. A faux-brass weight in the base, purely cosmetic. It's actually resin too, painted to look the part." },
          { kind: "photo", src: "/images/proj/kb-final.jpg", caption: "6. Hand-painted, finished, and screwed shut. It's the one I type on every day." },
          {
            kind: "text",
            body: "There was no model to ask. The layout, the CAD, the board, and the firmware were six months and hundreds of hours in programs I had never opened.",
          },
        ] as Block[],
      },
      {
        title: "Almanac",
        status: "RUNNING",
        blurb: "My AI operating system. It runs my life daily, and the full story is in the work grid. Hardware add-ons are in the works.",
      },
    ],
  },
  contact: {
    heading: "Reach out:",
    sub: "If you need someone who can shoot the thing, cut the thing, build the thing, and read the dashboard after it ships, say hi.",
  },
};

export type Video = { id: string; title: string; context: string; date: string };

export const videos: Video[] = [
  { date: "May 2026", id: "7n0jBKk99RI", title: "Rage in the Birdcage", context: "Hype edit for an MMA club fight night." },
  { date: "Oct 2025", id: "QBmQVm6qBg8", title: "Powerlifting Meet Recap", context: "Powerlifting meet-day hype edit. I also competed and cameo in the video!" },
  { date: "Nov 2025", id: "7thI9wz33cE", title: "Authava Sizzle Reel", context: "Brand sizzle video for an AI infrastructure company." },
  { date: "Aug 2024", id: "4B626q57J5c", title: "Zevia Spec Commercial", context: "Product spec shoot for a summer soda alternative." },
  { date: "Jun 2025", id: "LHQpXGTwbxk", title: "Breaking Grounds In Music", context: "Commercial for a local music school." },
  { date: "Jun 2024", id: "dlFG1q6c2kc", title: "Oreo Spec Commercial", context: "Vertical spec spot with 3D falling-cookie motion graphics." },
  { date: "Mar 2025", id: "8nQZRL5_Bgk", title: "Cinematic Workout Sequence", context: "A personal craft piece to practice lighting and pacing." },
  { date: "Aug 2025", id: "GNrm7LdIxZs", title: "Acton Contest Video", context: "A competition piece I made through Acton Academy." },
];

export type CaseSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type PhotoSlot = {
  label: string;
  src?: string;
  aspect?: string;
  pos?: string;
  link?: { label: string; href: string };
};

export type WorkItem = {
  slug: string;
  index: string;
  kind: string;
  title: string;
  tileHint: string;
  accent: Accent;
  outcome: string;
  meta: { role: string; timeline: string; status: string };
  trailer: { outcome: string; moves: string[] };
  photos: PhotoSlot[];
  sections: CaseSection[];
  isReel?: boolean;
  thumb?: string;
  link?: { label: string; href: string };
  links?: { label: string; href: string }[];
  gallery?: { src: string; caption?: string }[];
  stats?: { value: string; label: string; href?: string }[];
  blocks?: Block[];
};

export const work: WorkItem[] = [
  {
    slug: "videography",
    index: "01",
    kind: "Video",
    title: "Video Portfolio",
    tileHint: "",
    accent: "sun",
    outcome: "Three years behind a camera, 20+ projects, shot and edited. Here are my favorites.",
    meta: { role: "Videographer & Editor", timeline: "2023–Present", status: "Ongoing" },
    isReel: true,
    thumb: "https://i.ytimg.com/vi/7n0jBKk99RI/maxresdefault.jpg",
    trailer: {
      outcome: "20+ video projects, shot and edited. Here are my favorites:",
      moves: [
        "I run the whole thing myself, from conceptualizing and pitching, to shooting, to editing, all the way to delivering the final cut.",
        "I shoot on Sony and Blackmagic cinema systems, then bring it home in the Adobe Creative Suite.",
        "I light the set, rig the mics, haul the gear, and handle all the media. I'm hands-on for every part of it.",
      ],
    },
    photos: [],
    sections: [],
  },
  {
    slug: "redbirdfuel",
    index: "02",
    kind: "Product",
    title: "Redbird Fuel",
    tileHint: "",
    accent: "peach",
    thumb: "/images/proj/rf-tile.jpg",
    outcome: "I built a free meal planner for Illinois State's dining halls that hits your protein and calorie targets off the day's real menus. 42 students were using it inside a week.",
    meta: { role: "Solo product owner", timeline: "Aug 2026 · Illinois State", status: "Live on campus" },
    link: { label: "Visit redbirdfuel.com", href: "https://redbirdfuel.com" },
    stats: [
      { value: "42", label: "students set up in week one" },
      { value: "1,200+", label: "meals generated, week one" },
      { value: "3 days", label: "to build and ship V1" },
      { value: "60 cal", label: "worst miss in 480 test plans" },
    ],
    trailer: {
      outcome: "Redbird Fuel builds a day of dining-hall meals that hits your protein and calorie targets, off what Watterson and Linkins are actually serving. It's free, it plans before it asks you for anything, and the math runs in your browser.",
      moves: [
        "Shipped V1 in a three day rush, then launched it by QR code at a Redbird Barbell meeting.",
        "42 students set it up in week one, and the app generated over 1,200 meals.",
        "V2 shipped five days later, straight out of tester feedback.",
      ],
    },
    photos: [],
    blocks: [
      {
        kind: "list",
        heading: "Why it exists",
        intro: "I'm the marketing chair of Redbird Barbell, and I kept hearing the same sentence: it's so hard to hit my goals while eating at dining. Everyone's workaround was three chores, every meal.",
        items: [
          "Google each dish, one at a time.",
          "Weigh the serving, then do the macro math.",
          "Keep all of it in one more tracker.",
        ],
      },
      {
        kind: "feature",
        side: "right",
        media: "photo",
        src: "/images/proj/rf-today.jpg",
        heading: "A plan before you sign up",
        body: "Most apps want an account before they show you anything. This one hands you a working plan first, anonymously. Email comes later, only if you want the log to stick around.",
        caption: "Targets up top, then the tray that gets you there.",
      },
      {
        kind: "feature",
        side: "left",
        media: "photo",
        src: "/images/proj/rf-tray.jpg",
        heading: "The tray is yours",
        body: "V1 quietly re-planned around your edits. Testers hated it, so V2 got one rule: touch a meal and the app never rearranges it again. That turned a suggestion engine into a food log people keep.",
        caption: "Swap, log, or add a dish. Once you touch it, it stays put.",
      },
      {
        kind: "feature",
        side: "right",
        media: "photo",
        src: "/images/proj/rf-dial.jpg",
        heading: "One dial, four notches",
        body: "How strict the food gets is one question, so it's one control: Anything goes at the bottom, Cleanest at the top. The logic tested fine. The labels didn't, so I rewrote all four to name the tradeoff.",
        caption: "Everyday is the default: normal dining-hall food, pizza included if it fits.",
      },
      {
        kind: "list",
        heading: "Why it isn't an LLM",
        intro: "The obvious 2026 move is to hand a model the menu and ask for a plan. I didn't. A meal plan is arithmetic, with three jobs a model can't promise:",
        items: [
          "Add up. The macros have to be right, not approximately right.",
          "Stay real. It can only contain food the hall is actually serving that day.",
          "Repeat. Send it to a friend and they get the same plan.",
        ],
      },
      {
        kind: "list",
        heading: "What changed in V2",
        intro: "I wrote a 480-plan probe so I could check the second version instead of trusting it, then ran it against both.",
        items: [
          "Best-tier entrees picked: 44% up to 69%.",
          "Trays stacking three entrees: 7% down to 3%.",
          "All 480 plans landed within 75 calories and 5g of protein. Worst miss: 60 calories.",
        ],
      },
      {
        kind: "terminal",
        heading: "the solver",
        prompt: "~/redbird",
        body: "It's a bounded knapsack with soft constraints, solved entirely on your device: greedy seed, 8 restarts of hill climbing at 400 iterations across 4 move types, then an exhaustive repair tail behind a lower-bound prune. A seeded PRNG keeps it reproducible, so 25 identical calls return 1 result instead of 25 variations. Meal math lands in under 20ms, and nothing is sent anywhere. The rest is deliberately boring: a static build on Cloudflare Pages, Supabase Postgres behind row level security, and a GitHub Actions job that crawls the university's NetNutrition menus at 4:10am so the day's dishes are in the database before anyone eats. Hosting cost is zero.",
      },
      {
        kind: "list",
        heading: "What I owned",
        intro: "There was no team. I'm a marketing major, and this was mine end to end.",
        items: [
          "Set the goals, and decided what shipped and what waited.",
          "Ran the testing sessions with club members.",
          "Directed the AI agents writing the code.",
          "Called when a version was good enough to release.",
        ],
      },
      {
        kind: "cta",
        heading: "Try it on today's menu",
        sub: "Free, and it builds you a plan before it asks you for anything.",
        label: "Open redbirdfuel.com",
        href: "https://redbirdfuel.com",
      },
    ],
    sections: [],
  },
  {
    slug: "almanac",
    index: "03",
    kind: "Build",
    title: "Almanac",
    tileHint: "",
    thumb: "/images/proj/almanac-tile.jpg",
    accent: "coral",
    outcome: "I built my own AI operating system. It reads and writes my real calendar, tasks, email, banking, and location, and once a day it decides on its own whether anything is worth telling me.",
    meta: { role: "Builder", timeline: "2026–present", status: "Running daily" },
    link: { label: "Visit getalmanac.xyz", href: "https://getalmanac.xyz" },
    stats: [
      { value: "6", label: "live data sources" },
      { value: "~2 dozen", label: "tools the AI can call" },
      { value: "240+", label: "automated tests" },
      { value: "~$7/mo", label: "all-in running cost" },
    ],
    trailer: {
      outcome: "An executive assistant system I built for myself. I talk to it, it files what I said into the right place, connects and graphs each data point, and generates insights meant to hold me accountable and improve my life.",
      moves: [],
    },
    photos: [],
    blocks: [
      {
        kind: "text",
        heading: "Why I built it",
        body: "Watching producers at Trifilm juggle a dozen moving parts at once showed me how much of that job is pure coordination. Then I came back to my heaviest year yet: side projects, the Adobe Student Ambassador role, a creative internship with Redbird Athletics, and my most intensive courseload so far. I wanted to see how many hours I could win back from the repetitive parts, entering every assignment into my calendar by hand, reshuffling my week, keeping track of goals and what I said I would finish. So I built the system that does it.",
      },
      {
        kind: "feature",
        side: "right",
        media: "video",
        src: "/images/proj/almanac-graph.mp4",
        heading: "Everything connects into a map",
        body: "Every person, project, charge, and note I capture becomes a point on a map I can actually walk, connected from what I told it and never tagged by hand. Tap a node and you travel to what it's attached to. Every future query can traverse this graph, so the system continuously improves itself.",
        caption: "The /graph view, and the 3D globe it folds into.",
      },
      {
        kind: "feature",
        side: "left",
        media: "video",
        src: "/images/proj/almanac-capture.mp4",
        heading: "Talk to it, and it files itself",
        body: "I capture everything by voice through an iPhone shortcut. One tap opens the recorder, and a sentence like \"remind me to send the contract Thursday, and I spent forty bucks at Costco\" becomes a task with the right date and a logged expense, and it decides which is which. Seconds later it's filed and waiting on my dashboard. I never fill in a form.",
        caption: "One tap to record, then it lands on the dashboard.",
      },
      {
        kind: "feature",
        side: "right",
        media: "photo",
        src: "/images/proj/almanac-brief.jpg",
        heading: "It briefs me every morning",
        body: "Every morning it writes me one short brief, pulled from my actual calendar, my tasks, and who I haven't talked to in a while. Every number in it is calculated in code, so it is a real figure and never a guess.",
        caption: "The first thing I see each morning.",
      },
      {
        kind: "feature",
        side: "left",
        media: "photo",
        src: "/images/proj/almanac-insight.jpg",
        heading: "And it speaks up on its own",
        body: "Most assistants just sit there until you ask them something. Almanac reads across everything it knows and surfaces insights on its own: the spending creeping up, the friend I haven't texted in weeks, the goal I said mattered and then drifted from. That is the part I'm proudest of. It also knows when to stay quiet, at most one digest a day, so the insights it does raise are the ones actually worth my attention.",
        caption: "It connects the dots I'd miss, then only tells me when it counts.",
      },
      {
        kind: "terminal",
        heading: "how it works",
        body: "For anyone in tech: it's a Next.js app on Supabase with an LLM router that uses native tool-calling across roughly two dozen tools to read and write my real Google Calendar, Tasks, Gmail, and Docs, plus a bank feed and my location. Memories are retrieved semantically with pgvector, and everything else it stores becomes a polymorphic entity graph I can traverse and see rendered live with force-graph. Scheduled jobs write the morning brief, rebuild the graph nightly, and run the once-a-day observer. One rule holds the whole thing together: every number is calculated in code and handed to the model as fact, so it phrases things in plain language but never does the arithmetic itself. 240+ automated tests, one deployment, about seven dollars a month.",
      },
      {
        kind: "text",
        heading: "What it actually means",
        body: "I'm a marketing major, and I built and shipped this alone. It's proof I can take an AI product from an idea to something real and used daily: scoping it, wiring up real integrations, and deciding what to build and what to leave out. Those are the same questions marketing asks of any product, which is exactly why building one has taught me more about the field than reading about it ever could.",
      },
      {
        kind: "cta",
        heading: "Almanac is live",
        sub: "Poke around the real thing, running on demo data.",
        label: "Open getalmanac.xyz",
        href: "https://getalmanac.xyz",
      },
    ],
    sections: [],
  },
  {
    slug: "qscables",
    index: "04",
    kind: "Business",
    title: "QsCables",
    tileHint: "",
    accent: "sun",
    thumb: "/images/proj/qs-4.jpg",
    outcome: "A real business: custom keyboard cables I designed, built, photographed, and sold on my own Shopify store, shipped worldwide.",
    meta: { role: "Founder / Maker / Marketer", timeline: "2021 – 2024", status: "Closed in 2024" },
    trailer: {
      outcome: "I started an artisan cable business out of my bedroom: a Shopify store, a production line, a photography booth, my own marketing, and orders shipped internationally.",
      moves: [],
    },
    photos: [],
    sections: [],
    blocks: [
      {
        kind: "duo",
        aspect: "1/1",
        photos: [
          { src: "/images/proj/qs-1.jpg", caption: "A finished build" },
          { src: "/images/proj/qs-2.jpg", caption: "Coiled, aviator connector" },
        ],
      },
      {
        kind: "text",
        heading: "The build was obsessive, on purpose",
        body: "First, raw wire was double-sleeved with German paracord and Techflex. Then each coil was heat-set around a brass rod in the oven, shocked in the freezer, re-coiled the opposite way, and set again. Then hand-soldered aviator connectors, heatshrink, and the final touches. It sounds like overkill until you pull one: most cheap cables on Amazon slacken and never recover, while mine spring right back to a tight coil. I knew a strong product was the most crucial thing for an artisan business, and the multi-hour build process reflected that.",
      },
      {
        kind: "photo",
        src: "/images/proj/qs-5.jpg",
        caption: "Detachable ends and connectors, the parts most people never see.",
        aspect: "16/9",
      },
      {
        kind: "text",
        heading: "It had to look as good as it worked",
        body: "I shot all my own product photography. Every image in this case is mine. If the cable was going to sell online, the photo had to do the selling.",
      },
      {
        kind: "photo",
        src: "/images/proj/qs-4.jpg",
        caption: "Dual-colored cables, a delicate add-on process of melting the sleeving together.",
        aspect: "16/9",
      },
      {
        kind: "reddit",
        heading: "And I marketed the whole thing myself",
        body: "I had no ad budget. Using just organic posts in the keyboard communities on Reddit and Instagram, plus a few giveaway campaigns, I reached over 50,000 post impressions. My Instagram was only 115 followers, but the engagement punched way above that, and most importantly, it drove converting traffic to the store.",
        posts: [
          {
            stat: "408 upvotes",
            title: "View the post on r/MechanicalKeyboards",
            href: "https://www.reddit.com/r/MechanicalKeyboards/comments/sb6ans/never_thought_id_enjoy_making_cables_more_than/",
          },
          {
            stat: "the giveaway",
            title: "View the campaign on r/mechmarket",
            href: "https://www.reddit.com/r/mechmarket/comments/u358tv/bulk_qscables_highend_customizable_cables_giveaway/",
          },
          {
            stat: "on Instagram",
            title: "View the giveaway post",
            href: "https://www.instagram.com/p/CcT78JNM-j0/",
          },
        ],
      },
      {
        kind: "text",
        heading: "Out in the wild, on real keyboards",
        body: "The best part was seeing them land on customers' desks. The color combos were built to match a specific board, right down to the keycaps, a small tribute to the quality and care I put into every order.",
      },
      {
        kind: "duo",
        photos: [
          { src: "/images/proj/qs-tile.jpg", caption: "A customer's board, with their cable" },
          { src: "/images/proj/qs-7.jpg", caption: "Another customer build in the wild", pos: "top" },
        ],
      },
      {
        kind: "text",
        heading: "Why I closed it",
        body: "As bigger vendors scaled into custom cables, order volume slowed and the margins stopped making sense. By then I'd run every part of a business at once, product, brand, marketing, and fulfillment, before I could drive. I moved that same energy into videography, where the market was wide open and the craft ran deeper.",
      },
    ],
  },
];

export const notFoundCopy = {
  slate: "MISSING REEL",
  heading: "This footage was never shot.",
  sub: "The page you're looking for isn't in the bin. Head back to the desk.",
  cta: "Back to the desk",
};
