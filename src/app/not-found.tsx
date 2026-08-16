import Link from "next/link";
import { notFoundCopy } from "@/content/site";

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-start justify-center px-6 sm:px-12">
      <span className="eyebrow flex items-center gap-2 text-coral">
        <span className="live-dot" style={{ background: "#F17A7E" }} aria-hidden /> {notFoundCopy.slate}
      </span>
      <h1 className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,7vw,4.6rem)] font-bold">
        {notFoundCopy.heading}
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed opacity-80">{notFoundCopy.sub}</p>
      <Link
        href="/"
        className="mt-9 bg-sun px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5"
      >
        {notFoundCopy.cta} →
      </Link>
    </section>
  );
}
