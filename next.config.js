/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    // Static export requires unoptimized images since there's no Image Optimization server
    unoptimized: true,
  },
  // Generate a static export in the `out/` directory
  output: 'export',
}

module.exports = nextConfig
