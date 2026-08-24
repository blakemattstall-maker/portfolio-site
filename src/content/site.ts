/**
 * All site copy and data lives here. Design lives in globals.css/BRAND.md.
 * VOICE RULE (Blake, permanent): everything on the site is written as if
 * Blake is saying it — first person, his register. No third-person bios.
 * `{{TK: ...}}` marks a fact only Blake can supply — rendered loud on purpose,
 * and scripts/check-tk.mjs blocks deploys while any remain.
 * `photos` entries are blank slots (dashed frames) until Blake drops real media
 * into public/images/ and adds a `src` to the slot.
 */

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
  status: "Open to work — Summer 2027",
  orbitLabels: [
    { text: "MARKETING", accent: "peach" as Accent },
    { text: "MEDIA PRODUCTION", accent: "sun" as Accent },
    { text: "CURRENTLY BUILDING…", accent: "coral" as Accent },
  ],
  clickMe: "▸ click me",
  ticker: [
    "Open to work — Summer 2027",
    "GA4 certified",
    "HubSpot Content Marketing certified",
    "Adobe Student Ambassador",
    "Jesse W. Fell Scholar",
    "Dean's List ×2",
  ],
  credit: "hand-built · no templates · v2 · 08.2026",
  about: {
    heading: "Two years making the thing. Four more learning why it works.",
    body: [
      "I fell for videography five years ago — a cheap camera and the first editor I could find. Since then: 20+ client projects, an agency run at Love Local Media, and a summer at Trifilm working enterprise productions for clients like Microsoft and Amazon.",
      "Now I study marketing at Illinois State, because making things people watch stopped being enough — I want to know why they watch, and what it moves. GA4 and HubSpot certified, Adobe Student Ambassador.",
      "Off the clock: heavy barbells, a hand-built mechanical keyboard, and AI projects that keep shipping — right now I'm exploring hardware add-ons for Almanac.",
    ],
    stamps: ["SINCE 2021", "20+ PROJECTS", "CLASS OF 2029"],
    photos: [
      { label: "me on set", src: "/images/proj/about-clapper.jpg" },
      { label: "the keyboard build", src: "/images/proj/about-keyboard.jpg" },
    ],
    lab: [
      { title: "Resume Engine", status: "IN BUILD", blurb: "Re-aims my real experience at each job description. Never fabricates." },
      { title: "Custom Keyboard", status: "SHIPPED", blurb: "Solder, firmware, stubbornness." },
      { title: "Almanac", status: "RUNNING", blurb: "My AI operating system — see the work grid. Hardware add-ons in the works." },
    ],
  },
  contact: {
    heading: "Let's make something people watch.",
    sub: "If you need someone who can shoot the thing, cut the thing, build the thing — and read the dashboard after it ships — say hi.",
  },
};

export type Video = { id: string; title: string; context: string };

export const videos: Video[] = [
  { id: "QBmQVm6qBg8", title: "Showreel — Gonzo Recap", context: "Client and personal work, cut to move." },
  { id: "dlFG1q6c2kc", title: "Oreo — Spec Commercial", context: "Vertical 9:16 spec spot with 3D falling-cookie motion graphics." },
  { id: "4B626q57J5c", title: "Zevia — Summer Drink Spec", context: "Product spec spot: summer light, condensation, appetite appeal." },
  { id: "LHQpXGTwbxk", title: "Breaking Grounds — In Music", context: "Commercial for a coffee-shop music series. Real client, real deadline." },
  { id: "8nQZRL5_Bgk", title: "Cinematic Workout Sequence", context: "Personal craft piece — lighting, pacing, and an excuse to be in the gym." },
  { id: "GNrm7LdIxZs", title: "Acton Contest Video", context: "Competition piece for Acton Academy." },
];

export type CaseSection = { heading: string; paragraphs: string[] };
export type PhotoSlot = { label: string; src?: string };

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
};

