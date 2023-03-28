const { withSuperjson } = require('next-superjson');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dbvwebcvn/**',
      },
    ],
  },
};

module.exports = withSuperjson()(nextConfig);
