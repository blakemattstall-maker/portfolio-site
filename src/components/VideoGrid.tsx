"use client";

import { useEffect, useState } from "react";
import type { Video } from "@/content/site";

// maxres is sharp but often missing (YouTube then serves a gray 120x90
// placeholder with HTTP 200 — so onError never fires; we catch it by size).
// mqdefault is low-res but always present and a clean 16:9.
const QUALITIES = ["maxresdefault", "mqdefault", "hqdefault"];

function Thumb({ video, onOpen, eager }: { video: Video; onOpen: () => void; eager?: boolean }) {
  const [step, setStep] = useState(0);
  const src = `https://i.ytimg.com/vi/${video.id}/${QUALITIES[step]}.jpg`;
  const next = () => setStep((s) => Math.min(s + 1, QUALITIES.length - 1));
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full cursor-pointer flex-col text-left"
      aria-label={`Play: ${video.title}`}
    >
      {/* fixed 16:9 box, object-contain on ink — vertical cuts letterbox cleanly,
          so every thumbnail is the same size and the grid rows always line up. */}
      <span className="relative block w-full overflow-hidden border-2 border-ink/15 bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={video.title}
          loading={eager ? "eager" : "lazy"}
          className="aspect-video w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          onError={next}
          onLoad={(e) => {
            if (e.currentTarget.naturalWidth <= 120 && step < QUALITIES.length - 1) next();
          }}
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun text-ink opacity-95 transition-transform duration-300 group-hover:scale-110">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
              <path d="M0 0l14 8-14 8z" />
            </svg>
          </span>
        </span>
      </span>
      {/* Date sits on its own line above the title so a long title can never
          squeeze or clip it, at any width. */}
      <span className="eyebrow mt-3 block text-[0.6rem] text-ink/45">{video.date}</span>
      <span className="mt-1 block font-semibold leading-snug text-ink">{video.title}</span>
      <span className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm leading-snug text-ink/60">{video.context}</span>
    </button>
  );
}

export function VideoGrid({ videos }: { videos: Video[] }) {
  const [open, setOpen] = useState<Video | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="grid auto-rows-fr gap-x-6 gap-y-8 sm:grid-cols-2">
        {videos.map((video, i) => (
          <Thumb key={video.id} video={video} eager={i < 2} onOpen={() => setOpen(video)} />
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <span className="eyebrow text-paper">{open.title}</span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="eyebrow cursor-pointer text-paper transition-colors hover:text-sun"
              >
                Close ✕
              </button>
            </div>
            <iframe
              className="aspect-video w-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${open.id}?autoplay=1&rel=0`}
              title={open.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
