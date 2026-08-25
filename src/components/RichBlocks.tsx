"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { VideoLoop } from "./VideoLoop";
import { PhoneFrame } from "./PhoneFrame";

export type Block =
  | { kind: "text"; heading?: string; body: string }
  | { kind: "photo"; src: string; caption?: string; aspect?: string; pos?: string }
  | { kind: "video"; src: string; poster?: string; caption?: string; aspect?: string }
  | { kind: "slot"; media: "photo" | "video"; label: string; caption?: string; aspect?: string }
  | {
      // A feature paired with a phone-framed 9:16 screen. Side-by-side on
      // desktop (alternating), stacked on mobile.
      kind: "feature";
      heading: string;
      body: string;
      side?: "left" | "right";
      caption?: string;
      media: "video" | "photo" | "slot";
      src?: string;
      poster?: string;
      slotLabel?: string;
    }
  | { kind: "duo"; photos: { src: string; caption?: string; pos?: string }[]; aspect?: string }
  | { kind: "terminal"; heading: string; body: string; prompt?: string }
  | { kind: "cta"; heading: string; sub?: string; label: string; href: string }
  | {
      kind: "reddit";
      heading: string;
      body?: string;
      posts: { title: string; stat: string; href: string }[];
    };

/* Reveal-on-scroll that works INSIDE a scrolling modal (its own root),
   with a CSS fallback so nothing stays hidden if the observer never fires. */
function Rise({ children, i = 0 }: { children: ReactNode; i?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setShown(true), io.disconnect())),
      { threshold: 0.12 }
    );
    io.observe(el);
    const t = setTimeout(() => setShown(true), 1200 + i * 60); // safety
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [i]);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(22px)",
        transition: "opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {children}
    </div>
  );
}

function Figure({ src, caption, aspect, pos }: { src: string; caption?: string; aspect?: string; pos?: string }) {
  return (
    <figure className="group overflow-hidden">
      <div className="overflow-hidden border-2 border-ink/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption ?? ""}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={aspect ? { aspectRatio: aspect, objectPosition: pos ?? "center" } : { objectPosition: pos ?? "center" }}
        />
      </div>
      {caption && <figcaption className="eyebrow mt-1.5 text-[0.62rem] leading-tight opacity-60">{caption}</figcaption>}
    </figure>
  );
}

/* A terminal-styled disclosure: collapsed it shows a blinking command prompt
   inviting a click; expanded it reveals the technical write-up. */
function TerminalReveal({ heading, body, prompt = "~/almanac" }: { heading: string; body: string; prompt?: string }) {
  const [open, setOpen] = useState(false);
  const cmd = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <div className="relative rounded-lg border-2 border-ink/20 bg-ink font-mono text-paper">
      {!open && (
        <span className="float-b pointer-events-none absolute -right-1 -top-3 z-10 rounded-full bg-sun px-2.5 py-1 text-[0.62rem] font-bold text-ink shadow-md">
          click me!
          <span className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-sun" aria-hidden />
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm"
        aria-expanded={open}
      >
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-coral" />
          <span className="h-2.5 w-2.5 rounded-full bg-sun" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6fae7e]" />
        </span>
        <span className="ml-1 truncate">
          <span className="text-sun">{prompt}</span>
          <span className="text-paper/50"> $ </span>
          <span>./{cmd}</span>
          {!open && <span className="term-caret text-paper">▍</span>}
        </span>
        <span className="ml-auto shrink-0 text-[0.65rem] text-paper/45">{open ? "close ✕" : "run ↵"}</span>
      </button>
      {open && (
        <div className="border-t border-paper/15 px-4 py-4">
          <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-paper/85">{body}</p>
        </div>
      )}
    </div>
  );
}

/* A long photo story, collapsed behind a teaser image until expanded.
   Keeps the About overlay from being dominated by one project's dev log. */
export function CollapsibleStory({
  blocks,
  label,
  teaserSrc,
}: {
  blocks: Block[];
  label: string;
  teaserSrc?: string;
}) {
  const [open, setOpen] = useState(false);
  const teaser =
    teaserSrc ??
    ([...blocks].reverse().find((b) => b.kind === "photo") as { src?: string } | undefined)?.src;

  if (open) {
    return (
      <div>
        <RichBlocks blocks={blocks} />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="eyebrow mt-4 cursor-pointer border-2 border-ink/20 px-3 py-1.5 transition-colors hover:bg-ink hover:text-paper"
        >
          Collapse ↑
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group relative block w-full overflow-hidden border-2 border-ink/15"
      aria-label={label}
    >
      {teaser && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={teaser}
          alt=""
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ aspectRatio: "16/9" }}
        />
      )}
      <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-4">
        <span className="rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-transform group-hover:-translate-y-0.5">
          {label} ↓
        </span>
      </span>
    </button>
  );
}

