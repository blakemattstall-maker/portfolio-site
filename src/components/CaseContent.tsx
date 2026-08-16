"use client";

import { site, videos, type Accent, type PhotoSlot, type WorkItem } from "@/content/site";
import { Burst, Copy } from "./ui";
import { VideoGrid } from "./VideoGrid";

export const ACCENT_BG: Record<Accent, string> = {
  peach: "bg-peach",
  sun: "bg-sun",
  coral: "bg-coral",
};

export function PhotoSlotEl({ slot, dark = true }: { slot: PhotoSlot; dark?: boolean }) {
  if (slot.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={slot.src} alt={slot.label} className="aspect-video w-full border-2 border-ink/20 object-cover" />;
  }
  return (
    <div className={`photo-slot ${dark ? "photo-slot--dark" : ""} aspect-video w-full p-3`}>
      <span className="eyebrow opacity-60">PHOTO · {slot.label}</span>
    </div>
  );
}

export function CaseBody({ item }: { item: WorkItem }) {
  return (
    <div className="text-ink">
      <div className="flex items-center gap-3">
        <span className={`eyebrow px-2 py-1 text-ink ${ACCENT_BG[item.accent]}`}>
          {item.index} — {item.kind}
        </span>
        <span className="eyebrow opacity-60">{item.meta.status}</span>
      </div>
      <h2 className="display mt-4 text-4xl font-bold sm:text-5xl">{item.title}</h2>
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-y-2 border-ink/10 py-4 sm:grid-cols-3">
        {(
          [
            ["Role", item.meta.role],
            ["Timeline", item.meta.timeline],
            ["Status", item.meta.status],
          ] as const
        ).map(([label, value]) => (
          <div key={label}>
            <dt className="eyebrow opacity-50">{label}</dt>
            <dd className="mt-1 text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-6 border-2 border-ink/15 p-5">
        <h3 className="eyebrow opacity-60">The 30-second version</h3>
        <p className="display mt-3 text-lg font-semibold leading-snug sm:text-xl">
          <Copy text={item.trailer.outcome} />
        </p>
        <ul className="mt-4 space-y-2.5">
          {item.trailer.moves.map((move, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed opacity-80">
              <span className="eyebrow mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <Copy text={move} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {item.photos.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {item.photos.map((slot) => (
            <PhotoSlotEl key={slot.label} slot={slot} />
          ))}
        </div>
      )}

      {item.isReel && (
        <div className="mt-8">
          <h3 className="eyebrow mb-5 opacity-60">The footage — press play</h3>
          <VideoGrid videos={videos} />
        </div>
      )}

      {item.sections.map((section) => (
        <section key={section.heading} className="mt-8">
          <h3 className="display text-2xl font-semibold">{section.heading}</h3>
          <div className="mt-3 space-y-3 leading-relaxed opacity-80">
            {section.paragraphs.map((p, i) => (
              <p key={i}>
                <Copy text={p} />
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function AboutBody() {
  const about = site.about;
  return (
    <div className="text-ink">
      <span className="eyebrow bg-sun px-2 py-1">ABOUT</span>
      <h2 className="display mt-4 text-3xl font-bold sm:text-4xl">{about.heading}</h2>
      <div className="mt-5 space-y-4 leading-relaxed opacity-85">
        {about.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {about.stamps.map((stamp) => (
          <span key={stamp} className="eyebrow border-2 border-ink/20 px-2.5 py-1 opacity-70">
            {stamp}
          </span>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {about.photos.map((slot) => (
          <PhotoSlotEl key={slot.label} slot={slot} />
        ))}
      </div>
      <h3 className="eyebrow mt-8 opacity-60">Also on the desk</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {about.lab.map((item) => (
          <div key={item.title} className="border-2 border-ink/15 p-4">
            <span className="eyebrow opacity-50">{item.status}</span>
            <h4 className="display mt-1.5 text-lg font-semibold">{item.title}</h4>
            <p className="mt-1.5 text-xs leading-relaxed opacity-70">{item.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactBody() {
  return (
    <div className="text-ink">
      <span className="eyebrow bg-coral px-2 py-1">CONTACT</span>
      <h2 className="display mt-4 text-3xl font-bold sm:text-4xl">{site.contact.heading}</h2>
      <p className="mt-4 max-w-md leading-relaxed opacity-85">{site.contact.sub}</p>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Burst>
          <a
            href={`mailto:${site.email}`}
            className="inline-block bg-coral px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            {site.email}
          </a>
        </Burst>
      </div>
      <div className="mt-6 flex flex-wrap gap-5">
        {site.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="eyebrow underline decoration-ink/30 underline-offset-4 transition-opacity hover:opacity-60"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}
