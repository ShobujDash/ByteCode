import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    eslint: {
      ignoreDuringBuilds: true,
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};


export default nextConfig;
