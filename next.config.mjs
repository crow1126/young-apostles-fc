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
  async headers() {
    return [
      {
        // Prevent Vercel CDN from caching CMS data files — ensures
        // admin result pushes are immediately visible site-wide
        source: '/data/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=0, must-revalidate' },
          { key: 'Surrogate-Control', value: 'no-store' },
        ],
      },
    ];
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
