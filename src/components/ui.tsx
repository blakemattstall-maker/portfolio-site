"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";

/* Renders body copy, turning {{TK: ...}} markers into loud placeholder chips. */
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
