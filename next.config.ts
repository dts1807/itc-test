import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async redirects() {
        return [
            {
                source: "/",
                destination: "/pokemon",
                permanent: true,
            },
        ];
    },
    images: {
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '/PokeAPI/sprites/**',
            },
        ],
    },
};

export default nextConfig;
