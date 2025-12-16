/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'blog.barhik.tokyo', 
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;