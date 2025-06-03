"use client";

import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import TrendingProducts from "@/components/TrendingProducts"; // Bu bileşenin içeriğini de güncelleyeceğiz
import FeaturedBanners from "@/components/FeaturedBanners";
import ServiceFeatures from "@/components/ServiceFeatures";
import MarqueeTicker from "@/components/MarqueeTicker";
import VideoFeature from "@/components/VideoFeature";
import LatestBlogSection from "@/components/LatestBlogSection";
// Eski: import axiosClient from "../../lib/medusa-client";
// Eski: import { useState, useEffect } from "react";
// Eski: import axios from "axios";
// Yeni:
import { useState, useEffect } from "react"; // client component olduğu için hala ihtiyaç var
import { client, urlFor } from '@/utils/sanity'; // Sanity client ve resim URL oluşturucu
import ProductCard from "@/components/ProductCard"; // ProductCard'ı import edin



// Sanity'den ürünleri çekecek fonksiyon (aynı zamanda diğer sayfalarda da kullanılabilir)
async function getSanityProducts() {
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
  const products = await client.fetch(query);
  return products;
}

// Sanity ürün tipi tanımı
type SanityProduct = {
  _id: string; // Sanity'deki ID
  name: string;
  slug: string; // Slug'ı ekledik
  price: number;
  description: string;
  images: { asset: { url: string } }[];
};


export default function Home() {
  const [products, setProducts] = useState<SanityProduct[]>([]); // Tipini güncelledik
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    getSanityProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity ürünleri alınamadı:", err);
        setError("Ürünler yüklenirken bir hata oluştu.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Ürünler yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <>
      <HeroSection />
      {/*<h1 className="text-2xl font-bold mb-4">Ana Sayfa Ürünleri</h1> {/* Başlığı güncelledik */}
      {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              slug={product.slug} // **BURASI ÇOK ÖNEMLİ:** Sanity'den gelen slug'ı geçiriyoruz
              imageSrc={product.images && product.images.length > 0 ? urlFor(product.images[0]).url() : '/placeholder.jpg'} // Sanity resim URL'i
              altText={product.name}
              name={product.name}
              originalPrice={product.price * 1.1} // Örnek fiyatlama: %10 daha pahalı
              salePrice={product.price}
              discountPercentage={10} // Örnek indirim
            />
          ))}
      </div> */}
      <ServiceFeatures />
      <TrendingProducts /> {/* Bu bileşen de Sanity verisine ihtiyaç duyabilir */}
      <FeaturedBanners />
      <MarqueeTicker />
      <VideoFeature />
      <LatestBlogSection />
    </>
  );
}
