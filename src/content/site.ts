/**
 * All site copy and data lives here. Design lives in globals.css/BRAND.md.
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
    "marketing @ illinois state — ga4 certified",
    "two years behind the camera — 20+ projects",
    "ships his own ai tools — daily drivers",
  ],
  status: "Open to work — Summer 2027",
  orbitLabels: [
    { text: "MARKETING", accent: "peach" as Accent },
    { text: "MEDIA PRODUCTION", accent: "sun" as Accent },
    { text: "AI BUILDER", accent: "coral" as Accent },
  ],
  ticker: [
    "Open to work — Summer 2027",
    "Marketing chair — Redbird Barbell @ ISU",
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
      "I fell for videography in 2017 — a cheap camera and the first editor I could find. Since then: 20+ client projects, an agency run at Love Local Media, and a summer at Trifilm working enterprise productions for clients like Microsoft and Amazon.",
      "Now I study marketing at Illinois State, because making things people watch stopped being enough — I want to know why they watch, and what it moves. GA4 and HubSpot certified, Adobe Student Ambassador.",
      "Off the clock: heavy barbells — I'm the marketing chair of Redbird Barbell, ISU's weightlifting club — a hand-built mechanical keyboard, and AI side projects that keep shipping.",
    ],
    stamps: ["EST. 2017", "20+ PROJECTS", "CLASS OF 2029"],
    photos: [{ label: "on set — pick a favorite BTS shot" }, { label: "the keyboard build" }],
    lab: [
      { title: "Resume Engine", status: "IN BUILD", blurb: "Re-aims my real experience at each job description. Never fabricates." },
      { title: "Custom Keyboard", status: "SHIPPED", blurb: "Solder, firmware, stubbornness." },
      { title: "PersonalOS", status: "RUNNING", blurb: "My AI operating system — see the case card." },
    ],
  },
  contact: {
    heading: "Let's make something people watch.",
    sub: "If you need someone who can shoot the thing, cut the thing, build the thing — and read the dashboard after it ships — say hi.",
  },
};

export type Video = { id: string; title: string; context: string };

export const videos: Video[] = [
  { id: "QBmQVm6qBg8", title: "Showreel — Gonzo Recap", context: "Two years of client and personal work, cut to move." },
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
  tileHint: string; // what photo goes in this tile, until Blake supplies it
  accent: Accent;
  outcome: string;
  meta: { role: string; timeline: string; status: string };
  trailer: { outcome: string; moves: string[] };
  photos: PhotoSlot[];
  sections: CaseSection[];
  isReel?: boolean;
  thumb?: string; // real image when available (reel uses YouTube thumb)
};

export const work: WorkItem[] = [
  {
    slug: "redbird-creative",
    index: "01",
    kind: "Campus",
    title: "Redbird Creative",
    tileHint: "first shipped piece / team shot",
    accent: "coral",
    outcome: "Media intern on ISU's in-house creative team — campus-brand work, shipping all year.",
    meta: { role: "Media Intern", timeline: "2026–27 · Illinois State", status: "In progress" },
    trailer: {
      outcome: "Making content for a real brand with a captive audience of 20,000 students — and receipts landing here as the year runs.",
      moves: [
        "Producing media for Illinois State's own creative team — campus campaigns, events, and stories.",
        "Bringing two years of client production speed to an in-house brand cadence.",
        "Collecting the numbers as they happen: this card grows all year.",
      ],
    },
    photos: [{ label: "first shipped piece" }, { label: "on the job / team" }],
    sections: [
      {
        heading: "The plan",
        paragraphs: [
          "This one is live. As pieces ship, they land here with their numbers — the whole point of an in-house media role is that every post has an audience and every audience has a dashboard. {{TK: first shipped piece + what it did — fill in as the year runs}}",
        ],
      },
    ],
  },
  {
    slug: "reel",
    index: "02",
    kind: "Production",
    title: "The Reel",
    tileHint: "",
    accent: "sun",
    outcome: "Two years, 20+ client projects — freelance, agency, and spec work. Watch it move.",
    meta: { role: "Videographer / Editor", timeline: "2024 — present", status: "Ongoing" },
    isReel: true,
    thumb: "https://i.ytimg.com/vi/QBmQVm6qBg8/maxresdefault.jpg",
    trailer: {
      outcome: "20+ projects for real clients through Love Local Media and freelance — plus spec spots for Oreo and Zevia to sharpen the commercial instinct.",
      moves: [
        "Concept → client comms → shoot → edit → delivery, owned end to end.",
        "Sony, Blackmagic, and Canon bodies; Adobe and DaVinci in post.",
        "Set operations: lighting, audio, camera — the unglamorous parts that make footage usable.",
      ],
    },
    photos: [],
    sections: [],
  },
  {
    slug: "trifilm",
    index: "03",
    kind: "Enterprise",
    title: "Trifilm Summer",
    tileHint: "set / gear shot (client-safe)",
    accent: "peach",
    outcome: "A summer at Trifilm on executive corporate sets — Microsoft, Amazon, and others.",
    meta: { role: "Production Associate Intern", timeline: "May–Aug 2026 · Kirkland, WA", status: "Wrapped" },
    trailer: {
      outcome: "What professional creative operations look like when the client is a trillion-dollar brand — and what I owned inside that machine.",
      moves: [
        "Supported executive-level corporate production sets end to end.",
        "Owned media management: shuttling drives, ingesting footage, keeping the pipeline safe.",
        "Ran load-ins/outs and equipment coordination under real call-sheet pressure.",
      ],
    },
    photos: [{ label: "Kirkland / travel shot" }, { label: "gear or set photo (client-safe)" }],
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
    slug: "personal-os",
    index: "04",
    kind: "Build",
    title: "PersonalOS",
    tileHint: "app screenshot",
    accent: "coral",
    outcome: "Designed and shipped my own AI operating system — memory, proactive nudges, real integrations.",
    meta: { role: "Designer / Builder / Only User", timeline: "2026 — present", status: "Running daily" },
    trailer: {
      outcome: "A personal AI system that captures my life passively, remembers what matters, and prompts me before I ask — running every day on my phone.",
      moves: [
        "Scoped and shipped the product end to end: memory model, capture pipeline, proactive prompting.",
        "Wired real integrations — email, documents, banking, location — with cost discipline (runs under $10/mo).",
        "Made the product decisions: what to build, what to kill, and what 'done' means for one user.",
      ],
    },
    photos: [{ label: "app screenshot — dashboard" }, { label: "app screenshot — graph page" }],
    sections: [
      {
        heading: "Why a marketing student builds software",
        paragraphs: [
          "Because LLMs are the biggest shift in how attention and communication work since social — and I'd rather be someone who has shipped with them than someone who has opinions about them. This project is how I learned what AI products actually cost, where they fail, and what makes people keep using them: the same questions marketing asks of any product.",
          "{{TK: decide whether to link the public repo here — it's currently name-free by design}}",
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
