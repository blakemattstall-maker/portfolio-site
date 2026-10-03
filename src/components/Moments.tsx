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
      {moments.filter((m) => filter === "All" || m.category === filter).map((m) => <article className="moment-entry" id={`moment-${m.id}`} key={m.id}><span className="eyebrow">{m.label}</span><h3 className="display">{m.title}</h3><p>{m.body}</p></article>)}
    </div>
  </div>;
}

export function MomentBody({ id }: { id: string }) {
  const moment = moments.find((entry) => entry.id === id);
  if (!moment) return null;
  return <article className="text-ink">
    <h2 className="display text-3xl font-bold sm:text-4xl">{moment.title}</h2>
    <p className="mt-5 leading-relaxed">{moment.body}</p>
    <figure className="mt-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={moment.image} alt={moment.imageAlt} className="block h-auto w-full border-2 border-ink/15" />
    </figure>
    {id === "adobe-max" && <a className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4" href="https://www.linkedin.com/feed/update/urn:li:activity:7511126653348179968/" target="_blank" rel="noreferrer">See my announcement on LinkedIn <span aria-hidden>↗</span></a>}
    {moment.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 leading-relaxed">{paragraph}</p>)}
  </article>;
}
