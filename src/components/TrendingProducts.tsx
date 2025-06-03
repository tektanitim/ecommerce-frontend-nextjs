// src/components/TrendingProducts.tsx
"use client";

import ProductCard from "@/components/ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
// Eski: import axios from "axios";
import Image from "next/image";

// Yeni:
import { client, urlFor } from '@/utils/sanity'; // Sanity client ve resim URL oluşturucu


// Sanity'den beklediğimiz ürün tipi tanımı
type SanityProduct = {
  _id: string;
  name: string;
  slug: string; // ProductCard için gerekli
  price: number;
  description: string;
  images: { asset: { url: string } }[]; // Sanity resim yapısı
}


export default function TrendingProducts() {

  const [products, setProducts] = useState<SanityProduct[]>([]); // Tipini güncelledik
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Hata yönetimi için ekledik


  useEffect(() => {
    // Sanity'den ürünleri çekecek fonksiyon
    const getTrendingProducts = async () => {
      try {
        // Sanity'nin GROQ sorgu dili ile trend ürünleri çekiyoruz.
        // "Trend" ürünleri çekmek için Sanity şemanızda özel bir alan (örneğin 'isTrending: boolean')
        // veya belirli bir kategoriden (collection_id yerine category slug'ı) çekebilirsiniz.
        // Şimdilik tüm ürünleri çekip "trend" olarak gösteriyoruz.
        // İsterseniz 'category->slug.current == "trend-urunler"' gibi bir koşul ekleyebilirsiniz.
        const query = `*[_type == "product"]{
          _id,
          name,
          "slug": slug.current,
          price,
          description,
          images[]{
            asset->{
              url
            }
          }
        }`;
        const fetchedProducts = await client.fetch(query);
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Sanity trend ürünler alınamadı:", err);
        setError("Trend ürünler yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    getTrendingProducts();
  }, []);

  if (loading) return <p className="text-center py-8">Trend Ürünler Yükleniyor...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (products.length === 0) return <p className="text-center py-8 text-gray-500">Henüz trend ürün bulunmamaktadır.</p>;


  // Kaydırma fonksiyonları buraya eklenecek (şimdilik placeholder)
  const scrollLeft = () => {
    // Scroll logic
    console.log('Scroll Left');
  };

  const scrollRight = () => {
    // Scroll logic
    console.log('Scroll Right');
  };

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      {/* Başlık ve Navigasyon Okları */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Products</h2>
          <p className="text-gray-600">Follow the most popular trends and get exclusive items from DESINGBAG shop.</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={scrollLeft}
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Önceki Ürünler"
          >
            <FiChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sonraki Ürünler"
          >
            <FiChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Ürün Kartları Grid'i */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          // Fiyatlandırma: Sanity'den gelen direkt 'price' alanını kullanıyoruz
          const originalPrice = product.price || 0; // Sanity'deki price alanı
          const salePrice = (originalPrice * 0.9); // %10 indirimli fiyat
          const discountPercentage = 10; // İndirim oranı

          return (
            <ProductCard
              key={product._id} // Sanity'deki _id'yi kullanıyoruz
              slug={product.slug} // **BURASI ÇOK ÖNEMLİ:** slug'ı geçiriyoruz
              imageSrc={product.images && product.images.length > 0 ? urlFor(product.images[0]).url() : '/images/placeholder.png'} // Sanity resim URL'i
              altText={product.name}
              name={product.name}
              originalPrice={originalPrice}
              salePrice={salePrice}
              discountPercentage={discountPercentage}
            />
          );
        })}
      </div>
    </section>
  );
}