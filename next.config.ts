import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true, loader: 'default' },
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',

  // 👉 ignore les erreurs TypeScript au build
  typescript: { ignoreBuildErrors: true },

  // 👉 ignore les erreurs ESLint au build (les warnings <img>, deps, etc.)
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
