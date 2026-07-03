import { constructMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { RoomCard } from '@/components/ui/RoomCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { siteConfig } from '@/lib/site/config';
import { Button } from '@/components/ui/Button';
import { getPublicRooms, getPublicPage } from '@/lib/api/public';

export async function generateMetadata() {
  const dynamicPage = await getPublicPage('odalar').catch(() => null);
  
  if (dynamicPage) {
    return constructMetadata({
      title: dynamicPage.seoTitle || dynamicPage.title || 'Konaklama Alanlarımız',
      description: dynamicPage.seoDescription || 'Ankara Pet House konaklama alanlarını inceleyin. Gerçek oda fotoğraflarıyla güvenli ve temiz alanlar.',
      canonicalUrl: '/odalar'
    });
  }

  return constructMetadata({
    title: 'Konaklama Alanlarımız | Ankara Pet House',
    description: 'Ankara Pet House konaklama alanlarımızdan görüncümler ve evcil dostlar için temiz, sakin ve kontrollü pansiyon ortamı hakkında bilgi alın.',
    canonicalUrl: '/odalar'
  });
}

export default async function RoomsPage() {
  const dynamicRooms = await getPublicRooms();

  return (
    <>
      <PageHero 
        title="Konaklama Alanlarımız" 
        description="Evcil dostlarınız için temiz, sakin ve kontrollü konaklama alanları sunuyoruz." 
      />
      
      <section className="relative overflow-hidden bg-brand-cream/50 py-16 sm:py-20 min-h-screen">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl"
        />
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Alanlarımızdan Görünümler</h2>
            <p className="text-lg text-brand-text/80 font-medium mb-4">Tesisimize ait gerçek fotoğraflar ve konaklama alanlarımızdan örnekler.</p>
            <p className="text-brand-text/70 leading-relaxed">Ankara Pet House’ta konaklama süreci, evcil dostunuzun ihtiyaçları ve uygunluk durumu dikkate alınarak planlanır. Kediler ve küçük/orta ırk köpekler için güvenli, düzenli ve huzurlu bir ortam sağlamaya özen gösteriyoruz.</p>
          </div>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8 relative z-10">
            {dynamicRooms.length > 0 ? (
              dynamicRooms.map((room, idx) => (
                <RevealOnScroll key={room.id} direction="up" delay={(idx % 2) * 100}>
                  <RoomCard title={room.title} description={room.description} imageUrl={room.coverImageUrl || '/rooms/konaklama.jpg'} />
                </RevealOnScroll>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-12">
                <p className="text-brand-text/70 text-lg">Şu an gösterilecek konaklama alanı bulunmuyor.</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <Section className="bg-white py-16">
        <Container>
          <div className="bg-brand-navy rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl mx-auto max-w-5xl">
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-gold">Evcil dostunuz için uygun konaklama alanını birlikte değerlendirelim</h2>
              <p className="text-base md:text-lg text-white/80 mb-8">
                Konaklama öncesinde evcil dostunuzun ihtiyaçlarını, alışkanlıklarını ve uygunluk durumunu birlikte değerlendirebiliriz.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href={`https://wa.me/${siteConfig.whatsapp.replace(/\s+/g, '')}`} variant="gold" className="px-6 py-3">WhatsApp ile Bilgi Al</Button>
                <Button href="/hizmetlerimiz" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-navy px-6 py-3">Hizmetleri İncele</Button>
              </div>
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-brand-gold/20 blur-3xl" />
          </div>
        </Container>
      </Section>
    </>
  );
}
