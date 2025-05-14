/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ], // Add this line to specify the external image domain
  },
};

module.exports = nextConfig;
