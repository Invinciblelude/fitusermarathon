import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/fitusermarathon" : "";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: isGithubPages,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: process.cwd(),
  },
};

if (!isGithubPages) {
  nextConfig.redirects = async () => [
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
}

export default nextConfig;
