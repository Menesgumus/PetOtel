'use client';

import { MessageCircle } from 'lucide-react';
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
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
