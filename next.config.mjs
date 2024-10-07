/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.pexels.com', 'unsplash.com', 'plus.unsplash.com', 'images.unsplash.com'],
    },
    async headers() {
      return [
        {
          source: '/api/socket',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store', 
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  