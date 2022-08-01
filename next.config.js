/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'https://api.itcomsmanra.my.id/', 'firebasestorage.googleapis.com'],
  }
}

module.exports = nextConfig
