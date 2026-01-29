/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
        ],
        // Disable optimization to prevent timeout errors on Render
        // Render's network can be slow/unreliable for external image fetches
        unoptimized: true,
        // Alternative: Use a custom loader if you want optimization
        // loader: 'custom',
        // loaderFile: './lib/image-loader.js',
    },
};

module.exports = nextConfig;
