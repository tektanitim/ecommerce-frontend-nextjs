// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Eski 'domains' yerine daha güvenli 'remotePatterns' kullanıyoruz
    remotePatterns: [
      {
        protocol: 'http', // localhost için
        hostname: 'localhost',
        port: '',
        pathname: '**', // localhost'ta herhangi bir yol
      },
      {
        protocol: 'https', // Sanity CDN'i için HTTPS kullanıyoruz
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**', // Sanity'nin resim yolu kalıbı
      },
    ],
  },
};

export default nextConfig;