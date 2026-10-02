"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { site, work, projectCards, moments } from "@/content/site";
import { AboutBody, CaseBody, ContactBody, KeyboardBody } from "./CaseContent";
import { SocialIcons, StaggerHeadline } from "./ui";
import { Moments, MomentBody } from "./Moments";
import { MomentShelf } from "./MomentShelf";

type OverlayKey = string | null;
const pathFor = (key: string) => key === "videography" ? "/video" : `/${key}`;
function validKey(key: string | null): OverlayKey {
  return key === "about" || key === "contact" || key === "more" || key === "keyboard" || moments.some((m) => m.id === key) || work.some((w) => w.slug === key) ? key : null;
}
function locationKey() {
  const path = window.location.pathname.replace(/^\/|\/$/g, "");
  return validKey(new URLSearchParams(window.location.search).get("open") || (path === "video" ? "videography" : path));
}

function Ticker() {
  const row = (
    <div className="flex shrink-0 items-center">
      {site.ticker.map((item, i) => (
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


function Overlay({ overlay, onClose, onOpen, onKeyboard }: {
  onKeyboard: () => void;
  overlay: string;
  onClose: () => void;
  onOpen: (key: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const moment = moments.find((m) => m.id === overlay);
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
    <dialog ref={dialogRef} className="portfolio-dialog" aria-label={item?.title ?? moment?.title ?? (overlay === "keyboard" ? "My own keyboard" : overlay === "about" ? "About me" : overlay === "more" ? "More of me" : "Contact")}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={sheetRef} className="sheet overlay-scroll case-sheet">
        <div className="case-toolbar">
          <span className="eyebrow">{item ? "Selected projects" : "Blake Stall"}</span>
          <button ref={closeRef} type="button" onClick={onClose} className="case-close">Back to the desk <span aria-hidden>×</span></button>
        </div>
        <div className="case-body" key={overlay}>
          {item ? <CaseBody item={item} /> : overlay === "about" ? <AboutBody /> : overlay === "keyboard" ? <KeyboardBody /> : moment ? <MomentBody id={moment.id} /> : overlay === "more" ? <Moments onKeyboard={onKeyboard} /> : <ContactBody />}
          {next && <nav className="case-next" aria-label="More projects">
            <div><span className="eyebrow">Keep exploring</span></div>
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
  const openDesk = () => open("keyboard");

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
              <button type="button" className="about-primary" onClick={() => open("about")}>About me <span aria-hidden>→</span></button>
              <button type="button" className="contact-primary" onClick={() => open("contact")}>Get in touch <span aria-hidden>↗</span></button>
            </nav>
          </div>
          <div className="portrait-area">
            <button className="portrait-button" type="button" onClick={() => open("about")} aria-label="More about Blake">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cutout-web.png" alt="Blake Stall, smiling" className="portrait" />
            </button>
            <div className="portrait-socials"><SocialIcons links={[{ label: "Email", href: `mailto:${site.email}` }, ...site.socials]} /></div>
          </div>
        </section>
        <section className="work-area" id="selected-work" tabIndex={-1} aria-labelledby="work-heading">
          <div className="work-heading"><div><h2 id="work-heading" className="display">Selected projects</h2></div></div>
          <div className="project-sheet">
            <div className="project-grid">
              {projectCards.map((card, index) => {
                const item = work.find((w) => w.slug === card.slug)!;
                return <a key={card.slug} href={pathFor(card.slug)} className="project-card" style={{ "--card-accent": `var(--color-${item.accent})` } as CSSProperties}
                  onClick={(event) => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); open(card.slug); } }}>
                  <div className={`project-image${card.slug === "almanac" ? " project-image-almanac" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.slug === "almanac" ? "/images/proj/almanac-phone.png" : item.thumb} alt="" loading={index < 2 ? "eager" : "lazy"} />
                    {card.slug === "videography" && <span className="project-play" aria-hidden>▶</span>}
                  </div>
                  <div className="project-caption"><h3 className="display">{card.title}</h3><p>{card.description}</p><span className="project-action">{card.action}<span aria-hidden>→</span></span></div>
                </a>;
              })}
            </div>

          </div>
        </section>
      </main>
      <section className="moments-home" id="more-of-me" aria-labelledby="moments-heading">
        <MomentShelf onKeyboard={openDesk} onMoment={open} />
      </section>
      <Ticker />
      {overlay && <Overlay overlay={overlay} onClose={close} onOpen={open} onKeyboard={openDesk} />}
    </div>
  );
}
