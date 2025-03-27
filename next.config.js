/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This will completely ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;