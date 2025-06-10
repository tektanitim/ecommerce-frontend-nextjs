// src/components/MarqueeTicker.tsx
"use client";

// Kayacak mesajlar
const messages = [
  "Ham Bez Çantalar!",
  "Plaj Çantaları!",
  "Günlük Kullanım için Çantalar!",
  "Toptan Bez Çanta!",
  "Clutch ve Keseler!",
  "Ürününüzü dizayn edin!",
];

export default function MarqueeTicker() {
  // Mesajları iki kez tekrarlayarak sonsuz kayma efekti için yeterli içerik sağlıyoruz
  const repeatedMessages = [...messages, ...messages];

  return (
    <div className="bg-gray-400 py-2 overflow-hidden whitespace-nowrap mt-4">
      {/* Kayan içeriğin kapsayıcısı */}
      <div className="inline-block animate-marquee will-change-transform">
        {repeatedMessages.map((msg, index) => (
          <span key={index} className="text-white text-lg font-semibold mx-8 inline-block">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}