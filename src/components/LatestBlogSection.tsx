// src/components/LatestBlogSection.tsx
"use client"; // Bu bileşenin istemci tarafında çalışmasını sağlar

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi'; // "VIEW ALL BLOG" butonu için ikon
import { client, urlFor } from '@/utils/sanity'; // Sanity client ve urlFor import edildi

// BlogCard bileşenini ve SanityBlogPost tipini import ettik
import BlogCard from '@/components/BlogCard';
import { SanityBlogPost } from '@/app/blog/page'; // BlogListPage'den export edilen tipi kullanıyoruz

const LatestBlogSection: React.FC = () => {
  const [latestBlogPosts, setLatestBlogPosts] = useState<SanityBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestBlogPosts() {
      setLoading(true);
      setError(null);
      try {
        // Sanity'den en yeni 3 blog postunu çekme sorgusu
        // publishedAt'e göre azalan sırada sırala ve ilk 3'ü al
        const query = `*[_type == "post"] | order(publishedAt desc)[0...3]{
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
        setLatestBlogPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("En yeni blog gönderileri çekilemedi:", err);
        setError("En yeni blog gönderileri yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    }
    fetchLatestBlogPosts();
  }, []); // Sadece bir kere yüklenecek

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-20 text-center text-gray-500">
        <p>En yeni blog gönderileri yükleniyor...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-20 text-center text-red-500">
        <p>{error}</p>
        <p>Lütfen Sanity Studio'da blog gönderileri olduğundan ve yayınlandığından emin olun.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-pink-600 font-semibold uppercase text-sm mb-2">NEWS & BLOG</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Latest News & Blog
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center text-pink-600 font-semibold hover:text-pink-800 transition-colors duration-200 group"
        >
          VIEW ALL BLOG
          <FiArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {latestBlogPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogPosts.map((post) => (
            <BlogCard
              key={post._id} // Sanity ID'sini kullanıyoruz
              post={post} // Tüm post objesini BlogCard'a iletiyoruz
              urlFor={urlFor} // urlFor fonksiyonunu da BlogCard'a iletiyoruz
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600 bg-white rounded-lg shadow-md">
          Henüz blog gönderisi bulunmamaktadır.
        </div>
      )}
    </section>
  );
};

export default LatestBlogSection;