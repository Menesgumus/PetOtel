import { constructMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { ContactActionCard } from '@/components/ui/ContactActionCard';
import { siteConfig } from '@/lib/site/config';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/utils/whatsapp';

export async function generateMetadata() {
  const dynamicPage = await getPublicPage('iletisim').catch(() => null);
  
  if (dynamicPage) {
    return constructMetadata({
      title: dynamicPage.seoTitle || dynamicPage.title || 'İletişim',
      description: dynamicPage.seoDescription || 'Ankara Pet House ile WhatsApp, telefon veya yol tarifi üzerinden iletişime geçin.',
      canonicalUrl: '/iletisim'
    });
  }

  return constructMetadata({
    title: 'İletişim | Ankara Pet House',
    description: 'Ankara Pet House ile iletişime geçin, konum bilgilerini görüntüleyin ve pet pansiyonu hizmetleri hakkında detaylı bilgi alın.',
    canonicalUrl: '/iletisim'
  });
}

import { getPublicSiteSettings, getPublicPage } from '@/lib/api/public';

export default async function ContactPage() {
  const settings = await getPublicSiteSettings().catch(() => null);

  const phone = settings?.phone || siteConfig.phone;
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const email = settings?.email || siteConfig.email;
  const address = settings?.address || siteConfig.address;
  const googleMapsUrl = settings?.googleMapsUrl || siteConfig.googleMapsUrl;

  const localBusinessSchema = generateLocalBusinessSchema(settings);

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <PageHero title="İletişim" description="Bize kolayca ulaşın. Rezervasyon ve bilgi için telefon veya WhatsApp üzerinden iletişim kurabilirsiniz." />
      
      <Section className="bg-brand-soft">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RevealOnScroll direction="up" delay={100}>
              <ContactActionCard 
                title="WhatsApp" 
                description={whatsapp} 
                actionText="Mesaj Gönder" 
                href={getWhatsAppUrl(whatsapp, "Merhaba, web siteniz üzerinden ulaşıyorum. Bilgi almak istiyorum.")}
                primary
                icon={
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/></svg>
                }
              />
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={200}>
              <ContactActionCard 
                title="Telefon" 
                description={phone} 
                actionText="Hemen Ara" 
                href={`tel:${phone.replace(/\s+/g, '')}`}
                icon={
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                }
              />
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={300}>
              <ContactActionCard 
                title="E-posta" 
                description={email} 
                actionText="E-posta Gönder" 
                href={`mailto:${email}`}
                icon={
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                }
              />
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={400}>
              <ContactActionCard 
                title="Yol Tarifi" 
                description={address} 
                actionText="Haritada Aç" 
                href="https://www.google.com/maps/dir/?api=1&destination=39.9768675,32.690292"
                icon={
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                }
              />
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="bg-brand-soft p-4 md:p-8 rounded-2xl border border-brand-border text-center">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">Adresimiz</h2>
            <p className="text-lg text-brand-text/80 mb-8">{address}</p>
            <div className="w-full max-w-full rounded-2xl overflow-hidden border border-brand-border bg-white shadow-sm mb-6">
              <iframe
                title="Ankara Pet House Otel Konumu"
                src="https://www.google.com/maps?q=39.9768675,32.690292&hl=tr&z=17&output=embed"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full max-w-full"
              />
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=39.9768675,32.690292"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-brand-navy text-white hover:bg-brand-navy/90 focus:ring-brand-navy"
            >
              Yol Tarifi Al
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
