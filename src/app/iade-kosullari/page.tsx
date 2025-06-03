// src/app/iade-kosullari/page.tsx
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-800">İade Koşulları</span>
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          İade ve Değişim Koşulları
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Satın aldığınız ürünleri kolayca iade edebilir veya değiştirebilirsiniz.
        </p>
      </div>

      {/* Content */}
      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-gray-700">
          <p className="mb-6">
            [Şirket Adınız] olarak müşteri memnuniyeti bizim önceliğimizdir. Satın aldığınız ürünlerden herhangi bir nedenle memnun kalmazsanız, aşağıda belirtilen koşullar dahilinde iade veya değişim yapabilirsiniz.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            1. İade Süresi
          </h2>
          <p className="mb-4">
            Ürün teslim tarihinden itibaren **14 gün içinde** iade talebinde bulunmanız gerekmektedir. Bu süre, mesafeli satış sözleşmeleri uyarınca yasal cayma hakkı süresidir.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            2. İade Şartları
          </h2>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>İade edilecek ürünler **kullanılmamış**, giyilmemiş, yıkanmamış ve hasar görmemiş olmalıdır.</li>
            <li>Tüm etiketleri üzerinde takılı olmalı ve orijinal ambalajı ile birlikte eksiksiz olarak gönderilmelidir.</li>
            <li>Hijyen ürünleri (iç giyim, mayo vb.) ve kişisel bakım ürünleri (kozmetik vb.) ambalajı açılmamış, denenmemiş ve bozulmamış olmak kaydıyla iade edilebilir. Aksi takdirde hijyen nedeniyle iade kabul edilmemektedir.</li>
            <li>Fatura veya e-arşiv faturasının bir kopyası iade paketi içerisinde mutlaka bulunmalıdır.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            3. İade Süreci
          </h2>
          <ol className="list-decimal list-inside mb-4 ml-4">
            <li>İade talebinizi [e-posta adresiniz] adresine e-posta göndererek veya [telefon numaranız] numaralı müşteri hizmetlerimizi arayarak bize bildirin.</li>
            <li>Talebiniz onaylandıktan sonra, size iade kodu veya anlaşmalı kargo bilgisi verilecektir.</li>
            <li>Ürünleri, orijinal ambalajı, faturası ve tüm aksesuarları ile birlikte size verilen iade kodu ile kargoya teslim edin. Kargo ücreti genellikle alıcıya aittir, ancak hatalı veya kusurlu ürünlerde firmamız karşılar.</li>
            <li>İade ettiğiniz ürünler depomuza ulaştıktan sonra, uzman ekibimiz tarafından kontrol edilecek ve iade şartlarına uygun olup olmadığı değerlendirilecektir.</li>
            <li>İade şartlarına uygun bulunan ürünlerin bedeli, bankanıza bağlı olarak 3-7 iş günü içinde ödeme yaptığınız kredi kartına/banka hesabına iade edilecektir.</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            4. Değişim Koşulları
          </h2>
          <p className="mb-4">
            Ürün değişimi yapmak isterseniz, yukarıdaki iade şartları geçerlidir. Değişim talebinizi belirtirken, değiştirmek istediğiniz ürünün yerine almak istediğiniz ürünün model, beden veya renk bilgilerini iletmelisiniz. Stok durumu kontrol edildikten sonra değişim süreci başlatılacaktır. Değişim durumunda kargo ücreti politikamız iade ile benzerdir.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            5. Hasarlı veya Hatalı Ürünler
          </h2>
          <p className="mb-4">
            Kargo teslimatı sırasında veya ürünün kendisinde herhangi bir hasar veya hata fark ederseniz, lütfen kargo görevlisine tutanak tutturarak ürünü teslim almayın ve hemen müşteri hizmetlerimizle iletişime geçin. Bu durumda kargo ve iade/değişim masrafları firmamıza aittir.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            6. İletişim
          </h2>
          <p className="mb-4">
            İade ve değişim süreçleri hakkında herhangi bir sorunuz varsa, lütfen [e-posta adresiniz] adresinden bize ulaşın veya [telefon numaranız] numaralı hattımızdan destek alın.
          </p>

          <p className="text-sm text-gray-600 mt-8">
            Son Güncelleme: 22 Mayıs 2025
          </p>
        </div>
      </section>
    </div>
  );
}