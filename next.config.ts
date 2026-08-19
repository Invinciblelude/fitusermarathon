import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/challenges", destination: "/join", permanent: false },
      { source: "/challenges/:path*", destination: "/join", permanent: false },
      { source: "/nearby", destination: "/", permanent: false },
      { source: "/friends", destination: "/", permanent: false },
      { source: "/activity", destination: "/", permanent: false },
      { source: "/track", destination: "/check-in", permanent: false },
      { source: "/marathon", destination: "/", permanent: false },
      { source: "/habits", destination: "/join", permanent: false },
      { source: "/calendar", destination: "/join", permanent: false },
      { source: "/pack", destination: "/join", permanent: false },
    ];
  },
};

export default nextConfig;
