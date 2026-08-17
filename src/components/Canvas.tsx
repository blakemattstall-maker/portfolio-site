"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { site, work } from "@/content/site";
import { ACCENT_BG, AboutBody, CaseBody, ContactBody } from "./CaseContent";
import { Burst, StaggerHeadline } from "./ui";
import { ThumbWar } from "./ThumbWar";

type OverlayKey = "about" | "contact" | "game" | (typeof work)[number]["slug"] | null;

const ACCENT_TEXT: Record<string, string> = {
  peach: "text-peach",
  sun: "text-sun",
  coral: "text-coral",
};

/* Splatoon-style ink transition: splat covers the screen from the click
   point, About opens beneath it, ink fades. Skipped under reduced motion. */
const INK_COLORS = ["#F17A7E", "#FFC94B", "#F9A66C"];

type Splat = { x: number; y: number; color: string; out: boolean; id: number };

function InkSplat({ splat }: { splat: Splat | null }) {
  if (!splat) return null;
  return (
    <div
      key={splat.id}
      className="pointer-events-none fixed z-[95]"
      style={{ left: splat.x, top: splat.y }}
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        className={`ink-splat ${splat.out ? "ink-splat--out" : ""}`}
        style={{ color: splat.color }}
      >
        <path
          fill="currentColor"
          d="M50 6 C58 8 61 15 66 13 C75 8 87 12 86 23 C85 31 92 33 94 43 C96 55 85 57 83 65 C81 75 89 83 77 89 C67 94 60 85 52 89 C42 94 34 91 30 83 C26 75 15 78 11 68 C7 58 17 52 15 44 C13 34 5 30 11 22 C17 14 28 18 34 12 C40 6 44 4 50 6 Z"
        />
        <circle cx="12" cy="10" r="4" fill="currentColor" />
        <circle cx="93" cy="55" r="3" fill="currentColor" />
        <circle cx="72" cy="97" r="3.5" fill="currentColor" />
        <circle cx="6" cy="52" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}

/* CSS-driven entrance — completes even in throttled/background tabs. */
function Enter({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`enter ${className ?? ""}`} style={{ ["--d" as string]: `${delay}s` }}>
      {children}
    </div>
  );
}

/* Hand-drawn-ish doodles in palette colors */
function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 14 C 24 4, 40 22, 60 12 S 96 4, 116 14 152 22 172 10 208 6 216 12"
        stroke="#FFC94B"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="#F17A7E" className={className} aria-hidden>
      <path d="M20 2 L24.5 15.5 L38 20 L24.5 24.5 L20 38 L15.5 24.5 L2 20 L15.5 15.5 Z" />
    </svg>
  );
}

/* Hand-drawn arrow, matched to Blake's reference: arc sweeping from upper
   right down to the lower left, with a full two-barb head at the tip. */
