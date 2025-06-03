// src/components/FeaturedBanners.tsx
"use client";

import BannerCard from './BannerCard';

// Örnek Banner Verileri
const bannerData = [
  {
    id: 1,
    imageSrc: '/images/banner-1.jpg', // Kendi görsellerinizi ekleyin
    altText: 'New Collection',
    title: 'Yeni Koleksiyonu Keşfedin',
    buttonText: 'Hemen Alışveriş Yap',
    buttonLink: '/koleksiyonlar/yeni',
    isLarge: true, // Sol taraftaki büyük banner
  },
  {
    id: 2,
    imageSrc: '/images/banner-2.jpg', // Kendi görsellerinizi ekleyin
    altText: 'Summer Sale',
    title: 'Yaz İndirimleri Başladı!',
    buttonText: 'İndirimleri Gör',
    buttonLink: '/kampanyalar/yaz',
    isLarge: false, // Sağ taraftaki küçük banner
  },
];

export default function FeaturedBanners() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sol taraftaki büyük banner */}
        <div className="md:col-span-1">
          <BannerCard {...bannerData[0]} />
        </div>

        {/* Sağ taraftaki küçük banner */}
        <div className="md:col-span-1">
          <BannerCard {...bannerData[1]} />
        </div>
      </div>
    </section>
  );
}