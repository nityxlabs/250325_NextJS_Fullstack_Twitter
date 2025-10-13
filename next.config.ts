import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        // /nodejs/api/auth/test
        source: "/nodejs/api/:path*",
        destination: "http://localhost:8000/nodejs/api/:path*", // Proxy to Node backend,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

/*
* NOTE: example from ChatGPT - how to map custom paths 
* // @type {import('next').NextConfig}
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*', // Proxy to Node backend
      },
    ];
  },
};

module.exports = nextConfig;

*/
