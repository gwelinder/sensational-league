import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable React Compiler for now: Sanity Studio uploads may break under it */
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
