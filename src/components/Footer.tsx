// src/components/Footer.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'; // Yeni ikonlar

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-500 text-gray-300 py-10 px-4 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-700">
        {/* Sol Sütun: Logo ve Sosyal Medya */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" aria-label="Anasayfa">
            {/* Logo görseli için aynı yolu kullanıyoruz */}
            <Image
              src="/images/logo.png"
              alt="DESINGBAG Logo"
              width={150} // Footer için biraz daha büyük olabilir
              height={50}
              className="h-12 w-auto mb-4"
            />
          </Link>
          <p className="text-sm mb-4">Kalite ve şıklığı buluşturan el yapımı çantalarınız.</p>
          <div className="flex gap-4">
            <Link href="https://facebook.com/desingbagcollection" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="h-6 w-6 hover:text-blue-500 transition-colors" />
            </Link>
            <Link href="https://instagram.com/desingbagcollection" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 hover:text-pink-500 transition-colors" />
            </Link>
            <Link href="https://twitter.com/desingbagcollection" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="https://wa.me/905339780835" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="h-6 w-6 hover:text-green-500 transition-colors" />
            </Link>
            <Link href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="h-6 w-6 hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Orta Sütun: Menüler */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Hızlı Bağlantılar</h3>
          <ul className="space-y-2">
            <li><Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/sikca-sorulanlar" className="hover:text-white transition-colors">Sıkça Sorulan Sorular</Link></li>
            <li><Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
            <li><Link href="/iade-kosullari" className="hover:text-white transition-colors">İade Koşulları</Link></li>
          </ul>
        </div>

        {/* Sağ Sütun: Harita */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Bize Ulaşın</h3>
          <p className="text-sm mb-4">Fetihtepe Mahallesi Tepe üstü sokak No:41A Beyoğlu-İstanbul</p>
          <div className="w-full max-w-xs md:max-w-none h-40 bg-gray-700 rounded-lg overflow-hidden">
            {/* Google Haritalar Embed Kodu buraya gelecek */}
            {/* Örnek: Kendi konumunuz için Google Maps'ten "Embed a map" seçeneğini kullanın */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.0540782854446!2d28.95405267640582!3d41.04594647134514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab0056d6fa5ad%3A0x64e792755325c3a3!2sUcuz%20Bez%20%C3%87anta!5e0!3m2!1str!2str!4v1749302651065!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mağaza Konumumuz"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Telif Hakkı Bölümü */}
      <div className="text-center text-white text-xs pt-6">
        &copy; {currentYear} DESINGBAG. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
}