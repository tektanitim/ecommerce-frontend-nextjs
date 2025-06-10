// src/components/VideoFeature.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image'; // Image bileşenini kullanmak için içe aktarın

export default function VideoFeature() {
  // YouTube video ID'nizi buraya girin!
const youtubeVideoId = "JzkYufLjmJs"; // Sizin video ID'niz
const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&controls=1&modestbranding=1&rel=0`;

  return (
    <section className="bg-gray-500 py-12 md:py-6 mt-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sol Kısım: YouTube Video */}
        <div className="w-full relative pt-[56.25%] overflow-hidden rounded-lg shadow-xl"> {/* 16:9 oranı için pt-[56.25%] */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={youtubeEmbedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Sağ Kısım: Tanıtım Metni ve Buton */}
        <div className="flex flex-col items-center justify-center h-full text-white">
          {/* İndirim Dairesi - ARTIK GÖRSEL KULLANIYORUZ */}
          <div className="mb-8">
            <Image
              src="/images/discount-circle.png" // Görselin yolu
              alt="70% e varan indirimler"
              width={160} // Görselin genişliğini ayarlayın
              height={160} // Görselin yüksekliğini ayarlayın (genişlikle orantılı olmalı)
              className="w-40 h-40 object-contain" // Tailwind ile boyutlandırma ve içerik uyumu
            />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 max-w-lg text-center">
            Büyük Yaz İndirimleri Başladı!
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md text-center">
            Yaz sezonuna özel %70'e varan indirimlerle dolu kampanyalarımızı kaçırmayın! 
            Sınırlı süreli fırsatlarla yaz alışverişinizi şimdi yapın!
          </p>
          <Link href="/kampanyalar">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-200 transition-colors shadow-lg">
              Şimdi Alışveriş Yap
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}