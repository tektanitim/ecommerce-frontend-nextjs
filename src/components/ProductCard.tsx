// src/components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

interface ProductCardProps {
  slug: string; // **ID yerine SLUG kullanıyoruz**
  imageSrc: string;
  altText: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
}

export default function ProductCard({
  slug, // Destructuring'de de slug kullanıyoruz
  imageSrc,
  altText,
  name,
  originalPrice,
  salePrice,
  discountPercentage,
}: ProductCardProps) {

  const safeSalePrice = typeof salePrice === 'number' ? salePrice : 0;
  const safeOriginalPrice = typeof originalPrice === 'number' ? originalPrice : 0;


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group">
      {/* Ürün Görseli */}
      {/* Link href'ini id yerine slug ile güncelliyoruz */}
      <Link href={`/urun/${slug}`} className="block relative w-full h-64 overflow-hidden">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {/* İndirim Etiketi */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            -{discountPercentage}%
          </div>
        )}
      </Link>

      {/* Sepete Ekle / Favorilere Ekle Butonları (Hover'da Çıkan) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button
          className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
          aria-label="Add to Cart"
          title="Add to Cart"
        >
          <FiShoppingCart className="w-5 h-5" />
        </button>
        <button
          className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors"
          aria-label="Add to Wishlist"
          title="Add to Wishlist"
        >
          <FiHeart className="w-5 h-5" />
        </button>
      </div>


      {/* Ürün Bilgileri */}
      <div className="p-4">
        {/* Link href'ini id yerine slug ile güncelliyoruz */}
        <Link href={`/urun/${slug}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
            {name}
          </h3>
        </Link>
        <div className="flex items-baseline mt-2">
          <span className="text-xl font-bold text-gray-900">TL {safeSalePrice.toFixed(2)}</span>
          {safeOriginalPrice > safeSalePrice && (
            <span className="text-gray-500 line-through ml-2">TL {safeOriginalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}