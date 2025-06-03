"use client"

import Link from "next/link"
import { useState } from "react"

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

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700" aria-label="Hamburger Menü Aç/Kapat">
        ☰
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded z-50 p-4">
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="py-2 border-b"> {/* key'i _id olarak güncelledik */}
                <Link
                  href={`/kategoriler/${category.slug}`} // handle yerine slug kullanıyoruz
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 transition-colors" // Stil ekledim
                >
                  {category.title} {/* name yerine title kullanıyoruz */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}