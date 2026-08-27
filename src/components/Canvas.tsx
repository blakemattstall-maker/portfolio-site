"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { deskId, site, work } from "@/content/site";
import { ACCENT_BG, AboutBody, CaseBody, ContactBody } from "./CaseContent";
import { Burst, SocialIcons, StaggerHeadline } from "./ui";
import dynamic from "next/dynamic";

// The game is hidden for now but kept for a future revival. Loading it lazily
// keeps it out of the main bundle entirely — it only downloads if someone
// actually opens ?open=game.
const ThumbWar = dynamic(() => import("./ThumbWar").then((m) => m.ThumbWar));

type OverlayKey = "about" | "contact" | "game" | (typeof work)[number]["slug"] | null;

const ACCENT_TEXT: Record<string, string> = {
  peach: "text-peach",
  sun: "text-sun",
  coral: "text-coral",
};

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

/* A little mechanical keyboard, drawn in Blake's palette (peach/sun caps on an
   ink plate, coral esc key as a wink). Pokes out from behind the work grid and
   links to the keyboard build in the About overlay. */
function KeyboardDoodle({ className }: { className?: string }) {
  const cols = [12, 23.5, 35, 46.5, 58];
  const rows = [16, 27, 38];
  const caps = ["#F9A66C", "#FFC94B"];
  const Cap = ({ x, y, w = 9, fill }: { x: number; y: number; w?: number; fill: string }) => (
    <rect x={x} y={y} width={w} height={9} rx={2} fill={fill} stroke="#2E3E40" strokeWidth={1.3} />
  );
  return (
    <svg viewBox="0 0 118 72" fill="none" className={className} aria-hidden>
      <rect x={2} y={7} width={114} height={60} rx={10} fill="#F9FAF4" stroke="#2E3E40" strokeWidth={3.4} />
      <rect x={8} y={13} width={102} height={48} rx={6} fill="#2E3E40" />
      {/* main cluster */}
      {rows.map((y, r) =>
        cols.map((x, c) => (
          <Cap key={`${r}-${c}`} x={x} y={y} fill={r === 0 && c === 0 ? "#F17A7E" : caps[(r + c) % 2]} />
        ))
      )}
      <Cap x={12} y={49} fill="#F9A66C" />
      <Cap x={23.5} y={49} w={32} fill="#FFC94B" />
      <Cap x={58} y={49} fill="#F9A66C" />
      {/* right cluster */}
      {rows.map((y, r) =>
        [82, 94].map((x, c) => <Cap key={`r${r}-${c}`} x={x} y={y} fill={caps[(r + c + 1) % 2]} />)
      )}
      <Cap x={82} y={49} fill="#FFC94B" />
      <Cap x={94} y={49} fill="#F9A66C" />
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

/* Overlays change the URL but never trigger a Next route change, so nothing is
   recorded for them. Report a virtual pageview using the same public paths the
   /video, /almanac, ... routes use, so Top Pages reflects what people actually
   opened. Fires only on user action (never on first mount) so a direct visit to
   /almanac isn't counted twice. Silently no-ops when analytics is absent or
   blocked — no added requests, no blocking work. */
const OVERLAY_PATHS: Record<string, string> = {
  videography: "/video",
  trifilm: "/trifilm",
  almanac: "/almanac",
  qscables: "/qscables",
  about: "/about",
  contact: "/contact",
  game: "/game",
};

function trackOverlayView(key: string) {
  const path = OVERLAY_PATHS[key];
  if (!path) return;
  try {
    (window as unknown as { va?: (event: string, props?: unknown) => void }).va?.("pageview", {
      route: path,
      path,
    });
  } catch {
    /* analytics blocked or unavailable — tracking is strictly optional */
  }
}

export function Canvas({ initialOpen }: { initialOpen?: string }) {
  const [overlay, setOverlay] = useState<OverlayKey>(null);
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

  // Clicking Blake's cutout opens About — but only where he actually is.
  // The image stays pointer-events-none (its rectangular box overhangs the work
  // grid and would swallow the keyboard's clicks), so instead we listen at the
  // document level and hit-test the PNG's alpha channel: transparent corners
  // fall through to whatever is underneath, opaque pixels open About.
  const cutoutRef = useRef<HTMLImageElement>(null);
  const alphaMap = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const img = cutoutRef.current;
      if (!img || !img.naturalWidth) return;
      // never steal a click meant for a real control or an open overlay
      if ((e.target as HTMLElement | null)?.closest("a,button,[role='dialog']")) return;
      const r = img.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      try {
        if (!alphaMap.current) {
          const c = document.createElement("canvas");
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const ctx = c.getContext("2d", { willReadFrequently: true });
          if (!ctx) return;
          ctx.drawImage(img, 0, 0);
          alphaMap.current = ctx;
        }
        const x = Math.floor(((e.clientX - r.left) / r.width) * img.naturalWidth);
        const y = Math.floor(((e.clientY - r.top) / r.height) * img.naturalHeight);
        if (alphaMap.current.getImageData(x, y, 1, 1).data[3] > 32) {
          setOverlay("about");
          window.history.replaceState(null, "", "/?open=about");
          trackOverlayView("about");
        }
      } catch {
        /* canvas unavailable — the easter egg just stays dormant */
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const close = useCallback(() => {
    setOverlay(null);
    // land on the clean home URL whether we arrived via /video, ?open=, or a click
    window.history.replaceState(null, "", "/");
  }, []);

  const open = useCallback((key: Exclude<OverlayKey, null>) => {
    setOverlay(key);
    window.history.replaceState(null, "", `/?open=${key}`);
    trackOverlayView(key);
  }, []);

  // Open About and jump straight to a specific desk project once it mounts.
  const openDesk = useCallback((title: string) => {
    setOverlay("about");
    window.history.replaceState(null, "", "/?open=about");
    trackOverlayView("about");
    const id = deskId(title);
    // The modal mounts a frame or two later and animates in, so poll for the target
    // and scroll its container directly (scrollIntoView is unreliable mid-animation).
    // A second pass corrects for any layout shift as media finishes reserving space.
    // NOTE: timers, not requestAnimationFrame — rAF is suspended in hidden/throttled
    // tabs (the same trap that forced entrance animations to pure CSS), which left
    // the overlay open but never scrolled.
    let tries = 0;
    const jump = () => {
      const el = document.getElementById(id);
      const scroller = el?.closest<HTMLElement>(".overlay-scroll");
      if (!el || !scroller) return false;
      const offset =
        el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
      scroller.scrollTop = Math.max(0, offset - 12);
      return true;
    };
    const attempt = () => {
      if (jump()) {
        setTimeout(jump, 260); // re-settle once media has reserved its space
        return;
      }
      if (tries++ < 40) setTimeout(attempt, 25);
    };
    attempt();
  }, []);

  // Open a starting overlay from either ?open=<key> or the initialOpen prop
  // (the clean /video, /almanac, ... routes). Does not rewrite the URL, so a
  // shared path like /video stays clean in the address bar.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("open") || initialOpen;
    if (!wanted) return;
    if (wanted === "about" || wanted === "contact" || wanted === "game" || work.some((w) => w.slug === wanted)) {
      setOverlay(wanted as Exclude<OverlayKey, null>);
    }
  }, [initialOpen]);

  return (
    <div ref={rootRef} className="relative flex min-h-dvh flex-col lg:h-dvh">
      {/* availability pill, top right */}
      <div className="absolute right-4 top-3 z-10 hidden lg:block">
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

      <main className="relative mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-start gap-6 px-5 pb-4 pt-6 lg:grid-cols-12 lg:items-center lg:gap-4 lg:px-10 lg:py-4">
        {/* LEFT — name, one-liner, descriptor, status, socials */}
        <div className="relative z-10 lg:col-span-4">
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
            {/* status pill lives top-right on desktop only; on mobile it ate prime space */}
            {/* On small screens the keyboard rides in the empty right-hand gutter,
                vertically straddling the Contact button and the icon row, instead
                of cluttering the top of the work grid. */}
            <div className="relative">
              <Burst className="mt-5">
                <button
                  type="button"
                  onClick={() => open("contact")}
                  className="cursor-pointer rounded-full bg-coral px-6 py-2.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Contact me →
                </button>
              </Burst>
              <SocialIcons
                className="mt-4"
                tone="light"
                links={[{ label: "Email", href: `mailto:${site.email}` }, ...site.socials]}
              />
              <button
                type="button"
                onClick={() => openDesk("The Keyboard")}
                aria-label="See where it started: the mechanical keyboard I built"
                title="psst, where it all started"
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer drop-shadow-[0_6px_12px_rgba(46,62,64,0.4)] transition-transform duration-300 hover:-translate-y-[calc(50%+4px)] lg:hidden"
              >
                <span className="kb-alive relative block overflow-hidden rounded-[8px]">
                  <KeyboardDoodle className="w-[92px]" />
                </span>
              </button>
            </div>
          </Enter>
          </Depth>
        </div>

        {/* CENTER — the hero cutout, large and left-leaning, orbited by role labels.
            pointer-events-none: this column is purely decorative, and its z-20 box
            overhangs the work grid — without this it swallowed clicks meant for the
            keyboard easter egg tucked behind the sheet. */}
        <div className="pointer-events-none relative z-0 -mb-[26px] flex items-end justify-center lg:z-20 lg:col-span-3 lg:mb-0 lg:h-full lg:self-end lg:-mx-10">
          <Enter delay={0.2} className="relative flex items-end">
            <Depth px={14} py={9} className="relative flex items-end">
              <ArrowLoop className="absolute -left-28 top-[6%] hidden w-12 -rotate-6 lg:block" />
              {site.orbitLabels.map((label, i) => (
                <span
                  key={label.text}
                  className={`eyebrow sticker pointer-events-none absolute z-10 text-ink ${ACCENT_BG[label.accent]} ${
                    ["float-a", "float-b", "float-a"][i]
                  } ${
                    /* mobile offsets are in fixed px off the bottom edge, not %,
                       so the two lower stickers keep the same gap on every phone
                       and sit on the chest — never across the neck or face. */
                    [
                      "-rotate-6 -left-1 top-1 lg:left-6 lg:top-[15%] xl:-left-12",
                      "rotate-3 -right-3 bottom-12 lg:-right-6 lg:bottom-[13%]",
                      "-rotate-3 -left-3 bottom-3 lg:-left-5 lg:bottom-[1%]",
                    ][i]
                  }`}
                  style={{ ["--tilt" as string]: `${[-6, 3, -3][i]}deg` }}
                >
                  {label.text}
                </span>
              ))}
              <motion.img
                ref={cutoutRef}
                src="/images/cutout-web.png"
                alt="Blake Stall, cut out and smiling"
                crossOrigin="anonymous"
                /* mobile: a FIXED height (no viewport units) so the hero can't resize
                   when the phone's URL bar collapses, and can't collapse on short
                   screens like the SE — sticker placement stays identical everywhere. */
                className="pointer-events-none relative mx-auto h-[260px] w-auto object-contain drop-shadow-[0_20px_34px_rgba(46,62,64,0.5)] lg:h-auto lg:max-h-[62dvh]"
              />
            </Depth>
          </Enter>
          <Depth px={22} py={15} className="absolute -right-2 top-6 lg:right-0">
            <Star className="w-7 float-b" />
          </Depth>
        </div>

        {/* RIGHT — the tilted contact sheet of work */}
        <Enter delay={0.3} className="relative z-10 lg:z-0 lg:col-span-5">
          <div className="plx-tilt relative">
          {/* keyboard easter egg: pokes out from behind the sheet, jumps to the build */}
          <button
            type="button"
            onClick={() => openDesk("The Keyboard")}
            aria-label="See where it started: the mechanical keyboard I built"
            title="psst, where it all started"
            /* mobile: pokes out the TOP-RIGHT of the grid. desktop: top-LEFT,
               aligned with the first tile row, jutting past the sheet's edge. */
            className="group absolute -left-24 top-12 z-0 hidden -rotate-6 cursor-pointer drop-shadow-[0_9px_16px_rgba(46,62,64,0.45)] transition-transform duration-300 hover:-translate-y-1.5 lg:block"
          >
            <span className="kb-alive relative block overflow-hidden rounded-[10px]">
              <KeyboardDoodle className="w-32" />
            </span>
          </button>
          <div className="sheet relative z-10 mx-auto w-full max-w-[520px] rotate-0 p-2.5 lg:rotate-2 lg:p-3 lg:hover:rotate-1 lg:transition-transform lg:duration-500">
            <div className="grid grid-cols-2 gap-2.5 md:gap-3">
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
                  <span className="mt-1 flex items-center gap-1.5 px-0.5 pb-0.5">
                    <span className={`inline-block h-2 w-2 shrink-0 rotate-45 ${ACCENT_BG[item.accent]}`} aria-hidden />
                    <span className="truncate font-mono text-[0.58rem] uppercase tracking-[0.03em] text-ink">
                      {item.index} {item.title}
                    </span>
                    <span
                      className={`eyebrow ml-auto hidden shrink-0 opacity-0 transition-opacity group-hover:opacity-100 sm:block ${ACCENT_TEXT[item.accent]}`}
                    >
                      OPEN →
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-1 flex gap-2 border-t-2 border-ink/10 px-1 pt-3 pb-1">
              {/* One primary action here. Contact is already the coral CTA up top
                  and the status pill, so it stays reachable but stops competing. */}
              <Burst>
                <button
                  type="button"
                  onClick={() => open("about")}
                  className="cursor-pointer bg-sun px-5 py-2.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  About me →
                </button>
              </Burst>
              <button
                type="button"
                onClick={() => open("contact")}
                className="eyebrow ml-auto cursor-pointer self-center text-ink/60 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
              >
                Contact
              </button>
            </div>
          </div>
          </div>
        </Enter>
      </main>

      <Ticker />
      {/* Game entry hidden for now (overlaps too much on mobile); still reachable via ?open=game */}
      <Overlay overlay={overlay} onClose={close} />
    </div>
  );
}
