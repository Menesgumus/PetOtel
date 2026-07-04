'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/site/config';
import { getWhatsAppUrl } from '@/lib/utils/whatsapp';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        aria-expanded={isOpen}
        className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-brand-navy rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-screen bg-brand-white shadow-xl z-50 border-t border-brand-border" style={{ maxWidth: '100vw' }}>
          <nav className="flex flex-col p-4 space-y-1" role="navigation" aria-label="Mobil menü">
            {siteConfig.navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-text hover:text-brand-navy hover:bg-brand-soft font-medium p-3 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={getWhatsAppUrl(siteConfig.whatsapp, "Merhaba, web siteniz üzerinden ulaşıyorum. Bilgi almak istiyorum.")}
              className="mt-2 bg-brand-navy text-white text-center py-3 rounded-lg font-bold"
              onClick={() => setIsOpen(false)}
            >
              WhatsApp ile Ulaşın
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
