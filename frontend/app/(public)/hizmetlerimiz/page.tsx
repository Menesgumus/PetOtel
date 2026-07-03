import { constructMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export async function generateMetadata() {
  const dynamicPage = await getPublicPage('hizmetlerimiz').catch(() => null);
  
  if (dynamicPage) {
    return constructMetadata({
      title: dynamicPage.seoTitle || dynamicPage.title || 'Hizmetlerimiz | Ankara Pet Otel Hizmetleri',
      description: dynamicPage.seoDescription || 'Ankara Pet House kedi oteli, köpek oteli, pet pansiyonu, pet taksi, pet kreş, bakım, gezdirme ve eğitim hizmetleri sunar.',
      canonicalUrl: '/hizmetlerimiz'
    });
  }

  return constructMetadata({
    title: 'Ankara Pet Hizmetleri | Ankara Pet House',
    description: 'Ankara Pet House pet pansiyonu, pet taksi, pet kreş, bakım, gezdirme ve temel eğitim hizmetleriyle evcil dostlarınıza destek olur.',
    canonicalUrl: '/hizmetlerimiz'
  });
}

import { getPublicServices, getPublicPage } from '@/lib/api/public';

export default async function ServicesPage() {
  const dynamicServices = await getPublicServices();

  return (
    <>
      <PageHero title="Ankara Pet House Hizmetleri" description="Dostlarınızın tüm ihtiyaçları için tek noktada profesyonel çözümler." />
      
      <Section className="bg-brand-soft min-h-screen">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {dynamicServices.length > 0 ? (
              dynamicServices
                .filter(svc => !['ankara-kedi-oteli', 'ankara-kopek-oteli'].includes(svc.slug))
                .map((svc, idx) => (
                <RevealOnScroll key={svc.id} direction="up" delay={(idx % 3) * 100}>
                  <ServiceCard title={svc.title} description={svc.shortDescription || ''} href={`/${svc.slug}`} imageUrl={svc.coverImageUrl} />
                </RevealOnScroll>
              ))
            ) : (
              <>
                <RevealOnScroll direction="up" delay={100}><ServiceCard title="Ankara Kedi Oteli" description="Kediniz için stresten uzak, rahat ve güvenli konaklama alanları." href="/ankara-kedi-oteli" /></RevealOnScroll>
                <RevealOnScroll direction="up" delay={200}><ServiceCard title="Ankara Köpek Oteli" description="Köpeğiniz için enerjisini atabileceği geniş ve konforlu alanlar." href="/ankara-kopek-oteli" /></RevealOnScroll>
                <RevealOnScroll direction="up" delay={300}><ServiceCard title="Ankara Pet Pansiyonu" description="Kısa veya uzun süreli güvenli konaklama ve bakım hizmeti." href="/ankara-pet-pansiyonu" /></RevealOnScroll>
                <RevealOnScroll direction="up" delay={100}><ServiceCard title="Pet Taksi" description="Evcil dostunuzun veteriner veya transfer ulaşımını güvenle sağlıyoruz." href="/pet-taksi-ankara" /></RevealOnScroll>
                <RevealOnScroll direction="up" delay={200}><ServiceCard title="Pet Kreş" description="Gün içinde yalnız kalmasını istemediğiniz dostlarınız için oyun ve sosyalleşme." href="/pet-kres-ankara" /></RevealOnScroll>
                <RevealOnScroll direction="up" delay={300}><ServiceCard title="Pet Bakım ve Gezdirme" description="Günlük egzersiz ve temel bakım ihtiyaçları için profesyonel destek." href="/pet-bakim-gezdirme-ankara" /></RevealOnScroll>
                <RevealOnScroll direction="up" delay={100}><ServiceCard title="Pet Eğitimi" description="Evcil dostunuz için eğitim süreci ve kontrollü davranış desteği." href="/pet-egitimi-ankara" /></RevealOnScroll>
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
