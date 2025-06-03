// src/components/BlogCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiCalendar, FiChevronRight } from 'react-icons/fi'; // İkonları ekledik

// SanityBlogPost tipini src/app/blog/page.tsx dosyasından import ediyoruz
// SanityBlogPost'u dışa aktarılabilir (export) hale getirdiğimizden emin olun!
import { SanityBlogPost } from '@/app/blog/page';

// urlFor fonksiyonunun tipini belirtiyoruz. Sanity client'ınızdan import ettiğiniz yerdekiyle aynı olmalı.
interface UrlForBuilder {
  url: () => string;
}

interface SanityImageSource {
  asset: {
    _ref: string;
    _type: string;
  };
}

interface BlogCardProps {
  post: SanityBlogPost;
  urlFor: (source: SanityImageSource) => UrlForBuilder; // urlFor fonksiyonunu prop olarak alıyoruz
}

const BlogCard: React.FC<BlogCardProps> = ({ post, urlFor }) => {
  // Sanity'den gelen publishedAt string'ini Date objesine çeviriyoruz
  const publishedDate = new Date(post.publishedAt);
  const day = publishedDate.getDate(); // Günü alır (örn: 15)
  const month = publishedDate.toLocaleDateString('en-US', { month: 'short' }); // Ayın kısa adını alır (örn: "Dec")
  const year = publishedDate.getFullYear(); // Yılı alır (örn: 2025)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Blog Görseli */}
      <Link href={`/blog/${post.slug}`} className="block relative w-full h-60 md:h-72 overflow-hidden">
        {post.mainImage && ( // post.mainImage'ın varlığını kontrol ediyoruz
          <Image
            src={urlFor(post.mainImage).url()} // Sanity görsel URL'sini al
            alt={post.title} // Görselin alt metni olarak başlığı kullanıyoruz
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Responsive image sizes
          />
        )}
        {/* Tarih Etiketi */}
        <div className="absolute top-4 left-4 bg-pink-600 text-white p-3 rounded-md text-center font-bold">
          <span className="block text-xl leading-none">{day}</span>
          <span className="block text-xs uppercase">{month}</span>
        </div>
      </Link>

      {/* Blog Bilgileri */}
      <div className="p-4 md:p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FiUser className="w-4 h-4 mr-1" />
          <span className="mr-3">By {post.author.name}</span> {/* Yazar adı Sanity'den geliyor */}
          <FiCalendar className="w-4 h-4 mr-1" />
          <span>{`${day} ${month} ${year}`}</span> {/* Tam tarih formatı */}
        </div>
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight hover:text-pink-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-700 mt-3 mb-5 line-clamp-3">
          {post.excerpt} {/* shortDescription yerine excerpt kullanıyoruz */}
        </p>
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-pink-600 font-semibold hover:text-pink-800 transition-colors duration-200">
          READ MORE
          <FiChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;