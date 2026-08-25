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

export const site = {
  name: "Blake Stall",
  email: "blake@blakestall.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/blakestall" },
    { label: "Instagram", href: "https://www.instagram.com/blakes.tall/" },
  ],
  oneLiner: "A curious student creative, becoming a strategist.",
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
      "Hi, I'm Blake. I study marketing at Illinois State, and what really drives me is figuring out not just what grabs attention, but why it works, then using both the data and the creative side to build something stronger.",
      "Off the clock I lift, and I genuinely never stop building things, whether it's an app, a mechanical keyboard, or a small business. Curiosity is the thread through all of it. I'm most drawn to marketing analytics, product marketing, and brand strategy, and I'm always up to talk with people building work that matters.",
    ],
    stamps: ["20+ PROJECTS", "CLASS OF 2029"],
    photo: { src: "/images/proj/about-mountains.jpg", caption: "Out west, summer 2026" },
    desk: [
      {
        title: "The Keyboard",
        status: "SHIPPED",
        blurb: "A 60% mechanical keyboard I designed and built from nothing: the layout, the circuit, the case, all of it.",
        blocks: [
          { kind: "photo", src: "/images/proj/kb-layout.png", caption: "1. Started with the layout, a 60% with a few keys moved to where I actually reach for them." },
          { kind: "photo", src: "/images/proj/kb-cad.png", caption: "2. Modeled the whole case from scratch in Fusion 360." },
          { kind: "photo", src: "/images/proj/kb-pcb.jpg", caption: "3. The board itself, hand-wired, every switch to the controller." },
          { kind: "photo", src: "/images/proj/kb-case.jpg", caption: "4. 3D-printed the case, iterating on the fit until it was right." },
          { kind: "photo", src: "/images/proj/kb-weight.jpg", caption: "5. A brass weight in the base to give it real heft." },
          { kind: "photo", src: "/images/proj/kb-final.jpg", caption: "6. Finished. Purple on a celestial mat. It's the one I type on every day." },
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
    heading: "Let's make something people watch.",
    sub: "If you need someone who can shoot the thing, cut the thing, build the thing, and read the dashboard after it ships, say hi.",
  },
};

export type Video = { id: string; title: string; context: string };

export const videos: Video[] = [
  { id: "7n0jBKk99RI", title: "Rage in the Birdcage", context: "Hype edit for an MMA club fight night. Fast cuts, big energy." },
  { id: "QBmQVm6qBg8", title: "Powerlifting Meet Recap", context: "Meet-day recap. The misses, the makes, the grind between." },
  { id: "7thI9wz33cE", title: "Authava Sizzle Reel", context: "Brand sizzle for an AI chatbot company. Polished, high-ticket feel." },
  { id: "4B626q57J5c", title: "Zevia Spec Commercial", context: "Product spec spot: summer light, condensation, appetite appeal." },
  { id: "LHQpXGTwbxk", title: "Breaking Grounds Music", context: "Commercial for a local music shop's live series. Real client, real deadline." },
  { id: "dlFG1q6c2kc", title: "Oreo Spec Commercial", context: "Vertical spec spot with 3D falling-cookie motion graphics." },
  { id: "8nQZRL5_Bgk", title: "Cinematic Workout Sequence", context: "A personal craft piece. Lighting and pacing, start to finish." },
  { id: "GNrm7LdIxZs", title: "Acton Contest Video", context: "A competition piece, back when I was starting out." },
];

export type CaseSection = { heading: string; paragraphs: string[] };
export type PhotoSlot = { label: string; src?: string; aspect?: string; pos?: string };

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
    title: "Trifilm Summer",
    tileHint: "set / gear shot (client-safe)",
    accent: "peach",
    thumb: "/images/proj/trifilm-office.jpg",
    outcome: "My summer at Trifilm: I moved from Chicago to Seattle to make real corporate productions for clients like Microsoft.",
    meta: { role: "Production Intern", timeline: "Summer 2026 · Kirkland, WA", status: "Wrapped" },
    link: { label: "A Microsoft intern-week film my Trifilm crew made", href: "https://www.youtube.com/watch?v=S6UxOGB41AI" },
    trailer: {
      outcome: "A little over three months ago I packed up and moved across the country, from Chicago to Seattle, for my first real look inside the production world. Over 400 hours of shooting, editing, and shadowing later, it was a damn good summer.",
      moves: [
        "They trusted me with real work: 400+ hours across shooting, editing, and shadowing on live corporate productions, not coffee runs.",
        "I worked on productions for the team's clients. The Microsoft intern-week video above is one the crew I was part of produced.",
        "My fellow intern and I even hosted a video-podcast episode exploring Trifilm from the inside.",
      ],
    },
    photos: [
      { label: "On the Trifilm crew recording Microsoft's intern week", src: "/images/proj/trifilm-intern.jpg" },
      { label: "On set, slate in hand", src: "/images/proj/about-clapper.jpg", aspect: "3/4" },
    ],
    sections: [
      {
        heading: "What I took from it",
        paragraphs: [
          "Three things stuck with me. Hiring for the person can matter more than the skillset. In production, being able to solve the problem beats having all the answers. And AI is a phenomenal tool, but it still needs someone with good taste to keep it from derailing.",
          "It was my first real look into the industry, and the team trusted me with work that mattered. That's the summer that made me sure this is what I want to be around.",
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
      { value: "6", label: "live data sources: calendar, tasks, email, docs, bank, location" },
      { value: "~2 dozen", label: "tools the AI can call" },
      { value: "240+", label: "automated tests" },
      { value: "~$7/mo", label: "all-in running cost" },
    ],
    trailer: {
      outcome: "A personal operating system I built for myself. I talk to it, it files what I said into the right place, connects it to everything else I've told it, and once a day it decides on its own whether anything is worth surfacing. It runs every day on my phone for about $7 a month.",
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
        body: "Every person, project, charge, and note I capture becomes a point on a map I can actually walk, connected from what I told it and never tagged by hand. Tap a node and you travel to what it's attached to. The way it settles into shape is the thing a screenshot can't show.",
        caption: "The /graph view, and the 3D globe it folds into.",
      },
      {
        kind: "feature",
        side: "left",
        media: "video",
        src: "/images/proj/almanac-capture.mp4",
        heading: "Talk to it, and it files itself",
        body: "I capture everything by voice. One sentence like \"remind me to send the contract Thursday, and I spent forty bucks at Costco\" becomes a task with the right date and a logged expense, and it decides which is which. I never fill in a form.",
        caption: "Press, speak, done. The one loop the whole product is built around.",
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
        heading: "And it speaks up only when it matters",
        body: "Most assistants interrupt you constantly, because attention is the thing they compete for. Almanac is built the other way. At most one digest a day, and on most days it stays quiet on its own. An assistant you actually leave notifications on is the only kind that ends up being useful, so restraint is the point, not a limitation.",
        caption: "Once a day it decides whether anything is worth raising. Most days, nothing is.",
      },
      {
        kind: "text",
        heading: "How it works, for the curious",
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
      outcome: "I ran a whole custom-cable business out of my bedroom: my own Shopify store, my own product photography, my own marketing, shipping orders across the US and overseas.",
      moves: [],
    },
    photos: [],
    sections: [],
    blocks: [
      {
        kind: "text",
        body: "QsCables started as a hobby and turned into a real store. I ran it on Shopify end to end: listings, orders, packaging, shipping, mostly across the US, with the occasional order flying overseas. Every cable was made to order, by me.",
      },
      {
        kind: "duo",
        photos: [
          { src: "/images/proj/qs-1.jpg", caption: "A finished build" },
          { src: "/images/proj/qs-2.jpg", caption: "Coiled, aviator connector" },
        ],
      },
      {
        kind: "text",
        heading: "The build was obsessive, on purpose",
        body: "Each coil got heat-set around a brass rod in the oven, shocked in the freezer, then re-coiled the opposite way and set again. Then hand-soldered aviator connectors, heatshrink, the works. It sounds like overkill until you pull one: most cheap cables on Amazon slacken and never recover. Mine spring right back to a tight coil. That tension was the whole point: quality you can feel in your hand.",
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
        caption: "The range. Every color combination I offered.",
        aspect: "16/9",
      },
      {
        kind: "duo",
        photos: [
          { src: "/images/proj/qs-tile.jpg", caption: "A customer's board, with their cable" },
          { src: "/images/proj/qs-7.jpg", caption: "Another customer build in the wild" },
        ],
      },
      {
        kind: "reddit",
        heading: "And I marketed the whole thing myself",
        body: "No ad budget. Just Reddit and Instagram, done right. Organic posts in the keyboard communities plus giveaway campaigns that put the brand in front of thousands. My Instagram was only 115 followers, but the engagement punched way above that, and it all drove real orders to the store.",
        posts: [
          {
            stat: "408 ▲",
            title: "\"Never thought I'd enjoy making cables…\" on r/MechanicalKeyboards (38 comments)",
            href: "https://www.reddit.com/r/MechanicalKeyboards/comments/sb6ans/never_thought_id_enjoy_making_cables_more_than/",
          },
          {
            stat: "giveaway",
            title: "Bulk QsCables giveaway on r/mechmarket",
            href: "https://www.reddit.com/r/mechmarket/comments/u358tv/bulk_qscables_highend_customizable_cables_giveaway/",
          },
          {
            stat: "Instagram",
            title: "The giveaway post that drove my best engagement",
            href: "https://www.instagram.com/p/CcT78JNM-j0/",
          },
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
