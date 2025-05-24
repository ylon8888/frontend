import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ], // Add this line to specify the external image domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http", // Allow HTTP protocol for localhost
        hostname: "localhost",
        port: "5000", // Specify the port your local server is running on
      },
      {
        protocol: "http", // Allow HTTP protocol for localhost
        hostname: "localhost",
        port: "8000", // Specify the port your local server is running on
      },
      {
        protocol: "http", // Allow HTTP protocol for localhost
        hostname: "10.0.10.33",
        port: "8000", // Specify the port your local server is running on
      },
    ],
  },
};

export default nextConfig;
