/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.dev.paximum.com',
        port: '',
        pathname: '/',
      }
    ],
  },
};

module.exports = nextConfig;
