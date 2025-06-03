// src/components/BannerCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface BannerCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  isLarge?: boolean; // Büyük banner için
}

export default function BannerCard({
  imageSrc,
  altText,
  title,
  buttonText,
  buttonLink,
  isLarge = false, // Varsayılan olarak küçük
}: BannerCardProps) {
  return (
    <div className={`relative group overflow-hidden rounded-lg shadow-md h-96 `}>
      {/* Arka Plan Görseli */}
      <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority={isLarge} // Büyük banner görselini öncelikli yükle
        />
      </div>

      {/* İçerik Katmanı */}
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end text-white bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent">
        <h3 className={`font-bold leading-tight mb-3 ${isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
          {title}
        </h3>
        <Link href={buttonLink}>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}