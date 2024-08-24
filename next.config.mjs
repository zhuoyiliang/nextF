/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL;

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/spring_back/:path*',
                destination: `${API_URL}/:path*`,
            },
        ]
    },
};

export default nextConfig;
