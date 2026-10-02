"use client";

import { useState } from "react";
import { moments } from "@/content/site";

export function Moments({ onKeyboard }: { onKeyboard: () => void }) {
  const [filter, setFilter] = useState("All");
  return <div className="text-ink">
    <span className="eyebrow">Beyond the selected projects</span>
    <h2 className="display mt-4 text-4xl font-semibold">More of me</h2>
    <p className="mt-4 max-w-lg leading-relaxed">Smaller builds, time on set, and things happening around campus. A little more of what I spend my time doing.</p>
    <div className="moment-filters" aria-label="Filter moments">{["All", "Builds", "Experiences", "Campus"].map((name) => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div>
    <div className="moment-collection">
      {(filter === "All" || filter === "Builds") && <article className="moment-entry"><span className="eyebrow">Where it started · 2022</span><h3 className="display">The keyboard I built</h3><p>I designed and built a 40% mechanical keyboard, from the layout and PCB to the case.</p><button className="moment-read" onClick={onKeyboard}>See the build, step by step →</button></article>}
      {moments.filter((m) => filter === "All" || m.category === filter).map((m) => <article className="moment-entry" id={`moment-${m.id}`} key={m.id}><span className="eyebrow">{m.label}</span><h3 className="display">{m.title}</h3><p>{m.body}</p><span className="moment-note">{m.note}</span></article>)}
    </div>
  </div>;
}
