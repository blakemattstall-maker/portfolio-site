"use client";

import { useRef } from "react";

import { moments } from "@/content/site";

const cards = [
  { id: "keyboard", label: "Made from scratch · 2022", title: "My own keyboard", detail: "Six months learning CAD, circuits, and firmware.", action: "See the build", cover: "/images/proj/kb-final.jpg", coverAlt: "My finished purple mechanical keyboard" },
  ...["trifilm", "barbell", "adobe-max"].map((id) => {
    const moment = moments.find((entry) => entry.id === id)!;
    return { ...moment, detail: moment.summary, action: "Read the story" };
  }),
];

export function MomentShelf({ onKeyboard, onMoment }: { onKeyboard: () => void; onMoment: (id: string) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * .8, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  return <div className="moment-shelf">
    <div className="moments-intro"><div><h2 id="moments-heading" className="display">More of me</h2><p>Things I’ve made, places I’ve been, and what’s next.</p></div>
    <div className="shelf-controls"><div><button type="button" onClick={() => move(-1)} aria-label="Previous moments">←</button><button type="button" onClick={() => move(1)} aria-label="Next moments">→</button></div></div></div>
    <div className="moment-rail" ref={rail} aria-label="Smaller projects and experiences" tabIndex={0}>
      {cards.map((card) => <button type="button" key={card.id} className={`moment-postcard postcard-${card.id}`} onClick={() => card.id === "keyboard" ? onKeyboard() : onMoment(card.id)}>
        <span className="postcard-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.cover} alt={card.coverAlt} loading="lazy" />
        </span>
        <span className="postcard-copy"><span className="eyebrow">{card.label}</span><span className="display postcard-title">{card.title}</span><span className="postcard-detail">{card.detail}</span><span className="postcard-action">{card.action} <span aria-hidden>↗</span></span></span>
      </button>)}
    </div>
  </div>;
}
