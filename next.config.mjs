/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.vercel.app',
        'admin.youngapostlesfcgh.com',
        'youngapostlesfcgh.com',
        'www.youngapostlesfcgh.com'
      ]
    }
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html'
      }
    ];
  }
};

export default nextConfig;