function ArrowLoop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 60" fill="none" className={className} aria-hidden>
      <path
        d="M6 14 C 26 2, 58 8, 74 40"
        stroke="#F9A66C"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M74 40 L76.5 27"
        stroke="#F9A66C"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M74 40 L61 38.5"
        stroke="#F9A66C"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Ticker() {
  const row = (
    <div className="flex shrink-0 items-center">
      {[...site.ticker, site.credit].map((item, i) => (
        <span key={i} className="eyebrow flex items-center whitespace-nowrap px-5 py-2.5 text-ink">
          {item}
          <span className="ml-10 inline-block h-1.5 w-1.5 rotate-45 bg-ink/70" aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <div className="shrink-0 overflow-hidden bg-paper" aria-label={site.ticker.join(" · ")}>
      <div className="ticker-track">
        {row}
        <div aria-hidden>{row}</div>
      </div>
    </div>
  );
}

function Overlay({ overlay, onClose }: { overlay: OverlayKey; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!overlay) return null;
  const item = work.find((w) => w.slug === overlay);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-3 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="sheet overlay-scroll relative max-h-[88dvh] w-full max-w-3xl p-6 sm:p-9"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 26, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          className="eyebrow absolute right-4 top-4 cursor-pointer border-2 border-ink/20 px-2.5 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          ESC ✕
        </button>
        {item ? (
          <CaseBody item={item} />
        ) : overlay === "about" ? (
          <AboutBody />
        ) : overlay === "game" ? (
          <ThumbWar />
        ) : (
          <ContactBody />
        )}
      </motion.div>
    </motion.div>
  );
}

/* Depth helper: children shift with the pointer by px/py pixels at full deflection. */
function Depth({ px, py, children, className }: { px: number; py: number; children: ReactNode; className?: string }) {
  return (
    <div className={`plx ${className ?? ""}`} style={{ "--px": px, "--py": py } as CSSProperties}>
      {children}
    </div>
  );
}

export function Canvas() {
  const [overlay, setOverlay] = useState<OverlayKey>(null);
  const [splat, setSplat] = useState<Splat | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Subtle whole-scene 3D: normalized pointer position drives CSS vars; layers
  // pick their own depth (the body::before texture counter-moves for real depth).
  // Vars live on <html> so every layer — including pseudo-elements — inherits.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.documentElement;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty("--my", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback(() => {
    setOverlay(null);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const open = useCallback((key: Exclude<OverlayKey, null>) => {
    setOverlay(key);
    window.history.replaceState(null, "", `?open=${key}`);
  }, []);

  const splatToAbout = useCallback(
    (e: React.MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        open("about");
        return;
      }
      // Mask transition: ink grows from the photo's center, About swaps in
      // underneath, then the ink retracts to the same point — no fade.
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const color = INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)];
      setSplat({ x, y, color, out: false, id: Date.now() });
      setTimeout(() => open("about"), 560);
      setTimeout(() => setSplat((s) => (s ? { ...s, out: true } : s)), 800);
      setTimeout(() => setSplat(null), 1600);
    },
    [open]
  );

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("open");
    if (!wanted) return;
    if (wanted === "about" || wanted === "contact" || wanted === "game" || work.some((w) => w.slug === wanted)) {
      setOverlay(wanted as Exclude<OverlayKey, null>);
    }
  }, []);

  return (
    <div ref={rootRef} className="relative flex min-h-dvh flex-col md:h-dvh">
      {/* availability pill, top right */}
      <div className="absolute right-4 top-3 z-10 hidden md:block">
      <Burst>
        <button
          type="button"
          onClick={() => open("contact")}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 transition-transform hover:-translate-y-0.5"
        >
          <span className="live-dot" aria-hidden />
          <span className="eyebrow text-ink">{site.status}</span>
        </button>
      </Burst>
      </div>

      <main className="relative mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-start gap-6 px-5 pb-4 pt-6 md:grid-cols-12 md:items-center md:gap-4 md:px-10 md:py-4">
        {/* LEFT — name, one-liner, descriptor, status, socials */}
        <div className="relative z-10 md:col-span-4">
          <Depth px={5} py={3}>
          <StaggerHeadline
            text={`${site.name.split(" ")[0].toUpperCase()} ${site.name.split(" ")[1].toUpperCase()}`}
            className="display text-[clamp(2.7rem,7.5vw,6.1rem)] font-bold"
          />
          <Squiggle className="mt-1 w-40 md:w-52" />
          <Enter delay={0.35}>
            <p className="mt-5 max-w-[24ch] text-lg font-medium leading-snug">{site.oneLiner}</p>
          </Enter>
          <Enter delay={0.45}>
            <ul className="mt-5 space-y-1.5">
              {site.descriptor.map((line, i) => (
                <li key={line} className="eyebrow flex items-center gap-2.5 opacity-85">
                  <span
                    className={`inline-block h-1.5 w-1.5 rotate-45 ${["bg-peach", "bg-sun", "bg-coral"][i % 3]}`}
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </Enter>
          <Enter delay={0.55}>
            <div className="mt-6 flex items-center gap-2.5 md:hidden">
              <span className="live-dot" aria-hidden />
              <span className="eyebrow">{site.status}</span>
            </div>
            <Burst className="mt-5">
              <button
                type="button"
                onClick={() => open("contact")}
                className="cursor-pointer rounded-full bg-coral px-6 py-2.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Contact me →
              </button>
            </Burst>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${site.email}`}
                className="eyebrow border-2 border-paper/40 px-3 py-1.5 transition-colors hover:bg-paper hover:text-ink"
              >
                Email
              </a>
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow border-2 border-paper/40 px-3 py-1.5 transition-colors hover:bg-paper hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Enter>
          </Depth>
        </div>

        {/* CENTER — the hero cutout, large and left-leaning, orbited by role labels */}
        <div className="relative z-20 flex items-end justify-center md:col-span-3 md:h-full md:self-end lg:-mx-10">
          <Enter delay={0.2} className="relative flex items-end">
            <Depth px={14} py={9} className="relative flex items-end">
              <ArrowLoop className="absolute -left-14 top-2 hidden w-16 rotate-[8deg] lg:block" />
              {site.orbitLabels.map((label, i) => (
                <span
                  key={label.text}
                  className={`eyebrow absolute z-10 px-2.5 py-1.5 text-ink ${ACCENT_BG[label.accent]} ${
                    ["float-a", "float-b", "float-a"][i]
                  } ${
                    [
                      "-left-3 top-[16%] -rotate-6",
                      "right-0 bottom-[26%] rotate-2",
                      "-left-2 bottom-[6%] -rotate-3",
                    ][i]
                  }`}
                  style={{ ["--tilt" as string]: `${[-6, 3, -3][i]}deg` }}
                >
                  {label.text}
                </span>
              ))}
              <button
                type="button"
                onClick={splatToAbout}
                aria-label="About Blake — with a splat"
                className="cursor-pointer border-0 bg-transparent p-0"
              >
                <motion.img
                  src="/images/cutout-web.png"
                  alt="Blake Stall, cut out and smiling"
                  className="relative mx-auto max-h-[26dvh] w-auto object-contain drop-shadow-[0_20px_34px_rgba(46,62,64,0.5)] md:max-h-[54dvh] lg:max-h-[66dvh]"
                  whileHover={{ rotate: 1.5, scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </Depth>
          </Enter>
          <Depth px={22} py={15} className="absolute -right-2 top-6 md:right-0">
            <Star className="w-7 float-b" />
          </Depth>
        </div>

        {/* RIGHT — the tilted contact sheet of work */}
        <Enter delay={0.3} className="relative md:col-span-5">
          <div className="plx-tilt">
          <div className="sheet mx-auto w-full max-w-[520px] rotate-0 p-3 md:rotate-2 md:hover:rotate-1 md:transition-transform md:duration-500">
            <div className="grid grid-cols-2 gap-3">
              {work.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => open(item.slug)}
                  className="group cursor-pointer text-left"
                  aria-label={`Open case: ${item.title}`}
                >
                  {item.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="aspect-[4/3] w-full border-2 border-ink/15 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="photo-slot photo-slot--dark aspect-[4/3] w-full p-2 transition-transform duration-300 group-hover:scale-[1.02]">
                      <span className="eyebrow opacity-50">PHOTO · {item.tileHint}</span>
                    </div>
                  )}
                  <span className="mt-1.5 flex items-center gap-1.5 px-0.5 pb-1">
                    <span className={`inline-block h-2 w-2 rotate-45 ${ACCENT_BG[item.accent]}`} aria-hidden />
                    <span className="eyebrow text-ink">
                      {item.index} {item.title}
                    </span>
                    <span
                      className={`eyebrow ml-auto opacity-0 transition-opacity group-hover:opacity-100 ${ACCENT_TEXT[item.accent]}`}
                    >
                      OPEN →
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-1 flex gap-2 border-t-2 border-ink/10 px-1 pt-3 pb-1">
              <Burst>
                <button
                  type="button"
                  onClick={() => open("about")}
                  className="eyebrow cursor-pointer bg-sun px-3.5 py-2 text-ink transition-transform hover:-translate-y-0.5"
                >
                  About
                </button>
              </Burst>
              <Burst>
                <button
                  type="button"
                  onClick={() => open("contact")}
                  className="eyebrow cursor-pointer bg-coral px-3.5 py-2 text-ink transition-transform hover:-translate-y-0.5"
                >
                  Contact
                </button>
              </Burst>
              <Burst>
                <button
                  type="button"
                  onClick={() => open("game")}
                  className="eyebrow cursor-pointer bg-peach px-3.5 py-2 text-ink transition-transform hover:-translate-y-0.5"
                >
                  Play ▸
                </button>
              </Burst>
              <span className="eyebrow ml-auto hidden self-center text-ink/50 sm:block">
                4 cases · click any
              </span>
            </div>
          </div>
          </div>
        </Enter>
      </main>

      <Ticker />
      <Overlay overlay={overlay} onClose={close} />
      <InkSplat splat={splat} />
    </div>
  );
}
