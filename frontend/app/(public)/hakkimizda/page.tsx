import { constructMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site/config';

export async function generateMetadata() {
  const dynamicPage = await getPublicPage('hakkimizda').catch(() => null);
  
  if (dynamicPage) {
    return constructMetadata({
      title: dynamicPage.seoTitle || dynamicPage.title,
      description: dynamicPage.seoDescription || 'Ankara Pet House hakkında bilgi alın. Ankara’da kedi ve köpekler için güvenli, temiz ve özenli pet otel hizmeti sunuyoruz.',
      canonicalUrl: '/hakkimizda'
    });
  }

  return constructMetadata({
    title: 'Hakkımızda | Ankara Pet House',
    description: 'Ankara Pet House\'un evcil dostlar için güvenli, temiz ve özenli bakım anlayışı hakkında bilgi alın.',
    canonicalUrl: '/hakkimizda'
  });
}

import { getPublicPage } from '@/lib/api/public';

export default async function AboutPage() {
  const dynamicPage = await getPublicPage('hakkimizda').catch(() => null);

  return (
    <>
      <PageHero title="Ankara Pet House Hakkında" description="Evcil dostlarınız için güvenli, konforlu ve sevgi dolu ikinci bir ev." />
      
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="relative rounded-[2rem] border border-brand-border/80 bg-white/80 p-8 sm:p-10 shadow-[0_12px_35px_rgba(6,31,69,0.04)] ring-1 ring-white/70 max-w-2xl order-2 lg:order-1">
          <div aria-hidden="true" className="absolute left-0 top-10 h-16 w-1.5 rounded-r-full bg-brand-gold" />
          <span className="mb-4 inline-flex rounded-full bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Ankara Pet House
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            Biz Kimiz?
          </h1>

          <div className="mt-6 space-y-5 text-lg leading-8 text-brand-text/75">
            {dynamicPage ? (
              <div className="prose prose-lg max-w-none text-brand-text/75 whitespace-pre-line">
                {dynamicPage.content}
              </div>
            ) : (
              <>
                <p>
                  Ankara Pet House, Ankara’da evcil dostlar için güvenli, temiz ve sakin bir konaklama deneyimi sunmak amacıyla hizmet verir. Kediler ve küçük/orta ırk köpekler için uygunluk durumuna göre pansiyon, bakım, kreş, gezdirme, pet taksi ve temel eğitim desteği sağlanır.
                </p>
                <p>
                  Bizim için her evcil hayvanın karakteri, alışkanlıkları ve ihtiyaçları farklıdır. Bu yüzden bakım sürecini tek tip bir hizmet gibi değil, evcil dostunuzun rutinine ve sizin paylaştığınız bilgilere göre şekillenen özenli bir süreç olarak ele alırız.
                </p>
                <p>
                  Amacımız, siz uzaktayken evcil dostunuzun kendini güvende hissedebileceği, hijyene önem verilen ve iletişimin açık tutulduğu bir ortam sunmaktır.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px] order-1 lg:order-2">
          <div aria-hidden="true" className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] border border-brand-gold/70" />
          <div aria-hidden="true" className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-brand-navy/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_18px_45px_rgba(6,31,69,0.18)] ring-1 ring-white/80 aspect-[4/3]">
            <img 
              src={dynamicPage?.coverImageUrl || "/about/hakkimizda.jpg"} 
              alt="Ankara Pet House - Kedi ve Köpek Misafirlerimiz" 
              className="h-full w-full object-cover" 
            />
          </div>
        </div>
      </section>

      <Section className="bg-brand-soft pb-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4 sm:text-4xl">Yaklaşımımız</h2>
            <p className="text-lg text-brand-text/80 leading-relaxed">
              Bizim için her evcil hayvan, kendi ailemizin bir ferdi kadar değerlidir. Bakım sürecindeki temel ilkelerimiz:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-[2rem] border border-brand-border/80 bg-gradient-to-br from-white via-brand-cream/60 to-white p-7 shadow-[0_10px_30px_rgba(6,31,69,0.07)] ring-1 ring-white/70 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-[0_18px_45px_rgba(6,31,69,0.13)] active:scale-[0.99] active:border-brand-gold/50 motion-reduce:transform-none motion-reduce:transition-none">
              <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-brand-gold/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold shadow-lg shadow-brand-navy/15 transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none text-2xl font-bold">
                ↗
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4 relative z-10 group-hover:text-brand-gold transition-colors">Şeffaf İletişim</h3>
              <p className="text-brand-text/75 relative z-10 leading-relaxed">Konaklama ve bakım sürecinde gerekli bilgilendirmeleri açık, anlaşılır ve ulaşılabilir şekilde paylaşmaya özen gösteriyoruz.</p>
            </div>
            <div className="group relative overflow-hidden rounded-[2rem] border border-brand-border/80 bg-gradient-to-br from-white via-brand-cream/60 to-white p-7 shadow-[0_10px_30px_rgba(6,31,69,0.07)] ring-1 ring-white/70 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-[0_18px_45px_rgba(6,31,69,0.13)] active:scale-[0.99] active:border-brand-gold/50 motion-reduce:transform-none motion-reduce:transition-none">
              <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-brand-gold/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold shadow-lg shadow-brand-navy/15 transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4 relative z-10 group-hover:text-brand-gold transition-colors">Hijyen ve Güvenlik</h3>
              <p className="text-brand-text/75 relative z-10 leading-relaxed">Evcil dostlarınızın konforu için temiz, düzenli ve kontrollü alanlar oluşturmaya önem veriyoruz.</p>
            </div>
            <div className="group relative overflow-hidden rounded-[2rem] border border-brand-border/80 bg-gradient-to-br from-white via-brand-cream/60 to-white p-7 shadow-[0_10px_30px_rgba(6,31,69,0.07)] ring-1 ring-white/70 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-[0_18px_45px_rgba(6,31,69,0.13)] active:scale-[0.99] active:border-brand-gold/50 motion-reduce:transform-none motion-reduce:transition-none">
              <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-brand-gold/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold shadow-lg shadow-brand-navy/15 transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none text-2xl font-bold">
                ★
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4 relative z-10 group-hover:text-brand-gold transition-colors">İhtiyaca Göre Bakım</h3>
              <p className="text-brand-text/75 relative z-10 leading-relaxed">Her evcil dostun karakteri, alışkanlıkları ve ihtiyaçları farklıdır. Bakım sürecini bu bilgilere göre şekillendiriyoruz.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white pb-20 pt-10">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-navy p-10 sm:p-16 text-center shadow-2xl shadow-brand-navy/20 border border-brand-navy/80">
            <div aria-hidden="true" className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6 leading-tight">Evcil dostunuz için güvenilir bir bakım süreci planlayalım</h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                Konaklama, kreş, bakım, gezdirme veya pet taksi hizmetleri hakkında bilgi almak için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href={`https://wa.me/${siteConfig.whatsapp.replace(/\s+/g, '')}`} variant="gold" className="w-full sm:w-auto px-8 py-4 text-base">WhatsApp ile İletişim</Button>
                <Button href="/hizmetlerimiz" variant="outline" className="w-full sm:w-auto px-8 py-4 text-base border-white/30 text-white hover:bg-white hover:text-brand-navy transition-colors">Hizmetleri İncele</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
