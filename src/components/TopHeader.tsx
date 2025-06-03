// src/components/TopHeader.tsx
"use client";

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'; // Sosyal medya ve WhatsApp ikonları
import { FaWhatsapp } from 'react-icons/fa';

export default function TopHeader() {
  return (
    <div className="bg-gray-800 text-white text-center text-sm py-2 px-4 flex items-center justify-between">
      {/* Sol Kısım: Sosyal Medya İkonları */}
      <div className="flex items-center gap-4">
        <Link href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FiFacebook className="h-5 w-5 hover:text-blue-400 transition-colors" />
        </Link>
        <Link href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FiInstagram className="h-5 w-5 hover:text-pink-400 transition-colors" />
        </Link>
        <Link href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FiTwitter className="h-5 w-5 hover:text-blue-300 transition-colors" />
        </Link>
      </div>

      {/* Orta Kısım: Duyuru Mesajı */}
      <p className="flex-grow">
        Yeni Sezon Ürünlerinde %15 İndirim! {' '}
        <Link href="/kampanyalar" className="underline hover:text-blue-300 transition-colors">
          Hemen Keşfet
        </Link>
      </p>

      {/* Sağ Kısım: WhatsApp İkonu */}
      <div className="flex-shrink-0">
        <Link
          href="https://wa.me/905XXXXXXXXX?text=Merhaba,%20sitenizden%20geliyorum." // Kendi WhatsApp numaranızı buraya yazın
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Destek"
          className="flex items-center gap-2 hover:text-green-400 transition-colors"
        >
          <FaWhatsapp className="h-6 w-6" />
          <span className="hidden sm:inline">WhatsApp</span> {/* Küçük ekranlarda gizli, daha büyüklerde görünür */}
        </Link>
      </div>
    </div>
  );
}