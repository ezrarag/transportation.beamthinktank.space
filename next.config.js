/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/__/auth/:path*',
        destination: 'https://beam-transportation.firebaseapp.com/__/auth/:path*',
      },
    ]
  },
}

module.exports = nextConfig
