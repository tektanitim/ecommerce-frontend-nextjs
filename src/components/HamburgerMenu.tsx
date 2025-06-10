"use client"

import Link from "next/link"
import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"


// Sanity'den gelen kategori tipine göre güncellendi
type Category = {
  _id: string; // Sanity'deki ID
  title: string; // Sanity şemasındaki kategori başlığı
  slug: string; // Sanity şemasındaki slug
}

type Props = {
  categories: Category[]
}

export default function HamburgerMenu({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  //Sabit Menü öğeleri
  const menuItems = [
    { title: "Anasayfa", href: "/" },
    { title: "Hakkımızda", href: "/hakkimizda" },
    { title: "Kampanyalar", href: "/kampanyalar" },
    { title: "Blog", href: "/blog" },
    { title: "İletişim", href: "/iletisim" },
  ]

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-blue-600 focus:outline-none"
        aria-label="Hamburger Menü Aç/Kapat"
      >
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded z-50 p-4">
          <ul>
            {/* Sabit Menü Öğeleri */}
            {menuItems.map((item) => (
              <li key={item.title} className="py-2 border-b">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {/* Kategoriler */}
            <li className="py-2 border-b">
              <span className="block text-gray-500 font-medium">Kategoriler</span>
              <ul className="pl-4">
                {categories.map((category) => (
                  <li key={category._id} className="py-2">
                    <Link
                      href={`/kategoriler/${category.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}