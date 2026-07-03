import Link from 'next/link';
import { siteConfig } from '@/lib/site/config';
import { Container } from '../ui/Container';
import { getPublicSiteSettings } from '@/lib/api/public';
import { BrandLogo } from './BrandLogo';

export async function SiteFooter() {
  const settings = await getPublicSiteSettings().catch(() => null);

  const businessName = settings?.businessName || siteConfig.businessName;
  const phone = settings?.phone || siteConfig.phone;
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const email = settings?.email || siteConfig.email;
  const address = settings?.address || siteConfig.address;
  const googleMapsUrl = settings?.googleMapsUrl || siteConfig.googleMapsUrl;

  return (
    <footer className="bg-brand-navy text-white pt-12 pb-8 md:pb-12 border-t-4 border-brand-gold">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="mb-6 inline-block">
              <BrandLogo variant="footer" />
            </div>
            <p className="text-brand-border text-sm mb-4">
              Ankara'da kedi ve köpekleriniz için güvenilir, konforlu ve profesyonel konaklama ile bakım hizmetleri.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-brand-gold mb-4">Hızlı Menü</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-brand-border hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-brand-gold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              {siteConfig.services
                .filter((s) => s.href !== '/ankara-kedi-oteli' && s.href !== '/ankara-kopek-oteli')
                .map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-brand-border hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-brand-gold mb-4">İletişim</h3>
            <ul className="space-y-2 text-brand-border">
              <li>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  📞 {phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsapp.replace(/\s+/g, '')}`} className="hover:text-white">
                  📱 WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-white">
                  ✉️ {email}
                </a>
              </li>
              <li className="pt-2">
                <p>📍 {address}</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=39.9768675,32.690292" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-white mt-1 inline-block text-sm">
                  Google Maps'te Gör &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-text/30 pt-8 text-center text-sm text-brand-border">
          © {new Date().getFullYear()} {businessName}. Tüm hakları saklıdır.
        </div>
      </Container>
    </footer>
  );
}
