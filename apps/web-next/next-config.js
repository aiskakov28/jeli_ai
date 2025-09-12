/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    appDir: true
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  },
  transpilePackages: ["zustand", "@jeli/ui"]
};

module.exports = nextConfig;
