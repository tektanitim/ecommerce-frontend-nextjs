"use client";

import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { FiUser, FiCalendar, FiTag } from 'react-icons/fi';
import { client, urlFor } from '@/utils/sanity'; // Sanity client ve urlFor
import { PortableText } from '@portabletext/react'; // Portable Text render için

import { useState,useEffect } from 'react';

// --- Sanity Blog Post Tipleri ---
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

interface SanityBlogPost {
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

// Portable Text içeriğini özelleştirmek için bileşenler (opsiyonel)
const components = {
  types: {
    image: ({ value }: any) => {
      // Görselin alt metni varsa onu da alt özelliğine ekle
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog görseli'}
            width={700} // Maksimum genişlik için (tailwind max-w-none'dan sonra responsive olur)
            height={400} // Varsayılan yükseklik
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            className="rounded-lg shadow-md"
            quality={80}
            sizes="(max-width: 768px) 100vw, 700px" // Responsive image sizes
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    // Diğer özel tipler (örn: code, youtube) buraya eklenebilir
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold my-3">{children}</h4>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic text-gray-700 my-4">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 my-3">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 my-3">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </Link>
      );
    },
    // Strong, em gibi diğer marklar için varsayılan render yeterli olacaktır
  },
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<SanityBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      setLoading(true);
      setError(null);
      try {
        // Sanity'den post'u çekme sorgusu
        const query = `*[_type == "post" && slug.current == $slug][0]{
          _id,
          title,
          "slug": slug.current,
          excerpt,
          mainImage,
          publishedAt,
          body,
          tags,
          author->{ // Yazar referansını çekiyoruz
            _id,
            name,
            "slug": slug.current,
            image
          },
          categories[]->{ // Kategorileri de çekiyoruz
            _id,
            title,
            "slug": slug.current
          }
        }`;
        const data: SanityBlogPost = await client.fetch(query, { slug });
        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error("Blog post çekilemedi:", err);
        setError("Blog yazısı yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    }
    fetchBlogPost();
  }, [slug]); // Slug değiştiğinde tekrar çek

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Blog yazısı yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
        <p>Lütfen Sanity Studio'da bu slug'a sahip bir blog yazısı olduğundan ve yayınlandığından emin olun.</p>
      </div>
    );
  }

  if (!post) {
    notFound(); // Blog yazısı bulunamazsa 404 sayfasını göster
  }

  // Tarih biçimlendirme
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:underline">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-800 line-clamp-1">{post.title}</span>
          </p>
        </div>
      </div>

      {/* Blog Detay İçeriği */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Blog Başlığı */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Yazar ve Tarih Bilgileri */}
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <FiUser className="w-4 h-4 mr-1" />
            <span className="mr-3">By {post.author.name}</span>
            <FiCalendar className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
            {post.categories && post.categories.length > 0 && (
              <>
                <span className="mx-3">•</span>
                <FiTag className="w-4 h-4 mr-1" />
                <span>{post.categories[0]?.title}</span> {/* Şimdilik ilk kategoriyi alıyoruz */}
              </>
            )}
          </div>

          {/* Blog Görseli */}
          {post.mainImage && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.mainImage.asset?._ref || post.title} // Veya Sanity'deki alt alanını kullanın
                fill
                style={{ objectFit: 'cover' }}
                priority // Detay sayfasında görselin hızlı yüklenmesi için
              />
            </div>
          )}

          {/* Blog İçeriği (PortableText ile render ediliyor) */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            <PortableText value={post.body} components={components} />
          </div>

          {/* Etiketler */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <span className="text-lg font-semibold text-gray-800 mr-3">Tags:</span>
              {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}