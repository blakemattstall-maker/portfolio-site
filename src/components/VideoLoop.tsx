"use client";

import { useEffect, useRef, useState } from "react";

/* Silent looping video that behaves:
   - starts from the beginning only once it scrolls into view (no autoplay on
     load, so it is never already mid-clip by the time you reach it)
   - pauses when it leaves view to save battery/CPU
   - muted + inline so it plays on iOS without a tap; reads like a GIF
   - respects prefers-reduced-motion: shows the first frame, offers controls
   MP4 (H.264) source; a poster shows before it loads. */
export function VideoLoop({
  src,
  poster,
  aspect = "16/9",
}: {
  src: string;
  poster?: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(rm.matches);
    const v = ref.current;
    if (!v || rm.matches) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // first time it becomes visible, play from the top
            if (!started.current) {
              started.current = true;
              v.currentTime = 0;
            }
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }),
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduced}
      className="w-full border-2 border-ink/15 object-cover"
      style={{ aspectRatio: aspect }}
    />
  );
}
