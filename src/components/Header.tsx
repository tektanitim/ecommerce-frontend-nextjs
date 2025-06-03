// src/components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import HamburgerMenu from '@/components/HamburgerMenu';
// Eski: import axios from 'axios';

// Yeni:
import { client } from '@/utils/sanity'; // Sanity client'ı import ediyoruz


// Sanity kategori tipi tanımı
type SanityCategory = {
  _id: string; // Sanity'deki ID
  title: string; // Sanity şemasındaki kategori adı
  slug: string; // Sanity şemasındaki slug
  description?: string; // İsteğe bağlı
}

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Tipini SanityCategory olarak güncelledik
  const [categories, setCategories] = useState<SanityCategory[]>([]);

  useEffect(() => {
    // Sanity'den kategorileri çekme fonksiyonu
    const getSanityCategories = async () => {
      try {
        // Sanity'nin GROQ sorgu dili ile tüm kategorileri çekiyoruz
        const query = `*[_type == "category"]{
          _id,
          title, // Sanity şemasındaki kategori başlığı
          "slug": slug.current // Sanity şemasındaki slug
        }`;
        const fetchedCategories = await client.fetch(query);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Sanity kategorileri alınamadı:", err);
      }
    };

    getSanityCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Anasayfa" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="DESINGBAG Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Anasayfa</Link>
          <Link href="/hakkimizda" className="hover:text-blue-600 transition-colors">Hakkımızda</Link>

          <div className="relative">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center hover:text-blue-600 transition-colors focus:outline-none"
            >
              Kategoriler
              <svg
                className={`ml-1 h-4 w-4 transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isCategoriesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {categories.map((category) => (
                    <Link
                      // Medusa'daki category.handle yerine Sanity'deki category.slug kullanıyoruz
                      key={category._id} // Sanity'deki ID
                      href={`/kategoriler/${category.slug}`} // Sanity slug'ı kullanıyoruz
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      {category.title} {/* Sanity'deki kategori başlığı */}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <Link href="/iletisim" className="hover:text-blue-600 transition-colors">İletişim</Link>
        </nav>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-blue-600 transition-colors focus:outline-none"
              aria-label="Arama Aç"
            >
              <FiSearch className="h-6 w-6" />
            </button>
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Ürün Ara..."
                className="absolute right-0 top-full mt-2 p-2 border rounded-md shadow-lg transition-all duration-300 ease-in-out w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
              />
            )}
          </div>

          <Link href="/sepet" className="relative hover:text-blue-600 transition-colors" aria-label="Sepeti Görüntüle">
            <FiShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="hover:text-blue-600 transition-colors focus:outline-none"
              aria-label="Profil Menüsü"
            >
              <FiUser className="h-6 w-6" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link
                    href="/giris-yap"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/cikis-yap"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Çıkış Yap
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* HamburgerMenu bileşenini de Sanity kategori verisiyle güncelleyeceğiz */}
          <HamburgerMenu categories={categories} />
        </div>
      </div>
    </header>
  );
}