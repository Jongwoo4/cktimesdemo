import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              port: '8000',
              pathname: '/media/**',  // ✅ Allow images from Django
          },
      ],
  },
};

export default nextConfig;
