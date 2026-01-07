/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed for Vercel deployment
  // trailingSlash: true, // Removed to fix Vercel 404
  images: {
    unoptimized: true, // Kann auf false gesetzt werden für Vercel Image Optimization, aber true ist sicherer für Konsistenz
    domains: ['localhost'],
  },
  // Exclude cookie-manager-temp from build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/cookie-manager-temp/**'],
    };
    return config;
  },
  experimental: {
    optimizeCss: true,
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;