import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'ankarapethouse.com',
        pathname: '/uploads/**',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/hizmetlerimiz',
        permanent: true,
      },
      {
        source: '/kategori/pet-pansiyon',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/services/pet-taksi',
        destination: '/pet-taksi-ankara',
        permanent: true,
      },
      {
        source: '/services/pet-pansiyonu',
        destination: '/ankara-pet-pansiyonu',
        permanent: true,
      },
      {
        source: '/services/pet-kres',
        destination: '/pet-kres-ankara',
        permanent: true,
      },
      {
        source: '/services/pet-bakim-ve-gezdirme',
        destination: '/pet-bakim-gezdirme-ankara',
        permanent: true,
      },
      {
        source: '/services/pet-egitimi',
        destination: '/pet-egitimi-ankara',
        permanent: true,
      }
    ];
  },
  async rewrites() {
    const internalBackendOrigin = process.env.INTERNAL_BACKEND_ORIGIN || 'http://localhost:8080';
    return [
      {
        source: '/uploads/:path*',
        destination: `${internalBackendOrigin}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
