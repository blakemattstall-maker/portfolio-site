import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Canvas } from "@/components/Canvas";

// Clean, shareable path URLs that open a specific overlay on the one-page
// canvas. Path segments survive link handling (LinkedIn, etc.) far better than
// a ?query, so these are the links to paste into a profile.
const SECTIONS: Record<string, { open: string; title: string }> = {
  video: { open: "videography", title: "Video Portfolio · Blake Stall" },
  trifilm: { open: "trifilm", title: "Trifilm Internship · Blake Stall" },
  almanac: { open: "almanac", title: "Almanac · Blake Stall" },
  qscables: { open: "qscables", title: "QsCables · Blake Stall" },
  about: { open: "about", title: "About · Blake Stall" },
  contact: { open: "contact", title: "Contact · Blake Stall" },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const entry = SECTIONS[section];
  return entry ? { title: entry.title } : {};
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const entry = SECTIONS[section];
  if (!entry) notFound();
  return <Canvas initialOpen={entry.open} />;
}
