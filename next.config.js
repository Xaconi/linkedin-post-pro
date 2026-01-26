/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://img.clerk.com/**')],
  },
}

module.exports = nextConfig
