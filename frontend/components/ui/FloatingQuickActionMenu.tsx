'use client';

import { useEffect, useRef, useState, useCallback, startTransition } from 'react';
import { usePathname } from 'next/navigation';
import { getWhatsAppUrl } from '@/lib/utils/whatsapp';

interface Props {
  whatsapp: string;
  phone: string;
  mapsUrl: string;
}

export default function FloatingQuickActionMenu({ whatsapp, phone, mapsUrl }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isHomePage = pathname === '/';

  // ── Visibility logic ─────────────────────────────────────────────────────────
  useEffect(() => {
    // Non-home pages: always visible
    if (!isHomePage) {
      startTransition(() => setIsVisible(true));
      return;
    }

    // Homepage: use IntersectionObserver on #hero-primary-cta
    // Hidden when the hero CTA is visible; shown when it leaves the viewport.
    const target = document.getElementById('hero-primary-cta');

    if (target) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // When hero CTA exits viewport → show menu; when it enters → hide menu
          startTransition(() => setIsVisible(!entry.isIntersecting));
        },
        { root: null, threshold: 0, rootMargin: '0px 0px -80px 0px' }
      );
      observer.observe(target);

      // Set initial state based on current position
      const rect = target.getBoundingClientRect();
      const ctaIsVisible = rect.top < window.innerHeight && rect.bottom > 0;
      startTransition(() => setIsVisible(!ctaIsVisible));

      return () => observer.disconnect();
    }

    // Fallback: scroll threshold when marker is absent
    const onScroll = () => startTransition(() => setIsVisible(window.scrollY > 450));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage, pathname]); // re-run when route changes

  // ── Close on Escape ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') startTransition(() => setIsOpen(false));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // ── Close on outside click ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        startTransition(() => setIsOpen(false));
      }
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [isOpen]);

  // ── Close on route change ─────────────────────────────────────────────────────
  useEffect(() => {
    startTransition(() => setIsOpen(false));
  }, [pathname]);

  const handleActionClick = useCallback(() => {
    startTransition(() => setIsOpen(false));
  }, []);

  const waUrl = getWhatsAppUrl(whatsapp, 'Merhaba, web siteniz üzerinden ulaşıyorum. Bilgi almak istiyorum.');
  const cleanPhone = phone.replace(/\D/g, '');

  const FALLBACK_MAPS = 'https://www.google.com/maps/dir/?api=1&destination=39.9768675,32.690292';
  const mapsHref = mapsUrl || FALLBACK_MAPS;

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div
      ref={menuRef}
      className="fixed z-50 flex flex-col items-end gap-3 right-4"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transform: isVisible ? 'translateY(0)' : 'translateY(1rem)',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
      }}
      aria-live="polite"
    >
      {/* ── Action buttons (expanded state) ───────────────────────────────────── */}
      <div className="flex flex-col items-end gap-3" aria-hidden={!isOpen}>
        {/* WhatsApp */}
        <ActionItem
          href={waUrl}
          label="WhatsApp ile yaz"
          isOpen={isOpen}
          delay={120}
          bg="bg-[#25D366]"
          onClick={handleActionClick}
          external
        >
          <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor">
            <path d="M16.02 3.2C9.02 3.2 3.33 8.82 3.33 15.74c0 2.2.58 4.35 1.68 6.24L3.2 28.8l6.98-1.78a12.83 12.83 0 0 0 5.84 1.43c7 0 12.69-5.62 12.69-12.54S23.02 3.2 16.02 3.2Zm0 22.98c-1.83 0-3.62-.49-5.18-1.42l-.37-.22-4.14 1.05 1.1-4.02-.25-.39a10.18 10.18 0 0 1-1.57-5.44c0-5.68 4.67-10.3 10.41-10.3s10.41 4.62 10.41 10.3-4.67 10.44-10.41 10.44Zm5.72-7.7c-.31-.16-1.85-.9-2.14-1-.29-.11-.5-.16-.71.16-.21.31-.82 1-.99 1.2-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.49-1.52-.92-.81-1.54-1.82-1.72-2.13-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.69-.98-2.32-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.22 3.35 5.39 4.7.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.85-.75 2.11-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36Z" />
          </svg>
        </ActionItem>

        {/* Call */}
        <ActionItem
          href={`tel:${cleanPhone}`}
          label="Hemen ara"
          isOpen={isOpen}
          delay={60}
          bg="bg-brand-navy"
          onClick={handleActionClick}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.77 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.22a16 16 0 0 0 6.29 6.29l1.09-1.09a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
        </ActionItem>

        {/* Directions */}
        <ActionItem
          href={mapsHref}
          label="Yol tarifi al"
          isOpen={isOpen}
          delay={0}
          bg="bg-brand-gold"
          textColor="text-brand-navy"
          onClick={handleActionClick}
          external
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </ActionItem>
      </div>

      {/* ── Main toggle button ─────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Menüyü kapat' : 'Hızlı iletişim menüsünü aç'}
        className={[
          'flex h-14 w-14 items-center justify-center rounded-full text-white',
          'shadow-[0_8px_24px_rgba(6,31,69,0.28)]',
          'transition-all duration-300 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2',
          'active:scale-95 motion-reduce:transform-none',
          isOpen ? 'rotate-90 scale-105 bg-brand-navy' : 'bg-brand-navy hover:bg-brand-gold hover:text-brand-navy',
        ].join(' ')}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ── Sub-component: individual action button ───────────────────────────────────
interface ActionItemProps {
  href: string;
  label: string;
  isOpen: boolean;
  delay: number;
  bg: string;
  textColor?: string;
  onClick: () => void;
  external?: boolean;
  children: React.ReactNode;
}

function ActionItem({ href, label, isOpen, delay, bg, textColor = 'text-white', onClick, external, children }: ActionItemProps) {
  return (
    <a
      href={href}
      aria-label={label}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={[
        'flex h-12 w-12 items-center justify-center rounded-full shadow-lg',
        bg,
        textColor,
        'transition-all duration-200 ease-out',
        'hover:scale-110 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-1',
        'motion-reduce:transform-none motion-reduce:transition-none',
        isOpen
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-4 scale-75 opacity-0',
      ].join(' ')}
      style={{ transitionDelay: isOpen ? `${delay}ms` : '0ms' }}
    >
      {children}
    </a>
  );
}
