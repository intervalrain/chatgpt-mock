/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:11434/api/:path*',
        },
      ]
    },
  }

export default nextConfig;
