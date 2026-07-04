"use client";

import { useEffect, useState } from "react";
import { siteConfig } from '@/lib/site/config';
import { getWhatsAppUrl } from '@/lib/utils/whatsapp';

export function MobileContactBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector("#hero-primary-cta");

    if (!target) {
      const onScroll = () => setIsVisible(window.scrollY > 520);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`
        fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-2 border-t border-brand-border/80 bg-white/95 px-3 py-2 shadow-[0_-10px_30px_rgba(6,31,69,0.12)] backdrop-blur
        transition-all duration-300 ease-out
        md:hidden
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }
      `}
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={getWhatsAppUrl(siteConfig.whatsapp, "Merhaba, web siteniz üzerinden ulaşıyorum. Bilgi almak istiyorum.")}
        className="flex-1 bg-[#25D366] text-white text-center py-2.5 rounded-md font-bold text-sm shadow-sm"
        aria-label="WhatsApp ile iletişime geçin"
      >
        WhatsApp
      </a>
      <a
        href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
        className="flex-1 bg-brand-navy text-white text-center py-2.5 rounded-md font-bold text-sm shadow-sm"
        aria-label="Bizi arayın"
      >
        Ara
      </a>
      <a
        href={siteConfig.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-brand-soft border border-brand-border text-brand-text text-center py-2.5 rounded-md font-bold text-sm shadow-sm"
        aria-label="Yol tarifi alın"
      >
        Yol Tarifi
      </a>
    </div>
  );
}
