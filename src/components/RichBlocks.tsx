"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type Block =
  | { kind: "text"; heading?: string; body: string }
  | { kind: "photo"; src: string; caption?: string; aspect?: string; pos?: string }
  | { kind: "duo"; photos: { src: string; caption?: string }[] }
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
          {b.kind === "duo" && (
            <div className="grid grid-cols-2 items-start gap-3">
              {b.photos.map((p) => (
                <Figure key={p.src} src={p.src} caption={p.caption} aspect="4/3" />
              ))}
            </div>
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
