import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.carsecondopinion.com" }],
        destination: "https://carsecondopinion.com/:path*",
        permanent: true
      },
      {
        source: "/guides/is-a-5000-car-repair-worth-it",
        destination: "/guides/is-a-5000-dollar-car-repair-worth-it",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