export const work: WorkItem[] = [
  {
    slug: "videography",
    index: "01",
    kind: "Videography",
    title: "Videography Portfolio",
    tileHint: "",
    accent: "sun",
    outcome: "Five years behind a camera, 20+ client projects — freelance, agency, and spec work. Press play.",
    meta: { role: "Videographer / Editor", timeline: "2024 — present (clients)", status: "Ongoing" },
    isReel: true,
    thumb: "https://i.ytimg.com/vi/QBmQVm6qBg8/maxresdefault.jpg",
    trailer: {
      outcome: "20+ projects for real clients through Love Local Media and freelance — plus spec spots for Oreo and Zevia to sharpen my commercial instinct.",
      moves: [
        "I own the whole pipeline: concept → client comms → shoot → edit → delivery.",
        "Sony, Blackmagic, and Canon bodies; Adobe and DaVinci in post.",
        "Set operations too — lighting, audio, camera. The unglamorous parts that make footage usable.",
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
    outcome: "My summer at Trifilm: executive corporate production sets for Microsoft, Amazon, and others.",
    meta: { role: "Production Associate Intern", timeline: "May–Aug 2026 · Kirkland, WA", status: "Wrapped" },
    trailer: {
      outcome: "What professional creative operations look like when the client is a trillion-dollar brand — and what I owned inside that machine.",
      moves: [
        "I supported executive-level corporate production sets end to end.",
        "I owned media management: shuttling drives, ingesting footage, keeping the pipeline safe.",
        "I ran load-ins, load-outs, and equipment coordination under real call-sheet pressure.",
      ],
    },
    photos: [
      { label: "my badge on site", src: "/images/proj/trifilm-badge.jpg" },
      { label: "intern week", src: "/images/proj/trifilm-intern.jpg" },
    ],
    sections: [
      {
        heading: "Why this matters for marketing",
        paragraphs: [
          "Enterprise production is brand communication at its most expensive and least forgiving. Watching how global companies structure a message — and what a set full of professionals does to protect it — is a masterclass you can't take at school.",
          "{{TK: one specific story from a set — a problem you caught, a day that went sideways, a number (days on set, TB ingested) that makes it real. Keep it client-safe.}}",
        ],
      },
    ],
  },
  {
    slug: "almanac",
    index: "03",
    kind: "Build",
    title: "Almanac",
    tileHint: "app photo — coming with the Almanac media set",
    accent: "coral",
    outcome: "I built my own AI operating system — memory, proactive nudges, real integrations. It has a name now.",
    meta: { role: "Designer / Builder / Only User", timeline: "2026 — present", status: "Running daily" },
    link: { label: "getalmanac.xyz", href: "https://getalmanac.xyz" },
    trailer: {
      outcome: "My personal AI system: it captures my life passively, remembers what matters, and prompts me before I ask — running every day on my phone.",
      moves: [
        "I scoped and shipped the product end to end: memory model, capture pipeline, proactive prompting.",
        "I wired real integrations — email, documents, banking, location — for under $10 a month.",
        "I make the product calls: what to build, what to kill, and what 'done' means for one user.",
      ],
    },
    photos: [{ label: "app photo — media set coming" }, { label: "app photo — media set coming" }],
    sections: [
      {
        heading: "Why a marketing student builds software",
        paragraphs: [
          "Because LLMs are the biggest shift in how attention and communication work since social — and I'd rather be someone who has shipped with them than someone who has opinions about them. Building Almanac taught me what AI products actually cost, where they fail, and what makes people keep using them: the same questions marketing asks of any product.",
        ],
      },
    ],
  },
  {
    slug: "qscables",
    index: "04",
    kind: "Business",
    title: "QsCables",
    tileHint: "",
    accent: "sun",
    thumb: "/images/proj/qs-tile.jpg",
    outcome: "The business I ran in high school: hand-built custom keyboard cables I designed, shot, and marketed myself.",
    meta: { role: "Founder / Maker / Marketer", timeline: "2021–2022", status: "Wound down — on purpose" },
    stats: [
      { value: "408", label: "upvotes on one r/MechanicalKeyboards post", href: "https://www.reddit.com/r/MechanicalKeyboards/comments/sb6ans/never_thought_id_enjoy_making_cables_more_than/" },
      { value: "38", label: "comments on that post" },
      { value: "giveaway", label: "campaign on r/mechmarket", href: "https://www.reddit.com/r/mechmarket/comments/u358tv/bulk_qscables_highend_customizable_cables_giveaway/" },
    ],
    gallery: [
      { src: "/images/proj/qs-1.jpg", caption: "Purple build" },
      { src: "/images/proj/qs-4.jpg", caption: "The color range" },
      { src: "/images/proj/qs-2.jpg", caption: "Coiled, aviator connector" },
      { src: "/images/proj/qs-3.jpg", caption: "Blackout build" },
      { src: "/images/proj/qs-5.jpg", caption: "Connectors + detachable ends" },
      { src: "/images/proj/qs-8.jpg", caption: "Sleeving textures" },
      { src: "/images/proj/qs-6.jpg", caption: "The catalog, early 2022" },
      { src: "/images/proj/qs-7.jpg", caption: "In the wild" },
    ],
    photos: [],
    trailer: {
      outcome: "I designed, built, photographed, and marketed custom cables for the mechanical keyboard community — a whole small business run out of my bedroom, start to finish.",
      moves: [
        "I hand-built every cable — sleeving, coiling, soldering aviator connectors.",
        "I shot all my own product photography (everything you're scrolling through).",
        "I marketed on Reddit — organic posts and a giveaway campaign — and ran orders and customer comms myself.",
      ],
    },
    sections: [
      {
        heading: "What it actually taught me",
        paragraphs: [
          "This was my first real funnel: make something good, photograph it so it sells itself, put it in front of the right community, and handle everything after the click. I learned product, brand, marketing, and fulfillment at 16 — by doing all four.",
        ],
      },
      {
        heading: "Why I wound it down",
        paragraphs: [
          "As bigger vendors moved into custom cables, order volume slowed. I'd learned what I set out to learn, so I pointed the same energy at videography — where the market was wide open and the craft ran deeper. Knowing when a thing has run its course is its own skill.",
        ],
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
