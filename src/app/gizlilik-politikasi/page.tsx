// src/app/gizlilik-politikasi/page.tsx
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-800">Gizlilik Politikası</span>
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Gizlilik Politikası
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Kişisel verilerinizin korunması ve işlenmesi ile ilgili detaylı bilgi.
        </p>
      </div>

      {/* Content */}
      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-gray-700">
          <p className="mb-6">
            Bu Gizlilik Politikası, [Şirket Adınız] (&quot;biz&quot;, &quot;bize&quot; veya &quot;bizim&quot;) tarafından işletilen web sitemizi ziyaret ettiğinizde veya kullandığınızda kişisel bilgilerinizin nasıl toplandığını, kullanıldığını ve paylaşıldığını açıklar. Gizliliğiniz bizim için çok önemlidir ve verilerinizi korumak için en yüksek standartlarda çalışmayı taahhüt ediyoruz.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            1. Hangi Bilgileri Topluyoruz?
          </h2>
          <p className="mb-4">
            Web sitemizi ziyaret ettiğinizde, aşağıdaki türde bilgileri toplayabiliriz:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>**Doğrudan Sağladığınız Bilgiler:** Adınız, soyadınız, e-posta adresiniz, telefon numaranız, teslimat adresiniz, ödeme bilgileriniz (örneğin, kredi kartı numaraları) gibi bize doğrudan sağladığınız bilgiler. Bu bilgiler genellikle sipariş verirken, hesap oluştururken veya iletişim formu doldururken toplanır.</li>
            <li>**Otomatik Olarak Toplanan Bilgiler:** IP adresiniz, tarayıcı türünüz, cihaz türünüz, işletim sisteminiz, ziyaret ettiğiniz sayfalar, ziyaret tarih ve saatleri, referans URL'ler ve web sitemizle olan etkileşimleriniz gibi bilgiler otomatik olarak toplanır. Bu bilgiler çerezler ve benzeri teknolojiler aracılığıyla toplanır.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            2. Bilgilerinizi Nasıl Kullanıyoruz?
          </h2>
          <p className="mb-4">
            Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Siparişlerinizi işlemek ve tamamlamak.</li>
            <li>Hesabınızı yönetmek ve size hizmet sunmak.</li>
            <li>Web sitesi deneyiminizi kişiselleştirmek ve geliştirmek.</li>
            <li>Size ürünlerimiz, hizmetlerimiz ve promosyonlarımız hakkında pazarlama iletişimleri göndermek (tercihlerinize uygun olarak).</li>
            <li>Web sitemizin güvenliğini sağlamak ve dolandırıcılığı önlemek.</li>
            <li>Yasal yükümlülüklere uymak ve yasal taleplere yanıt vermek.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            3. Bilgilerinizi Kimlerle Paylaşıyoruz?
          </h2>
          <p className="mb-4">
            Kişisel bilgilerinizi aşağıdaki durumlarda üçüncü taraflarla paylaşabiliriz:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>**Hizmet Sağlayıcılar:** Ödeme işleme, kargo, pazarlama, veri analizi gibi hizmetleri sağlayan üçüncü taraf firmalarla. Bu firmalar yalnızca hizmetlerini yerine getirmek için gerekli olan bilgilere erişebilirler ve bu bilgileri başka amaçlar için kullanamazlar.</li>
            <li>**Yasal Yükümlülükler:** Yasal bir yükümlülük gerektirdiğinde veya yasal bir talebe yanıt olarak bilgilerinizi ifşa edebiliriz.</li>
            <li>**İş Transferleri:** Şirketimizin varlıklarının satışı, birleşmesi veya devralınması durumunda kişisel bilgileriniz transfer edilen varlıklardan biri olabilir.</li>
            <li>**Rızanızla:** Açık rızanızla bilgileriniz üçüncü taraflarla paylaşılabilir.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            4. Çerezler
          </h2>
          <p className="mb-4">
            Web sitemiz, deneyiminizi iyileştirmek, trafiği analiz etmek ve reklamları kişiselleştirmek için çerezleri ve benzer teknolojileri kullanır. Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            5. Veri Güvenliği
          </h2>
          <p className="mb-4">
            Kişisel bilgilerinizin güvenliğini sağlamak için teknik ve idari önlemler alıyoruz. Ancak, internet üzerinden hiçbir veri iletimi veya depolama yöntemi %100 güvenli değildir.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            6. Haklarınız
          </h2>
          <p className="mb-4">
            Geçerli veri koruma yasalarına tabi olarak, kişisel bilgilerinizle ilgili belirli haklara sahip olabilirsiniz. Bu haklar arasında bilgilerinize erişme, düzeltme, silme veya işlemeyi kısıtlama hakkı yer alabilir. Bu haklarınızı kullanmak için lütfen [e-posta adresiniz] adresinden bizimle iletişime geçin.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            7. Gizlilik Politikasındaki Değişiklikler
          </h2>
          <p className="mb-4">
            Bu Gizlilik Politikası zaman zaman güncellenebilir. Herhangi bir değişiklik, bu sayfada yayınlandıktan hemen sonra yürürlüğe girer. Önemli değişiklikler için sizi bilgilendirebiliriz.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            8. Bize Ulaşın
          </h2>
          <p className="mb-4">
            Gizlilik Politikamız hakkında herhangi bir sorunuz veya endişeniz varsa, lütfen [e-posta adresiniz] adresinden bizimle iletişime geçmekten çekinmeyin.
          </p>

          <p className="text-sm text-gray-600 mt-8">
            Son Güncelleme: 22 Mayıs 2025
          </p>
        </div>
      </section>
    </div>
  );
}