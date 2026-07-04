'use client';

import { getWhatsAppUrl } from '@/lib/utils/whatsapp';

export default function FloatingWhatsAppButton({ phone }: { phone?: string }) {
  if (!phone) return null;

  const defaultMessage = "Merhaba, web siteniz üzerinden ulaşıyorum. Bilgi almak istiyorum.";
  const whatsappUrl = getWhatsAppUrl(phone, defaultMessage);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1ebe57] transition-all hover:scale-110"
      aria-label="WhatsApp ile İletişime Geçin"
    >
      {/* WhatsApp logo SVG — no external dependency */}
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.02 3.2C9.02 3.2 3.33 8.82 3.33 15.74c0 2.2.58 4.35 1.68 6.24L3.2 28.8l6.98-1.78a12.83 12.83 0 0 0 5.84 1.43c7 0 12.69-5.62 12.69-12.54S23.02 3.2 16.02 3.2Zm0 22.98c-1.83 0-3.62-.49-5.18-1.42l-.37-.22-4.14 1.05 1.1-4.02-.25-.39a10.18 10.18 0 0 1-1.57-5.44c0-5.68 4.67-10.3 10.41-10.3s10.41 4.62 10.41 10.3-4.67 10.44-10.41 10.44Zm5.72-7.7c-.31-.16-1.85-.9-2.14-1-.29-.11-.5-.16-.71.16-.21.31-.82 1-.99 1.2-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.49-1.52-.92-.81-1.54-1.82-1.72-2.13-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.69-.98-2.32-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.22 3.35 5.39 4.7.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.85-.75 2.11-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36Z"/>
      </svg>
    </a>
  );
}
