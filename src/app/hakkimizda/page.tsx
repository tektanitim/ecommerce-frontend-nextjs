// src/app/hakkimizda/page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // State ve Effect hookları
import { client, urlFor } from '@/utils/sanity'; // Sanity client ve urlFor
import { PortableText } from '@portabletext/react'; // Portable Text render için
import { motion } from 'framer-motion'; // Animasyonlar için Framer Motion kullanacağız

// Framer Motion için varyantlar (animasyon ayarları)
const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
};

// --- Sanity Hakkımızda Sayfası Tipleri ---
interface SanityAboutPageContent {
  _id: string;
  heroSection: {
    heading: string;
    content: any[]; // Portable Text
    image: { asset: { _ref: string; _type: string } };
  };
  historySection: {
    heading: string;
    establishedYear: string;
    content: any[]; // Portable Text
    image: { asset: { _ref: string; _type: string } };
  };
  missionVisionSection: {
    heading: string;
    content: any[]; // Portable Text
  };
}

// Portable Text içeriğini özelleştirmek için bileşenler (blog sayfasındakilerle aynı olabilir)
const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Görsel'}
            width={800}
            height={500}
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            className="rounded-lg shadow-md"
            quality={80}
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold my-3">{children}</h4>,
    normal: ({ children }: any) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>, // Varsayılan paragraf
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
  },
};


export default function AboutUsPage() {
  const [aboutPageContent, setAboutPageContent] = useState<SanityAboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAboutPageContent() {
      setLoading(true);
      setError(null);
      try {
        const query = `*[_type == "aboutPage"][0]{
          heroSection{
            heading,
            content,
            image
          },
          historySection{
            heading,
            establishedYear,
            content,
            image
          },
          missionVisionSection{
            heading,
            content
          }
        }`;
        const data: SanityAboutPageContent = await client.fetch(query);
        setAboutPageContent(data);
        setLoading(false);
      } catch (err) {
        console.error("Hakkımızda sayfası içeriği çekilemedi:", err);
        setError("Hakkımızda sayfası yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    }
    fetchAboutPageContent();
  }, []); // Sadece bir kere yüklenecek

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Hakkımızda sayfası yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
        <p>Lütfen Sanity Studio'da 'About Us Page' dokümanı oluşturduğunuzdan ve yayınladığınızdan emin olun.</p>
      </div>
    );
  }

  if (!aboutPageContent) {
    // Sayfa içeriği bulunamadıysa 404 döndürmek yerine bir mesaj gösterebiliriz
    // Next.js'in notFound() fonksiyonu sadece sunucu bileşenlerinde çalışır.
    // Client bileşeninde manuel olarak bir hata mesajı gösterebiliriz.
    return (
      <div className="text-center py-20 text-gray-600">
        <p>Hakkımızda sayfası içeriği bulunamadı.</p>
        <p>Lütfen Sanity Studio'da 'About Us Page' dokümanını oluşturun ve yayınlayın.</p>
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
            <span className="font-semibold text-gray-800">About Us</span>
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInVariants}
            className="order-2 lg:order-1"
          >
            <span className="text-sm font-semibold text-blue-600 uppercase mb-2 block">ABOUT US</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {aboutPageContent.heroSection.heading}
            </h2>
            <PortableText value={aboutPageContent.heroSection.content} components={components} />
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            className="order-1 lg:order-2 relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            {aboutPageContent.heroSection.image && (
              <Image
                src={urlFor(aboutPageContent.heroSection.image).url()}
                alt={aboutPageContent.heroSection.heading} // Veya Sanity'de alt text ekleyebilirsiniz
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="transition-transform duration-500 hover:scale-105"
                priority // En üstteki görsel olduğu için öncelikli yükle
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            {aboutPageContent.historySection.image && (
              <Image
                src={urlFor(aboutPageContent.historySection.image).url()}
                alt={aboutPageContent.historySection.heading} // Veya Sanity'de alt text ekleyebilirsiniz
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="transition-transform duration-500 hover:scale-105"
              />
            )}
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInVariants}
          >
            <span className="text-sm font-semibold text-blue-600 uppercase mb-2 block">OUR HISTORY</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {aboutPageContent.historySection.heading} - <span className="text-blue-600">{aboutPageContent.historySection.establishedYear}</span>
            </h2>
            <PortableText value={aboutPageContent.historySection.content} components={components} />
          </motion.div>
        </div>
      </section>

      {/* Ek Bilgiler / Misyon Vizyon veya Takım Bilgisi (Opsiyonel) */}
      <section className="bg-blue-600 text-white py-12 md:py-16 lg:py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {aboutPageContent.missionVisionSection.heading}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            <PortableText value={aboutPageContent.missionVisionSection.content} components={components} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}