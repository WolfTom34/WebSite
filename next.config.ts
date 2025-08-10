import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,

  // 👉 ignore les erreurs TypeScript au build
  typescript: { ignoreBuildErrors: true },

  // 👉 ignore les erreurs ESLint au build (les warnings <img>, deps, etc.)
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
