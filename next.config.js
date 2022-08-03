/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'storage.googleapis.com', 'firebasestorage.googleapis.com'],
  }
}

module.exports = nextConfig
