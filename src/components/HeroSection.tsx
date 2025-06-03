"use client";

import Image from "next/image";
import Link from "next/link";
import { useState,useEffect,useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {client, urlFor} from '@/utils/sanity';


// Sanity'den gelecek veri yapıları
interface SanityHeroSlide {
  _key: string; // Dizilerdeki öğeler için Sanity tarafından otomatik eklenen benzersiz anahtar
  image: { asset: { _ref: string; _type: string } };
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface SanityStaticBanner {
  _key: string;
  image: { asset: { _ref: string; _type: string } };
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface SanityHomepageContent {
  heroSlider: SanityHeroSlide[];
  staticBanners: SanityStaticBanner[];
}

export default function HeroSection() {
  const [homepageContent, setHomepageContent] = useState<SanityHomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayInterval = 5000; // 5 saniye

  // Sanity'den ana sayfa içeriğini çekme
  useEffect(() => {
    async function fetchHomepageContent() {
      setLoading(true);
      setError(null);
      try {
        const query = `*[_type == "homepage"][0]{
          heroSlider[]{
            _key,
            image,
            title,
            description,
            buttonText,
            buttonLink
          },
          staticBanners[]{
            _key,
            image,
            title,
            description,
            buttonText,
            buttonLink
          }
        }`;
        const data: SanityHomepageContent = await client.fetch(query);
        setHomepageContent(data);
        setLoading(false);
      } catch (err) {
        console.error("Ana sayfa içeriği çekilemedi:", err);
        setError("Ana sayfa içeriği yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    }
    fetchHomepageContent();
  }, []); // Sadece bir kere yüklenecek

  // Slayt sayısı yüklendikten sonra totalSlides'ı ayarla
  const totalSlides = homepageContent?.heroSlider?.length || 0;

  // Sonraki slayta geçiş
  const nextSlide = useCallback(() => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  }, [totalSlides]);

  // Önceki slayta geçiş
  const prevSlide = useCallback(() => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  }, [totalSlides]);

  // Otomatik geçiş (autoplay)
  useEffect(() => {
    if (totalSlides > 1) { // Sadece birden fazla slayt varsa autoplay çalışsın
      const interval = setInterval(nextSlide, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [nextSlide, autoplayInterval, totalSlides]);

  // Yükleme ve Hata Durumları
  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16 text-center text-gray-500">
        Ana sayfa içeriği yükleniyor...
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16 text-center text-red-500">
        {error} Lütfen Sanity Studio'daki 'Homepage Content' dokümanını kontrol edin ve yayınladığınızdan emin olun.
      </section>
    );
  }

  if (!homepageContent || !homepageContent.heroSlider || !homepageContent.staticBanners) {
    return (
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16 text-center text-gray-600">
        Ana sayfa içeriği bulunamadı. Lütfen Sanity Studio'da 'Homepage Content' dokümanı oluşturun.
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Sol Kısım: SLIDER */}
        <div className="relative lg:col-span-1 xl:col-span-2 row-span-2 h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
          {homepageContent.heroSlider.map((item, index) => (
            <div
              key={item._key} // Sanity'nin _key'ini kullanıyoruz
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Görsel ve Parallax/Zoom efekti */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={urlFor(item.image).url()} // Sanity görsel URL'sini al
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority={index === 0} // İlk görseli öncelikli yükle
                />
              </div>

              {/* İçerik Katmanı */}
              <div className="relative z-20 p-6 flex flex-col justify-end text-white h-full bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent">
                <h2 className="font-bold leading-tight mb-2 text-4xl md:text-5xl lg:text-6xl">
                  {item.title}
                </h2>
                <p className="mb-4 text-lg md:text-xl">
                  {item.description}
                </p>
                {item.buttonText && item.buttonLink && ( // Buton varsa göster
                  <Link href={item.buttonLink}>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                      {item.buttonText}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* Slider Navigasyon Okları (Sadece birden fazla slayt varsa göster) */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors z-30 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous Slide"
              >
                <FiChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors z-30 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next Slide"
              >
                <FiChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Slider Sayfa Göstergeleri (Noktalar - Sadece birden fazla slayt varsa göster) */}
          {totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
              {homepageContent.heroSlider.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-gray-400 bg-opacity-70'
                  } hover:bg-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>

        {/* Sağ Kısım: Sabit İki Görsel */}
        {homepageContent.staticBanners.map((item) => (
          <div
            key={item._key} // Sanity'nin _key'ini kullanıyoruz
            className={`relative group overflow-hidden rounded-lg shadow-lg h-72`} // Sabit yükseklik veya dilediğiniz gibi ayarlayın
          >
            <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105">
              <Image
                src={urlFor(item.image).url()} // Sanity görsel URL'sini al
                alt={item.title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            
            <div className={`relative z-10 p-6 flex flex-col justify-end text-white h-full 
                            items-start text-left bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent`}>
              <h2 className="font-bold leading-tight mb-2 text-2xl md:text-3xl">
                {item.title}
              </h2>
              <p className="mb-4 text-base">
                {item.description}
              </p>
              {item.buttonText && item.buttonLink && ( // Buton varsa göster
                <Link href={item.buttonLink}>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                    {item.buttonText}
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}