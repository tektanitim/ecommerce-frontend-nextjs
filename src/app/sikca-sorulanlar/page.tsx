// src/app/sikca-sorulanlar/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // İkonları ekledik

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {question}
        </h3>
        {isOpen ? (
          <FiChevronUp className="w-5 h-5 text-blue-600" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-700 leading-relaxed animate-fadeIn">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Siparişimi nasıl takip edebilirim?",
      answer: "Siparişinizi, 'Siparişlerim' sayfasından veya size e-posta ile gönderilen takip numarasını kullanarak kargo firmasının web sitesinden takip edebilirsiniz. Siparişiniz kargoya verildiğinde size bilgilendirme e-postası ve SMS gönderilecektir."
    },
    {
      question: "Ürün iadesi veya değişimi yapabilir miyim?",
      answer: "Evet, kullanılmamış ve orijinal ambalajında olan ürünlerinizi, teslim tarihinden itibaren 14 gün içinde iade edebilir veya değiştirebilirsiniz. Detaylı bilgi için lütfen İade Koşulları sayfamızı ziyaret edin."
    },
    {
      question: "Ödeme seçenekleriniz nelerdir?",
      answer: "Kredi kartı (Visa, MasterCard, American Express), banka havalesi/EFT ve belirli bankaların sanal kartları ile ödeme yapabilirsiniz. Kapıda ödeme seçeneğimiz bulunmamaktadır."
    },
    {
      question: "Kargo ücreti ne kadar?",
      answer: "Belirli bir tutar üzerindeki siparişlerinizde kargo ücretsizdir. Bu tutarın altındaki siparişleriniz için sabit bir kargo ücreti uygulanır. Güncel kargo ücretini sepet sayfanızda görebilirsiniz."
    },
    {
      question: "Ürün stokta yoksa ne yapmalıyım?",
      answer: "Stokta olmayan ürünler için 'Beni Haberdar Et' butonunu kullanarak e-posta adresinizi bırakabilirsiniz. Ürün stoğa girdiğinde size otomatik olarak bildirim gönderilecektir."
    },
    {
      question: "Gizlilik politikası hakkında bilgi alabilir miyim?",
      answer: "Kişisel verilerinizin korunması ve işlenmesi ile ilgili detaylı bilgi için lütfen Gizlilik Politikası sayfamızı inceleyiniz. Verileriniz, yasal düzenlemelere uygun olarak ve sizin rızanız dahilinde işlenmektedir."
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-800">Sıkça Sorulan Sorular</span>
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Sıkça Sorulan Sorular
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Aradığınız cevabı bulmak için aşağıdaki sıkça sorulan sorulara göz atabilirsiniz.
        </p>
      </div>

      {/* FAQ Content */}
      <section className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}