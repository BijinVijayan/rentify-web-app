import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["192.168.1.4", "localhost:3000",],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: "https",
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            }
        ]
    },
};

export default nextConfig;
