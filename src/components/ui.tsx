"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";

/* Renders body copy, turning the double-brace TK markers into loud placeholder chips. */
export function Copy({ text }: { text: string }) {
  const parts = text.split(/(\{\{TK:[^}]*\}\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const tk = part.match(/^\{\{TK:\s*([^}]*)\}\}$/);
        if (tk) {
          return (
            <span key={i} className="tk">
              TK · {tk[1]}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* Word-by-word staggered reveal via CSS animation — completes even when
   the tab is backgrounded/throttled (JS-driven animation does not). */
export function StaggerHeadline({ text, className }: { text: string; className?: string }) {
  return (
    <h1 className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="enter block" style={{ ["--d" as string]: `${0.1 * i}s` }} aria-hidden>
          {word}
        </span>
      ))}
    </h1>
  );
}

/* ————— Hover bursts ————— */

type Particle = {
  id: number;
  glyph: string;
  cls: string;
  bx: number;
  by: number;
  br: number;
  fs: number;
  delay: number;
};

// Accent-only colors so particles read on both the teal field and paper cards.
const GLYPHS: Array<[string, string]> = [
  ["✦", "text-sun"],
  ["✦", "text-coral"],
  ["✧", "text-peach"],
  ["★", "text-sun"],
  ["↗", "text-coral"],
  ["~", "text-peach"],
  ["!", "text-coral"],
  ["hi", "text-peach"],
];

let particleId = 0;

function makeBatch(): Particle[] {
  const count = 6;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.9;
    const dist = 38 + Math.random() * 30;
    const [glyph, cls] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    return {
      id: particleId++,
      glyph,
      cls,
      bx: Math.round(Math.cos(angle) * dist),
      by: Math.round(Math.sin(angle) * dist),
      br: Math.round((Math.random() - 0.5) * 100),
      fs: 10 + Math.round(Math.random() * 8),
      delay: Math.round(Math.random() * 80),
    };
  });
}

/* Wrap any button/link: hovering it pops a small spray of doodle particles.
   Fine pointers only; silent under reduced motion; throttled per element. */
export function Burst({ children, className }: { children: ReactNode; className?: string }) {
  const [batch, setBatch] = useState<Particle[] | null>(null);
  const last = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fire = () => {
    const now = Date.now();
    if (now - last.current < 550) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    last.current = now;
    setBatch(makeBatch());
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setBatch(null), 700);
  };

  return (
    <span className={`relative inline-block ${className ?? ""}`} onPointerEnter={fire}>
      {children}
      {batch?.map((p) => (
        <span
          key={p.id}
          className={`burst-p ${p.cls}`}
          style={
            {
              "--bx": `${p.bx}px`,
              "--by": `${p.by}px`,
              "--br": `${p.br}deg`,
              fontSize: `${p.fs}px`,
              animationDelay: `${p.delay}ms`,
            } as CSSProperties
          }
          aria-hidden
        >
          {p.glyph}
        </span>
      ))}
    </span>
  );
}

/* ————— Social / contact icons —————
   Replaces the EMAIL / LINKEDIN / INSTAGRAM text chips. Each link keeps an
   aria-label and a title, so the meaning survives for screen readers and on
   hover even though the visible label is gone. */
function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zM10 9.5h3.8v1.5h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76v5.69h-4v-5.05c0-1.2-.02-2.75-1.8-2.75-1.8 0-2.07 1.31-2.07 2.66v5.14h-4v-11z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
    </svg>
  );
}

const SOCIAL_GLYPHS: Record<string, () => ReactNode> = {
  Email: MailGlyph,
  LinkedIn: LinkedInGlyph,
  Instagram: InstagramGlyph,
};

/** Icon row for email + socials. `tone="light"` sits on the teal field (hero),
    `tone="dark"` sits on the paper overlay (contact panel). */
export function SocialIcons({
  links,
  tone = "light",
  className = "",
}: {
  links: { label: string; href: string }[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const base =
    tone === "light"
      ? "border-paper/40 text-paper hover:bg-paper hover:text-ink"
      : "border-ink/25 text-ink hover:bg-ink hover:text-paper";
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {links.map((l) => {
        const Glyph = SOCIAL_GLYPHS[l.label] ?? MailGlyph;
        return (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={l.label}
            title={l.label}
            className={`inline-flex h-11 w-11 items-center justify-center border-2 transition-colors ${base}`}
          >
            <Glyph />
          </a>
        );
      })}
    </div>
  );
}
