// Bu bileşenin client-side'da çalışmasını sağlar, useParams kullanıldığı için zorunludur.
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // URL'deki slug'ı almak için
import { client, urlFor } from '@/utils/sanity'; // Sanity client ve resim URL oluşturucu
import ProductCard from '@/components/ProductCard'; // Ürün kartı bileşeni

// --- Sanity Ürün ve Kategori Tipleri (Basitleştirilmiş) ---
// Bu tiplerin Sanity Studio'daki şemalarınızla uyumlu olduğundan emin olun!
type SanityProduct = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: { asset: { _ref: string; _type: string } }[];
  // Şimdilik sadece ürün kartı için gereken temel alanları tutuyoruz.
  // İleride filtreleme için 'availability', 'colors', 'sizes' gibi alanları ekleyebilirsiniz.
};

type SanityCategory = {
  _id: string;
  title: string;
  slug: string;
};

// --- Kategori Sayfası Bileşeni ---
export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string; // URL'den kategori slug'ını al

  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<SanityCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryData() {
      setLoading(true);
      setError(null); // Her yeni çekimde hatayı sıfırla

      try {
        // 1. Kategori bilgisini çek (başlığı göstermek için)
        const categoryQuery = `*[_type == "category" && slug.current == $categorySlug][0]{
          _id,
          title,
          "slug": slug.current
        }`;
        const fetchedCategoryInfo: SanityCategory = await client.fetch(categoryQuery, { categorySlug });
        setCategoryInfo(fetchedCategoryInfo);

        if (!fetchedCategoryInfo) {
          setError(`"${categorySlug}" slug'ına sahip kategori bulunamadı. Lütfen Sanity Studio'da bu kategoriye ait bir giriş olduğundan ve yayınlandığından emin olun.`);
          setLoading(false);
          return;
        }

        // 2. Kategoriye ait ürünleri çekmek için GROQ sorgusu
        // 'product' dokümanınızın 'category' alanının 'category' dokümanına referans verdiğini varsayıyoruz.
        const productsQuery = `*[_type == "product" && category->slug.current == $categorySlug]{
          _id,
          name,
          "slug": slug.current,
          price,
          images[]{
            asset->{
              url
            }
          }
        }`;

        const fetchedProducts: SanityProduct[] = await client.fetch(productsQuery, { categorySlug });
        setProducts(fetchedProducts);
        setLoading(false);

      } catch (err) {
        console.error("Veri alınamadı:", err);
        setError("Veriler yüklenirken bir hata oluştu. Lütfen konsolu kontrol edin ve Sanity Studio yapılandırmanızı gözden geçirin.");
        setLoading(false);
      }
    }

    fetchCategoryData();
  }, [categorySlug]); // categorySlug değiştiğinde tekrar veri çek

  // Kategori adı için gösterilecek metin
  const displayCategoryName = categoryInfo ? categoryInfo.title :
    categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // --- Yükleme ve Hata Durumları ---
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Ürünler yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
        <p>Lütfen Sanity Studio'daki kategori slug'ının ve ürünlerinizin doğru yapılandırıldığından ve yayınlandığından emin olun.</p>
      </div>
    );
  }

  // --- Ürünleri Listeleme ---
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb ve Kategori Başlığı */}
        <p className="text-sm text-gray-600 mb-2">
          <Link href="/" className="hover:underline">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-800">{displayCategoryName}</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {displayCategoryName} Ürünleri
        </h1>

        {/* Ürün Listesi Grid'i */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                slug={product.slug}
                imageSrc={product.images && product.images.length > 0 ? urlFor(product.images[0]).url() : '/images/placeholder.png'}
                altText={product.name}
                name={product.name}
                originalPrice={product.price * 1.1} // Örnek olarak %10 daha yüksek bir orijinal fiyat
                salePrice={product.price}
                discountPercentage={10} // Örnek indirim oranı
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600 bg-white rounded-lg shadow-md">
            Bu kategoride henüz ürün bulunmamaktadır.
          </div>
        )}
      </div>
    </div>
  );
}