/**
 * THUMB WAR — pick the thumbnail that would win the click.
 * Every pair encodes a real thumbnail principle; the "why" flashes after each
 * pick, so the game quietly demonstrates actual marketing literacy.
 * Cards are CSS-drawn (no image assets); real thumbnails from Blake's videos
 * can replace them later via the same schema.
 */

export type ThumbSide = {
  title: string;
  face?: string; // emoji standing in for a human face
  contrast: "hi" | "lo";
  clutter?: string[]; // extra junk elements for cluttered cards
};

export type ThumbPair = {
  a: ThumbSide;
  b: ThumbSide;
  correct: "a" | "b";
  why: string;
};

export const GAME = {
  title: "Thumb War",
  tagline: "You have 30 seconds. Pick the thumbnail that wins the click.",
  runSeconds: 30,
  board: "Live leaderboard — updates in realtime for everyone on the site.",
};

export const pairs: ThumbPair[] = [
  {
    a: { title: "MY SETUP TOUR", face: "😃", contrast: "hi" },
    b: { title: "MY SETUP TOUR", contrast: "hi" },
    correct: "a",
    why: "Faces pull eyes. Thumbnails with faces reliably out-click faceless ones.",
  },
  {
    a: { title: "How we tripled sales in one semester at school", contrast: "hi" },
    b: { title: "3× SALES", contrast: "hi" },
    correct: "b",
    why: "If it can't be read at feed size, it doesn't exist. Three words max.",
  },
  {
    a: { title: "NEW VIDEO", contrast: "lo" },
    b: { title: "NEW VIDEO", contrast: "hi" },
    correct: "b",
    why: "The feed is a contrast war. Muted palettes die at 120px wide.",
  },
  {
    a: { title: "WE MADE 50 SALES", face: "🙂", contrast: "hi" },
    b: { title: "WHAT $0 GOT US", face: "🙂", contrast: "hi" },
    correct: "b",
    why: "Curiosity gap: leave the click something to finish.",
  },
  {
    a: { title: "IT BROKE", face: "😱", contrast: "hi" },
    b: { title: "IT BROKE", face: "🙂", contrast: "hi" },
    correct: "a",
    why: "Strong emotion beats pleasant. Mild faces read as background.",
  },
  {
    a: { title: "STUDIO DAY", face: "😎", contrast: "hi", clutter: ["🎥", "💡", "🎬", "🔥", "⭐"] },
    b: { title: "STUDIO DAY", face: "😎", contrast: "hi" },
    correct: "b",
    why: "One focal point wins the glance test. Clutter splits attention.",
  },
  {
    a: { title: "SOME EDITING MISTAKES", contrast: "hi" },
    b: { title: "3 EDITING MISTAKES", contrast: "hi" },
    correct: "b",
    why: "Numbers promise the size of the payoff before the click.",
  },
  {
    a: { title: "WHY PEOPLE SCROLL PAST", contrast: "hi" },
    b: { title: "WHY YOU SCROLL PAST", contrast: "hi" },
    correct: "b",
    why: "Second person recruits the viewer into the story.",
  },
  {
    a: { title: "COLOR GRADE 101", face: "🧐", contrast: "lo" },
    b: { title: "COLOR GRADE 101", face: "🧐", contrast: "hi" },
    correct: "b",
    why: "Warm, saturated accents advance; dark-on-dark recedes.",
  },
  {
    a: { title: "EP. 14", face: "🙂", contrast: "hi", clutter: ["📺", "📅"] },
    b: { title: "THE CUT THAT SAVED IT", face: "🙂", contrast: "hi" },
    correct: "b",
    why: "Say the story, not the episode number. Metadata isn't a hook.",
  },
];
