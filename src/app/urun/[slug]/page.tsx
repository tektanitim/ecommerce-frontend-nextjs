"use client";


import {useEffect, useState} from 'react';
import { useParams } from "next/navigation";
import Image from "next/image";
import {client, urlFor} from '@/utils/sanity';
import Link from "next/link"
import { FiMinus, FiPlus, FiStar, FiShoppingCart } from "react-icons/fi"


// Sanity'den ürün detaylarını çekecek asenkron fonksiyon
async function getProductBySlug(slug: string) {
  // GROQ sorgusu: slug'ı verilen ürünü çek, detayları ve resimlerini getir
  // Sanity'deki şemanıza göre alan adlarını kontrol edin (örn: 'name' yerine 'title' kullanılmış olabilir)
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name, // Sanity şemanızdaki ürün adı alanı (sizin şemanızda 'name' idi)
    "slug": slug.current,
    price,
    description,
    images[]{
      asset->{
        _id,
        url
      }
    },
    // Medusa'daki varyantlar ve seçenekler yerine Sanity'deki yapıyı kullanmanız gerekecek.
    // Eğer Sanity'de varyantlar ve seçenekler tanımlamadıysanız, bu kısımlar çalışmaz.
    // Şimdilik basit bir ürün detayı için bunları yoksayıyoruz.
    // Eğer varyantlarınız varsa, Sanity şemanızı güncelleyip buraya eklemeniz gerekecek.
    // Örneğin: options[]{name, values} veya variants[]{...}
  }`;
  const product = await client.fetch(query, { slug });
  return product;
}


export default function ProductDetailPage() {
  const params = useParams();
  const slugParam = params?.slug as string;

  // slug parametresini doğrudan kullanacağız, id çekmeye gerek yok
  // const productId = slugParam?.split("-").pop() || "" // Bu satırı artık kullanmayacağız

  const [productData, setProductData] = useState<any | null>(null); // Ürünün ham verisi
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Server Component'te veriyi çekme mantığı
  // Bu kısım normalde ProductDetailPage dışarıda async function olarak tanımlanır
  // Ancak client component içinde olduğumuz için useEffect'i kullanmaya devam edeceğiz.
  // Optimal çözüm için bu componenti Server Component'e çevirmek daha iyi olurdu,
  // ancak mevcut yapıyı korumak için useEffect kullanıyoruz.

  useEffect(() => {
    if (!slugParam) return;

    // Sanity'den ürün detaylarını çek
    getProductBySlug(slugParam)
      .then((prod) => {
        if (prod) {
          setProductData(prod);
          // Resim URL'lerini Sanity'nin urlFor helper'ı ile oluştur
          if (prod.images && prod.images.length > 0) {
            setMainImage(urlFor(prod.images[0]).url());
          }
        } else {
          setError("Ürün bulunamadı.");
        }
      })
      .catch((err) => {
        console.error("Ürün alınamadı:", err);
        setError("Ürün bulunamadı.");
      });
  }, [slugParam]);


  const handleQuantityChange = (type: "inc" | "dec") => {
    setQuantity(prev => {
      if (type === "dec") return Math.max(1, prev - 1);
      return prev + 1;
    });
  };

  // Fiyatlandırma: Sanity'den gelen direkt 'price' alanını kullanacağız.
  // Medusa'daki varyantlar ve fiyat listeleri yerine Sanity'deki basit 'price' alanını alıyoruz.
  const price = productData?.price || 0; // Sanity'deki fiyat alanı
  const salePrice = (price * 0.9).toFixed(2); // Sanity'deki fiyattan indirimli fiyatı hesaplayın
  const discountPercentage = 10; // Örnek indirim oranı


  if (!productData) { // Sanity'den veri gelene kadar yükleniyor
    return <div className="text-center py-20 text-gray-500">Yükleniyor...</div>;
  }

  // Medusa'daki product.title yerine Sanity'deki product.name kullanın
  // Medusa'daki product.images?.[0]?.url yerine Sanity'deki urlFor(product.images[0]).url() kullanın
  // Medusa'daki product.options? yerine Sanity'deki ürün varyantlarını kontrol edin (eğer eklediyseniz)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Sol: Görseller */}
        <div>
          <div className="relative w-full h-[400px] border">
            {mainImage && ( // mainImage doluysa göster
              <Image
                src={mainImage}
                alt={productData.name} // Sanity'deki ürün adı
                fill
                style={{ objectFit: "contain" }}
                className="rounded"
              />
            )}
          </div>

          <div className="flex mt-4 gap-3">
            {productData.images?.map((img: any, i: number) => (
              <div
                key={i}
                className={`w-20 h-20 relative border-2 rounded cursor-pointer ${
                  mainImage === urlFor(img).url() ? "border-blue-600" : "border-gray-300" // Sanity resim URL'leri
                }`}
                onClick={() => setMainImage(urlFor(img).url())} // Sanity resim URL'leri
              >
                <Image
                  src={urlFor(img).url()} // Sanity resim URL'leri
                  alt={`Alt Resim ${i}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sağ: Ürün Bilgileri */}
        <div>
          <h1 className="text-3xl font-bold">{productData.name}</h1> {/* Sanity'deki ürün adı */}
          <p className="text-gray-600 mt-2">{productData.description}</p> {/* Sanity'deki açıklama */}

          <div className="mt-4 flex items-center space-x-3">
            <span className="text-2xl text-blue-600 font-semibold">
              TL {price ? salePrice : 'N/A'} {/* Fiyatı kontrol edin */}
            </span>
            {price > +salePrice && ( // İndirimli fiyatı gösterme koşulu
              <>
                <span className="line-through text-gray-500">TL {price.toFixed(2)}</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Varyant Seçenekleri - Bu kısım Sanity şemanızda 'options' alanı yoksa çalışmaz.
              Medusa'dan farklı bir varyant yapısı gerektirecek. Şimdilik yorum satırı yapıyoruz.
              Eğer Sanity'de varyantları tanımladıysanız, burayı kendi Sanity yapınıza göre güncellemeniz gerekir.
          */}
          {/*
          {productData.options?.map((opt: any) => (
            <div key={opt.id} className="mt-6">
              <span className="font-medium">{opt.title}:</span>
              <div className="flex gap-2 mt-2 flex-wrap">
                {opt.values.map((val: any) => (
                  <button
                    key={val.id}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [opt.id]: val.value,
                      }))
                    }
                    className={`px-4 py-2 border rounded ${
                      selectedOptions[opt.id] === val.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {val.value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          */}

          {/* Sepet ve Adet */}
          <div className="mt-8 flex gap-4 items-center">
            <div className="flex border rounded">
              <button
                onClick={() => handleQuantityChange("dec")}
                className="px-3 py-1 text-xl"
              >
                <FiMinus />
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("inc")}
                className="px-3 py-1 text-xl"
              >
                <FiPlus />
              </button>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              <FiShoppingCart /> Sepete Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Ürün Açıklaması */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-2">Ürün Açıklaması</h2>
        <p className="text-gray-700 leading-relaxed">{productData.description}</p>
      </div>

      {/* Yorumlar - Bu kısım için ayrı bir API veya Sanity modeli gerekebilir, şu an statik bırakıldı */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Yorumlar</h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 rounded bg-white shadow">
              <div className="flex items-center gap-2 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} />
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-2">Harika ürün, çok beğendim!</p>
              <p className="text-gray-400 text-xs">Yazan: Kullanıcı{i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}