export function RichBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6 text-ink">
      {blocks.map((b, i) => (
        <Rise key={i} i={i}>
          {b.kind === "text" && (
            <div>
              {b.heading && <h3 className="display text-xl font-semibold sm:text-2xl">{b.heading}</h3>}
              <p className={`${b.heading ? "mt-2" : ""} leading-relaxed opacity-85`}>{b.body}</p>
            </div>
          )}
          {b.kind === "photo" && <Figure src={b.src} caption={b.caption} aspect={b.aspect} pos={b.pos} />}
          {b.kind === "video" && (
            <figure>
              <VideoLoop src={b.src} poster={b.poster} aspect={b.aspect ?? "16/9"} />
              {b.caption && <figcaption className="eyebrow mt-1.5 text-[0.62rem] leading-tight opacity-60">{b.caption}</figcaption>}
            </figure>
          )}
          {b.kind === "slot" && (
            <figure>
              <div
                className="photo-slot photo-slot--dark flex-col gap-1 p-4"
                style={{ aspectRatio: b.aspect ?? (b.media === "video" ? "16/9" : "4/3") }}
              >
                <span className="eyebrow opacity-70">{b.media === "video" ? "▶ VIDEO" : "PHOTO"}</span>
                <span className="eyebrow max-w-[24ch] text-center leading-tight opacity-50">{b.label}</span>
              </div>
              {b.caption && <figcaption className="eyebrow mt-1.5 text-[0.62rem] leading-tight opacity-60">{b.caption}</figcaption>}
            </figure>
          )}
          {b.kind === "feature" && (
            <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
              <div className={b.side === "left" ? "md:order-2" : ""}>
                <h3 className="display text-xl font-semibold sm:text-2xl">{b.heading}</h3>
                <p className="mt-2 leading-relaxed opacity-85">{b.body}</p>
              </div>
              <div className={b.side === "left" ? "md:order-1" : ""}>
                <PhoneFrame>
                  {b.media === "video" && b.src && (
                    <VideoLoop src={b.src} poster={b.poster} aspect="9/16" />
                  )}
                  {b.media === "photo" && b.src && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.src} alt={b.caption ?? b.heading} loading="lazy" className="h-full w-full object-cover" />
                  )}
                  {(b.media === "slot" || !b.src) && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-center">
                      <span className="eyebrow text-paper/80">{b.media === "photo" ? "PHOTO" : "▶ VIDEO"}</span>
                      <span className="eyebrow max-w-[20ch] leading-tight text-paper/45">{b.slotLabel}</span>
                      <span className="eyebrow mt-1 text-paper/30">9:16</span>
                    </div>
                  )}
                </PhoneFrame>
                {b.caption && (
                  <p className="eyebrow mx-auto mt-2.5 max-w-[230px] text-center text-[0.62rem] leading-tight opacity-55">
                    {b.caption}
                  </p>
                )}
              </div>
            </div>
          )}
          {b.kind === "duo" && (
            <div className="grid grid-cols-2 items-start gap-3">
              {b.photos.map((p) => (
                <Figure key={p.src} src={p.src} caption={p.caption} aspect={b.aspect ?? "4/3"} pos={p.pos} />
              ))}
            </div>
          )}
          {b.kind === "terminal" && <TerminalReveal heading={b.heading} body={b.body} prompt={b.prompt} />}
          {b.kind === "cta" && (
            <a
              href={b.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-3 border-2 border-coral bg-coral/10 p-6 text-center transition-colors hover:bg-coral/20 sm:flex-row sm:justify-between sm:text-left"
            >
              <span>
                <span className="display block text-xl font-semibold sm:text-2xl">{b.heading}</span>
                {b.sub && <span className="mt-1 block text-sm opacity-70">{b.sub}</span>}
              </span>
              <span className="shrink-0 rounded-full bg-coral px-6 py-3 font-semibold text-ink transition-transform group-hover:-translate-y-0.5">
                {b.label} ↗
              </span>
            </a>
          )}
          {b.kind === "reddit" && (
            <div className="border-l-4 border-coral bg-coral/10 p-5">
              <span className="eyebrow bg-coral px-2 py-1 text-ink">▲ my marketing</span>
              <h3 className="display mt-3 text-xl font-semibold sm:text-2xl">{b.heading}</h3>
              {b.body && <p className="mt-2 leading-relaxed opacity-85">{b.body}</p>}
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                {b.posts.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex-1 border-2 border-ink/20 bg-paper p-3 transition-colors hover:border-coral"
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="display text-2xl font-bold leading-none text-coral">{p.stat}</span>
                      <span className="eyebrow opacity-50 transition-transform group-hover:translate-x-0.5">↗</span>
                    </span>
                    <span className="mt-1.5 block text-sm font-medium leading-snug">{p.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </Rise>
      ))}
    </div>
  );
}
