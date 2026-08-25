import type { ReactNode } from "react";

/* A lightweight phone bezel around a 9:16 screen. On-brand ink frame with a
   speaker notch and side buttons, so vertical app recordings read as an app. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[230px]">
      {/* side buttons */}
      <span className="absolute -left-[3px] top-[22%] h-9 w-[3px] rounded-l bg-ink/70" aria-hidden />
      <span className="absolute -left-[3px] top-[36%] h-14 w-[3px] rounded-l bg-ink/70" aria-hidden />
      <span className="absolute -right-[3px] top-[30%] h-16 w-[3px] rounded-r bg-ink/70" aria-hidden />
      <div className="relative rounded-[2.1rem] bg-ink p-2 shadow-[0_16px_34px_rgba(46,62,64,0.42)]">
        {/* speaker / notch */}
        <span className="absolute left-1/2 top-[9px] z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-paper/25" aria-hidden />
        <div
          className="overflow-hidden rounded-[1.6rem] bg-field"
          style={{ aspectRatio: "9/16" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
