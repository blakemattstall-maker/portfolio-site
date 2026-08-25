"use client";

import { useEffect, useRef, useState } from "react";

/* Silent looping video that behaves:
   - autoplays muted + inline (works on iOS), no controls, reads like a GIF
   - only plays while on screen (IntersectionObserver) to save battery/CPU
   - respects prefers-reduced-motion: shows the poster, offers a tap to play
   MP4 (H.264) is the source format; a poster frame shows before it loads. */
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

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(rm.matches);
    const v = ref.current;
    if (!v || rm.matches) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.2 }
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
      autoPlay={!reduced}
      controls={reduced}
      preload="metadata"
      className="w-full border-2 border-ink/15 object-cover"
      style={{ aspectRatio: aspect }}
    />
  );
}
