"use client";

import { useRef } from "react";

export type GalleryImage = { src: string; caption?: string };

/* Horizontal scroll-snap filmstrip for a case study's photo set.
   Arrow buttons on desktop; native swipe on touch. Reusable — QsCables
   now, Almanac's app media later. */
export function ScrollGallery({ images }: { images: GalleryImage[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const nudge = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 420), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="overlay-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "thin" }}
      >
        {images.map((img, i) => (
          <figure key={i} className="relative shrink-0 snap-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.caption ?? `QsCables photo ${i + 1}`}
              loading="lazy"
              className="h-56 w-auto border-2 border-ink/15 object-cover sm:h-64"
            />
            {img.caption && (
              <figcaption className="eyebrow absolute bottom-0 left-0 right-0 bg-ink/75 px-2 py-1 text-[0.6rem] text-paper">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Scroll gallery left"
          className="eyebrow cursor-pointer border-2 border-ink/20 px-3 py-1.5 transition-colors hover:bg-ink hover:text-paper"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Scroll gallery right"
          className="eyebrow cursor-pointer border-2 border-ink/20 px-3 py-1.5 transition-colors hover:bg-ink hover:text-paper"
        >
          →
        </button>
        <span className="eyebrow ml-1 text-ink/40">{images.length} photos · drag to explore</span>
      </div>
    </div>
  );
}
