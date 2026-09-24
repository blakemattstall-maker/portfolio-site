import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The portfolio has no runtime data now that Thumb War is retired. Emit
  // plain HTML, CSS and JavaScript so Cloudflare Pages serves every request as
  // a static asset with no function invocation.
  output: "export",
};

export default nextConfig;
