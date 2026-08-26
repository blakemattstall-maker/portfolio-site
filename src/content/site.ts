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
    "five years behind a camera",
    "i build ai tools i use every day",
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
        label: "My favorite project",
        status: "SHIPPED",
        blurb: "A 40% mechanical keyboard I designed and built from nothing: the key layout, the switch plate, the PCB, and the case, all of it.",
        blocks: [
          { kind: "photo", src: "/images/proj/kb-layout.png", caption: "1. Started with the layout, a 40% with a few keys moved to where I actually reach for them." },
          { kind: "photo", src: "/images/proj/kb-cad.png", caption: "2. Modeled the whole case from scratch in Fusion 360, learning as I went: tight tolerances, sizing the screw holes so the screws actually fit, and when to fillet an edge versus chamfer it." },
          { kind: "photo", src: "/images/proj/kb-pcb.jpg", caption: "3. Designed the board by hand in KiCad, powered by a microcontroller I soldered on and flashed with custom firmware." },
          { kind: "photo", src: "/images/proj/kb-case.jpg", caption: "4. Resin printed the case, dialing in the fit until it was right. I went resin for the accuracy, the smooth finish, and the low cost, all at once." },
          { kind: "photo", src: "/images/proj/kb-weight.jpg", caption: "5. A faux-brass weight in the base, purely cosmetic. It's actually resin too, painted to look the part." },
          { kind: "photo", src: "/images/proj/kb-final.jpg", caption: "6. Hand-painted, finished, and screwed shut. It's the one I type on every day." },
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

export type Video = { id: string; title: string; context: string };

export const videos: Video[] = [
  { id: "7n0jBKk99RI", title: "Rage in the Birdcage", context: "Hype edit for an MMA club fight night." },
  { id: "QBmQVm6qBg8", title: "Powerlifting Meet Recap", context: "Powerlifting meet-day hype edit. I also competed and cameo in the video!" },
  { id: "7thI9wz33cE", title: "Authava Sizzle Reel", context: "Brand sizzle video for an AI infrastructure company." },
  { id: "4B626q57J5c", title: "Zevia Spec Commercial", context: "Product spec shoot for a summer soda alternative." },
  { id: "LHQpXGTwbxk", title: "Breaking Grounds In Music", context: "Commercial for a local music school." },
  { id: "dlFG1q6c2kc", title: "Oreo Spec Commercial", context: "Vertical spec spot with 3D falling-cookie motion graphics." },
  { id: "8nQZRL5_Bgk", title: "Cinematic Workout Sequence", context: "A personal craft piece to practice lighting and pacing." },
  { id: "GNrm7LdIxZs", title: "Acton Contest Video", context: "A competition piece, back when I was starting out." },
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
    outcome: "Five years behind a camera, 20+ projects, shot and edited. Here are my favorites.",
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
    slug: "trifilm",
    index: "02",
    kind: "Enterprise",
    title: "Trifilm Internship",
    tileHint: "set / gear shot (client-safe)",
    accent: "peach",
    thumb: "/images/proj/trifilm-office.jpg",
    outcome: "My summer at Trifilm: I moved from Chicago to Seattle to make real corporate productions for clients like Microsoft.",
    meta: { role: "Production Intern", timeline: "Summer 2026 · Kirkland, WA", status: "Wrapped" },
    trailer: {
      outcome: "I packed my bags and moved across the country, from Chicago to Seattle, for my first real look inside the production world.",
      moves: [
        "400+ hours of shooting, editing, and shadowing production professionals on live corporate projects.",
        "Helped out on productions for the team's clients, including the Microsoft intern-week video linked below.",
        "Planned and pitched an internal video podcast series from the perspective of the interns.",
      ],
    },
    photos: [
      {
        label: "On the Trifilm crew recording Microsoft's intern week",
        src: "/images/proj/trifilm-intern.jpg",
        link: { label: "Watch the Microsoft intern-week film", href: "https://www.youtube.com/watch?v=S6UxOGB41AI" },
      },
      { label: "On set, slate in hand", src: "/images/proj/about-clapper.jpg", aspect: "3/4" },
    ],
    sections: [
      {
        heading: "My top three takeaways",
        paragraphs: [],
        bullets: [
          "Hiring for the person can matter more than the skillset.",
          "In production, solving the problem beats having all the answers.",
          "AI is a phenomenal tool, but it still needs someone with good taste to keep it from derailing.",
        ],
      },
    ],
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
    meta: { role: "Founder / Maker / Marketer", timeline: "2021 – 2024", status: "Wound down, on purpose" },
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
        heading: "Why I wound it down",
        body: "As bigger vendors scaled into custom cables, order volume slowed. I'd learned what I came for: product, brand, marketing, and fulfillment, all at once, before I could drive. So I pointed the same energy at videography, where the market was wide open and the craft ran deeper. Knowing when a thing has run its course is its own skill.",
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
