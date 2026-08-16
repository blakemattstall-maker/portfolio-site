"use client";

import { useEffect, useState } from "react";
import type { Video } from "@/content/site";

function Thumb({ video, onOpen, eager }: { video: Video; onOpen: () => void; eager?: boolean }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group scene block w-full cursor-pointer text-left"
      aria-label={`Play: ${video.title}`}
    >
      <span className="relative block overflow-hidden border border-line bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={video.title}
          loading={eager ? "eager" : "lazy"}
          className="media aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={() => setSrc(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)}
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-[#161513] opacity-90 transition-transform duration-300 group-hover:scale-110">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
              <path d="M0 0l14 8-14 8z" />
            </svg>
          </span>
        </span>
      </span>
      <span className="mt-3 block font-medium">{video.title}</span>
      <span className="mt-1 block text-sm text-muted">{video.context}</span>
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
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
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
              <span className="eyebrow text-[#d8d2c4]">{open.title}</span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="eyebrow cursor-pointer text-[#d8d2c4] transition-colors hover:text-amber"
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
