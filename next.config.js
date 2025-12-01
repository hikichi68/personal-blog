/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'wp.barhik.tokyo', 
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;