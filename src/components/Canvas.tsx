"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { deskId, site, work, projectCards } from "@/content/site";
import { AboutBody, CaseBody, ContactBody } from "./CaseContent";
import { SocialIcons, StaggerHeadline } from "./ui";

type OverlayKey = string | null;
const pathFor = (key: string) => key === "videography" ? "/video" : `/${key}`;
function validKey(key: string | null): OverlayKey {
  return key === "about" || key === "contact" || work.some((w) => w.slug === key) ? key : null;
}
function locationKey() {
  const path = window.location.pathname.replace(/^\/|\/$/g, "");
  return validKey(new URLSearchParams(window.location.search).get("open") || (path === "video" ? "videography" : path));
}

function KeyboardCap({ x, y, w = 9, fill }: { x: number; y: number; w?: number; fill: string }) {
  return <rect x={x} y={y} width={w} height={9} rx={2} fill={fill} stroke="#2E3E40" strokeWidth={1.3} />;
}

/* A little mechanical keyboard, drawn in Blake's palette (peach/sun caps on an
   ink plate, coral esc key as a wink). Pokes out from behind the work grid and
   links to the keyboard build in the About overlay. */
function KeyboardDoodle({ className }: { className?: string }) {
  const cols = [12, 23.5, 35, 46.5, 58];
  const rows = [16, 27, 38];
  const caps = ["#F9A66C", "#FFC94B"];
  return (
    <svg viewBox="0 0 118 72" fill="none" className={className} aria-hidden>
      <rect x={2} y={7} width={114} height={60} rx={10} fill="#F9FAF4" stroke="#2E3E40" strokeWidth={3.4} />
      <rect x={8} y={13} width={102} height={48} rx={6} fill="#2E3E40" />
      {/* main cluster */}
      {rows.map((y, r) =>
        cols.map((x, c) => (
          <KeyboardCap key={`${r}-${c}`} x={x} y={y} fill={r === 0 && c === 0 ? "#F17A7E" : caps[(r + c) % 2]} />
        ))
      )}
      <KeyboardCap x={12} y={49} fill="#F9A66C" />
      <KeyboardCap x={23.5} y={49} w={32} fill="#FFC94B" />
      <KeyboardCap x={58} y={49} fill="#F9A66C" />
      {/* right cluster */}
      {rows.map((y, r) =>
        [82, 94].map((x, c) => <KeyboardCap key={`r${r}-${c}`} x={x} y={y} fill={caps[(r + c + 1) % 2]} />)
      )}
      <KeyboardCap x={82} y={49} fill="#FFC94B" />
      <KeyboardCap x={94} y={49} fill="#F9A66C" />
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


function Overlay({ overlay, onClose, onOpen }: {
  overlay: string;
  onClose: () => void;
  onOpen: (key: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = work.find((w) => w.slug === overlay);
  const next = item && projectCards[(projectCards.findIndex((c) => c.slug === item.slug) + 1) % projectCards.length];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    sheetRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus({ preventScroll: true });
  }, [overlay]);

  return (
    <dialog ref={dialogRef} className="portfolio-dialog" aria-label={item?.title ?? (overlay === "about" ? "About me" : "Contact")}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={sheetRef} className="sheet overlay-scroll case-sheet">
        <div className="case-toolbar">
          <span className="eyebrow">{item ? "Selected projects" : "Blake Stall"}</span>
          <button ref={closeRef} type="button" onClick={onClose} className="case-close">Back to the desk <span aria-hidden>×</span></button>
        </div>
        <div className="case-body" key={overlay}>
          {item ? <CaseBody item={item} /> : overlay === "about" ? <AboutBody /> : <ContactBody />}
          {next && <nav className="case-next" aria-label="More projects">
            <div><span className="eyebrow">Keep exploring</span><p className="mt-2 text-sm">A little more of what I do.</p></div>
            <button type="button" onClick={() => onOpen(next.slug)}>{next.title} <span aria-hidden>→</span></button>
          </nav>}
        </div>
      </div>
    </dialog>
  );
}

export function Canvas({ initialOpen }: { initialOpen?: string }) {
  const [overlay, setOverlay] = useState<OverlayKey>(() => validKey(initialOpen ?? null));
  const hasPushed = useRef(false);
  useEffect(() => {
    const sync = () => { setOverlay(locationKey()); hasPushed.current = false; };
    // Query links from the previous portfolio remain supported.
    const timer = window.setTimeout(sync, 0);
    window.addEventListener("popstate", sync);
    return () => { clearTimeout(timer); window.removeEventListener("popstate", sync); };
  }, []);

  const open = useCallback((key: string) => {
    if (!validKey(key)) return;
    if (overlay) {
      window.history.replaceState(null, "", pathFor(key));
    } else {
      window.history.pushState(null, "", pathFor(key));
      hasPushed.current = true;
    }
    setOverlay(key);
  }, [overlay]);
  const close = useCallback(() => {
    if (hasPushed.current) {
      window.history.back();
      hasPushed.current = false;
    } else {
      window.history.replaceState(null, "", "/");
      setOverlay(null);
    }
  }, []);
  const openDesk = () => {
    open("about");
    window.setTimeout(() => document.getElementById(deskId("The Keyboard"))?.scrollIntoView({ block: "start" }), 80);
  };

  return (
    <div className="portfolio">
      <a className="skip-link" href="#selected-work">Skip to projects</a>
      <header className="desk-header">
        <span className="eyebrow">{site.home.location}</span>
        <button type="button" onClick={() => open("contact")} className="availability"><span className="live-dot" aria-hidden /><span>{site.status}</span><span className="availability-arrow" aria-hidden> ↗</span></button>
      </header>
      <main className="desk-layout">
        <section className="intro" aria-label="Meet Blake">
          <div className="intro-copy">
            <StaggerHeadline text={site.name.toUpperCase()} className="display intro-name" />
            <svg className="intro-squiggle" viewBox="0 0 220 24" fill="none" aria-hidden><path d="M4 14 C24 4 40 22 60 12 S96 4 116 14 152 22 172 10 208 6 216 12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
            <p className="intro-line">{site.oneLiner}</p>
            <p className="intro-story">{site.home.intro}</p>
            <nav className="intro-actions" aria-label="About and contact">
              <button type="button" onClick={() => open("about")}>More about me <span aria-hidden>→</span></button>
              <button type="button" onClick={() => open("contact")}>Get in touch <span aria-hidden>↗</span></button>
            </nav>
          </div>
          <div className="portrait-area">
            <button className="portrait-button" type="button" onClick={() => open("about")} aria-label="More about Blake">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cutout-web.png" alt="Blake Stall, smiling" className="portrait" />
              <span className="portrait-label">Hi, I’m Blake.</span>
            </button>
            <div className="portrait-socials"><SocialIcons links={[{ label: "Email", href: `mailto:${site.email}` }, ...site.socials]} /></div>
          </div>
        </section>
        <section className="work-area" id="selected-work" tabIndex={-1} aria-labelledby="work-heading">
          <div className="work-heading"><div><span className="eyebrow">{site.home.workEyebrow}</span><h2 id="work-heading" className="display">Selected projects</h2></div><span className="work-hint">Open a project <span aria-hidden>↘</span></span></div>
          <div className="project-sheet sheet">
            <div className="project-grid">
              {projectCards.map((card, index) => {
                const item = work.find((w) => w.slug === card.slug)!;
                return <a key={card.slug} href={pathFor(card.slug)} className="project-card" style={{ "--card-accent": `var(--color-${item.accent})` } as CSSProperties}
                  onClick={(event) => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); open(card.slug); } }}>
                  <div className="project-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.thumb} alt="" loading={index < 2 ? "eager" : "lazy"} />
                    <span className="project-category">{card.category}</span>
                    {card.slug === "videography" && <span className="project-play" aria-hidden>▶</span>}
                  </div>
                  <div className="project-caption"><h3 className="display">{card.title}</h3><p>{card.description}</p><span className="project-action">{card.action}<span aria-hidden>→</span></span></div>
                </a>;
              })}
            </div>
            <div className="desk-footnote"><button type="button" onClick={openDesk}><KeyboardDoodle className="keyboard-icon" /><span>{site.home.keyboard}<span className="footnote-link">The keyboard I built in 2022 →</span></span></button></div>
          </div>
        </section>
        <aside className="current-note" aria-label="Currently">
          <span className="current-star" aria-hidden>✳</span>
          <div><span className="eyebrow">{site.home.current.label}</span><p>{site.home.current.text}</p></div>
        </aside>
      </main>
      <Ticker />
      {overlay && <Overlay overlay={overlay} onClose={close} onOpen={open} />}
    </div>
  );
}
