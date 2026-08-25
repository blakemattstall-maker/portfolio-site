"use client";

import { site, videos, type Accent, type PhotoSlot, type WorkItem } from "@/content/site";
import { Burst, Copy } from "./ui";
import { VideoGrid } from "./VideoGrid";
import { ScrollGallery } from "./ScrollGallery";
import { RichBlocks } from "./RichBlocks";

export const ACCENT_BG: Record<Accent, string> = {
  peach: "bg-peach",
  sun: "bg-sun",
  coral: "bg-coral",
};

export function PhotoSlotEl({ slot, dark = true }: { slot: PhotoSlot; dark?: boolean }) {
  const aspect = slot.aspect ?? "4/3";
  if (slot.src) {
    return (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slot.src}
          alt={slot.label}
          loading="lazy"
          className="w-full border-2 border-ink/20 object-cover"
          style={{ aspectRatio: aspect, objectPosition: slot.pos ?? "center" }}
        />
        <figcaption className="eyebrow mt-1.5 text-[0.6rem] opacity-55">{slot.label}</figcaption>
      </figure>
    );
  }
  return (
    <div className={`photo-slot ${dark ? "photo-slot--dark" : ""} p-3`} style={{ aspectRatio: aspect }}>
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
      {(item.link || item.links) && (
        <div className="mt-4 flex flex-wrap gap-2.5">
          {[...(item.link ? [item.link] : []), ...(item.links ?? [])].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={`eyebrow inline-block border-2 px-3 py-1.5 transition-colors ${
                i === 0
                  ? `${ACCENT_BG[item.accent]} border-transparent text-ink hover:opacity-80`
                  : "border-ink/20 hover:bg-ink hover:text-paper"
              }`}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
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
        <h3 className="eyebrow opacity-60">Description</h3>
        <p className="mt-3 text-lg font-semibold leading-relaxed sm:text-xl">
          <Copy text={item.trailer.outcome} />
        </p>
        {item.trailer.moves.length > 0 && (
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
        )}
      </section>

      {item.blocks && (
        <div className="mt-8">
          <RichBlocks blocks={item.blocks} />
        </div>
      )}

      {item.stats && (
        <div className="mt-6 flex flex-wrap gap-3">
          {item.stats.map((s) => {
            const inner = (
              <>
                <span className="display block text-2xl font-bold leading-none">{s.value}</span>
                <span className="eyebrow mt-1 block text-[0.6rem] leading-tight opacity-70">{s.label}</span>
              </>
            );
            return s.href ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={`min-w-[8rem] flex-1 border-2 p-3 transition-colors hover:bg-ink hover:text-paper ${ACCENT_BG[item.accent]}/15 border-ink/15`}
              >
                {inner}
                <span className="eyebrow mt-1.5 block text-[0.58rem] opacity-50">see the post ↗</span>
              </a>
            ) : (
              <div key={s.label} className="min-w-[8rem] flex-1 border-2 border-ink/15 p-3">
                {inner}
              </div>
            );
          })}
        </div>
      )}

      {item.gallery && (
        <div className="mt-6">
          <ScrollGallery images={item.gallery} />
        </div>
      )}

      {item.photos.length > 0 && (
        <div className="mt-6 grid grid-cols-2 items-start gap-3">
          {item.photos.map((slot) => (
            <PhotoSlotEl key={slot.label} slot={slot} />
          ))}
        </div>
      )}

      {item.isReel && (
        <div className="mt-8">
          <h3 className="eyebrow mb-5 opacity-60">My picks — press play:</h3>
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
      {about.photo && (
        <figure className="mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={about.photo.src}
            alt={about.photo.caption}
            loading="lazy"
            className="w-full border-2 border-ink/15 object-cover"
            style={{ aspectRatio: "3/2" }}
          />
          <figcaption className="eyebrow mt-1.5 text-[0.62rem] opacity-55">{about.photo.caption}</figcaption>
        </figure>
      )}

      <h3 className="eyebrow mt-10 opacity-60">On the desk — things I've built</h3>
      <div className="mt-4 space-y-8">
        {about.desk.map((item) => (
          <section key={item.title} className="border-t-2 border-ink/10 pt-5">
            <div className="flex items-baseline gap-3">
              <span className="eyebrow flex items-center gap-1.5 opacity-50">
                {item.status === "RUNNING" && <span className="live-dot" aria-hidden />}
                {item.status}
              </span>
            </div>
            <h4 className="display mt-1.5 text-2xl font-semibold">{item.title}</h4>
            <p className="mt-2 leading-relaxed opacity-80">{item.blurb}</p>
            {"blocks" in item && item.blocks && (
              <div className="mt-5">
                <RichBlocks blocks={item.blocks} />
              </div>
            )}
          </section>
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
            target="_blank"
            rel="noreferrer"
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
