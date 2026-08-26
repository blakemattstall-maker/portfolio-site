import type { MetadataRoute } from "next";

const BASE = "https://blakestall.com";

/* The canvas is one page; the case routes are real URLs worth indexing
   (and worth sharing directly, e.g. the video portfolio on LinkedIn). */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/video", "/trifilm", "/almanac", "/qscables", "/about", "/contact"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
