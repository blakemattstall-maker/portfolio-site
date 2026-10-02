"use client";

import { useRef } from "react";

function MomentIcon({ kind }: { kind: string }) {
  return <svg viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {kind === "game" ? <><path d="M33 29h54c13 0 22 37 15 45-7 8-20-10-26-12H44c-6 2-19 20-26 12-7-8 2-45 15-45Z" /><path d="M35 40v19m-9-9h19" /><circle cx="83" cy="44" r="3" /><circle cx="92" cy="54" r="3" /><path d="M60 29V18c0-8 14 0 14-9" /></> : kind === "barbell" ? <><path d="M37 46h46M13 46h10m74 0h10" /><rect x="23" y="22" width="14" height="48" rx="3" /><rect x="83" y="22" width="14" height="48" rx="3" /><path d="M45 20l5-7m20 7-5-7M45 73l5 7m20-7-5 7" /></> : kind === "max" ? <><rect x="29" y="20" width="62" height="62" rx="5" /><path d="M44 20 37 5m39 15 7-15M48 32h24M42 64l18-23 18 23M51 60h18" /></> : <><rect x="22" y="33" width="78" height="45" rx="3" /><path d="m22 33-3-17 76-12 3 17-76 12ZM35 14l12 13M60 10l12 13M85 6l12 13M22 46h78" /><path d="m54 55 15 8-15 8V55Z" /></>}
  </svg>;
}

const cards = [
  { id: "keyboard", label: "Made from scratch · 2022", title: "My own keyboard", detail: "Six months learning CAD, circuits, and firmware.", action: "See the build", kind: "keyboard" },
  { id: "first-game", label: "Made at 13", title: "An early FPS game", detail: "An early experiment in making something playable.", action: "Read the note", kind: "game" },
  { id: "trifilm", label: "Summer 2026", title: "A summer on set", detail: "Production, coordination, and learning at Trifilm.", action: "Read the note", kind: "film" },
  { id: "barbell", label: "Around campus", title: "Redbird Barbell", detail: "Lifting, club life, and where Redbird Fuel started.", action: "Read the note", kind: "barbell" },
  { id: "creative", label: "Creative internship", title: "Redbird Creative", detail: "Making work with Redbird Athletics.", action: "Read the note", kind: "film" },
  { id: "adobe-max", label: "Up next · November", title: "Off to Adobe MAX", detail: "More from the trip once I've been.", action: "Read the note", kind: "max" },
];

export function MomentShelf({ onKeyboard, onMoment }: { onKeyboard: () => void; onMoment: (id: string) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * .8, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  return <div className="moment-shelf">
    <div className="shelf-controls"><div><button type="button" onClick={() => move(-1)} aria-label="Previous moments">←</button><button type="button" onClick={() => move(1)} aria-label="Next moments">→</button></div></div>
    <div className="moment-rail" ref={rail} aria-label="Smaller projects and experiences" tabIndex={0}>
      {cards.map((card) => <button type="button" key={card.id} className={`moment-postcard postcard-${card.kind}`} onClick={() => card.id === "keyboard" ? onKeyboard() : onMoment(card.id)}>
        <span className="postcard-art">{card.kind === "keyboard" ?
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/images/proj/kb-final.jpg" alt="My finished purple mechanical keyboard" loading="lazy" /> : <MomentIcon kind={card.kind} />}</span>
        <span className="postcard-copy"><span className="eyebrow">{card.label}</span><span className="display postcard-title">{card.title}</span><span className="postcard-detail">{card.detail}</span><span className="postcard-action">{card.action} <span aria-hidden>↗</span></span></span>
      </button>)}
    </div>
  </div>;
}
