// src/app/blog/page.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react'; // useState ve useEffect import edildi
import { client, urlFor } from '@/utils/sanity'; // Sanity client ve urlFor import edildi
import BlogCard from '@/components/BlogCard'; // BlogCard'ı buradan import ettik
import { FiClock } from 'react-icons/fi'; // Eğer BlogCard'da tarih için kullanılacaksa

// --- Sanity Blog Post Tipleri ---
// Bu tipler, blog/[slug]/page.tsx dosyasındaki tiplerle aynı olmalı veya ortak bir types.ts dosyasından gelmeli.
interface SanityAuthor {
  _id: string;
  name: string;
  slug: string;
  image?: { asset: { _ref: string; _type: string } };
}

interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
}

export interface SanityBlogPost { // BlogCard'ın da bu tipi kullanabilmesi için export edildi
  _id: string;
  title: string;
  slug: string;
  author: SanityAuthor;
  mainImage: { asset: { _ref: string; _type: string } };
  categories: SanityCategory[];
  publishedAt: string;
  excerpt: string;
  body: any[]; // Portable Text içeriği
  tags?: string[];
}

export default function BlogListPage() {
  const [blogPosts, setBlogPosts] = useState<SanityBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      setLoading(true);
      setError(null);
      try {
        // Sanity'den tüm blog postlarını çekme sorgusu
        // İhtiyacımız olan alanları çekiyoruz ve yazar ile kategori referanslarını çözüyoruz
        const query = `*[_type == "post"] | order(publishedAt desc){
          _id,
          title,
          "slug": slug.current,
          excerpt,
          mainImage,
          publishedAt,
          tags,
          author->{ // Yazar referansını çözüyoruz
            _id,
            name,
            "slug": slug.current,
            image
          },
          categories[]->{ // Kategorileri de çözüyoruz
            _id,
            title,
            "slug": slug.current
          }
        }`;
        const data: SanityBlogPost[] = await client.fetch(query);
        setBlogPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Blog gönderileri çekilemedi:", err);
        setError("Blog gönderileri yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    }
    fetchBlogPosts();
  }, []); // Sadece bir kere yüklenecek

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Blog gönderileri yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
        <p>Lütfen Sanity Studio'da blog gönderileri olduğundan ve yayınlandığından emin olun.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-800">Blog</span>
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Our Blog
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          En son moda trendleri, stil ipuçları ve daha fazlası için blogumuzu takip edin.
        </p>
      </div>

      {/* Blog Listesi */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post._id} // Sanity ID'sini kullanıyoruz
                post={post} // Tüm post objesini BlogCard'a iletiyoruz
                urlFor={urlFor} // urlFor fonksiyonunu da geçirebiliriz
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600 bg-white rounded-lg shadow-md">
            Henüz blog gönderisi bulunmamaktadır.
          </div>
        )}
      </section>
    </div>
  );
}