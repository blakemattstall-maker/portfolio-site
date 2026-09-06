import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Trifilm case was retired from the site (it lives on LinkedIn now).
      // dynamicParams is false, so without this the old path hard-404s for
      // anyone still holding the link.
      { source: "/trifilm", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
