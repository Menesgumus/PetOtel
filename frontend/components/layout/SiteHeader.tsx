import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/site/config';
import { MobileMenu } from './MobileMenu';
import { BrandLogo } from './BrandLogo';
import { Button } from '../ui/Button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-white border-b border-brand-border">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between relative">
        <Link href="/" className="flex items-center min-w-0 pr-4">
          <BrandLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {siteConfig.navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-text hover:text-brand-gold font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button href={`https://wa.me/${siteConfig.whatsapp.replace(/\s+/g, '')}`} variant="primary">
            WhatsApp
          </Button>
        </div>

        {/* Mobile Menu (Client Component) */}
        <MobileMenu />
      </div>
    </header>
  );
}
