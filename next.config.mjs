/** @type {import('next').NextConfig} */
const nextConfig = {  
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '',
        pathname: '/icon/**/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/products/images/**/**/**',
      },      
    ],
  },};

export default nextConfig;