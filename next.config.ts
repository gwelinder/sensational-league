import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable React Compiler for now: Sanity Studio uploads may break under it */
  reactCompiler: false,
};

export default nextConfig;
