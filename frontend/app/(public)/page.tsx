import { constructMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { RoomCard } from '@/components/ui/RoomCard';
import { BlogCard } from '@/components/ui/BlogCard';
import { siteConfig } from '@/lib/site/config';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata = constructMetadata({
  title: 'Ankara Pet House | Ankara Pet Pansiyonu ve Pet Bakım Hizmetleri',
  description: 'Ankara Pet House, Ankara\'da evcil dostlar için pet pansiyonu, pet taksi, pet kreş, bakım, gezdirme ve temel eğitim hizmetleri sunar.',
  canonicalUrl: '/'
});

import { getPublicSiteSettings, getPublicServices, getPublicRooms, getPublicPage } from '@/lib/api/public';

export default async function HomePage() {
  const settings = await getPublicSiteSettings().catch(() => null);
  const anasayfa = await getPublicPage('anasayfa').catch(() => null);
  const dynamicServices = await getPublicServices().catch(() => []);
  const dynamicRooms = await getPublicRooms().catch(() => []);
  const localBusinessSchema = generateLocalBusinessSchema(settings);

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      
      {/* Hero Section */}
      <section className="bg-brand-soft pt-16 pb-20 md:pt-24 md:pb-24 overflow-hidden border-b border-brand-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-brand-navy hero-animate-up hero-delay-100">
                Ankara’da Kedi ve Köpekler İçin Güvenli Pet Otel
              </h1>
              <p className="text-lg md:text-xl text-brand-text/80 mb-8 leading-relaxed max-w-xl hero-animate-up hero-delay-200">
                Ankara Pet House, kedi ve köpekler için güvenli, temiz ve konforlu konaklama alanları sunan bir pet otel hizmetidir. Evcil dostunuzun ihtiyaçlarını dikkate alan sakin bir ortam, kolay iletişim ve özenli bakım anlayışıyla yanınızdayız. Rezervasyon sistemiyle uğraşmadan direkt iletişim kurabilirsiniz.
              </p>
              <div id="hero-primary-cta" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap hero-animate-up hero-delay-400">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full sm:w-auto
                    group inline-flex items-center justify-center gap-3 rounded-full
                    bg-brand-navy px-6 py-3.5 text-base font-bold text-white
                    shadow-[0_14px_30px_rgba(6,31,69,0.22)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-navy hover:shadow-[0_18px_40px_rgba(6,31,69,0.28)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
                    active:scale-[0.99]
                    motion-reduce:transform-none motion-reduce:transition-none
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      flex h-8 w-8 items-center justify-center rounded-full
                      bg-[#25D366] text-white
                      shadow-[0_0_0_4px_rgba(37,211,102,0.14)]
                    "
                  >
                    <svg
                      viewBox="0 0 32 32"
                      className="h-5 w-5"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.02 3.2C9.02 3.2 3.33 8.82 3.33 15.74c0 2.2.58 4.35 1.68 6.24L3.2 28.8l6.98-1.78a12.83 12.83 0 0 0 5.84 1.43c7 0 12.69-5.62 12.69-12.54S23.02 3.2 16.02 3.2Zm0 22.98c-1.83 0-3.62-.49-5.18-1.42l-.37-.22-4.14 1.05 1.1-4.02-.25-.39a10.18 10.18 0 0 1-1.57-5.44c0-5.68 4.67-10.3 10.41-10.3s10.41 4.62 10.41 10.3-4.67 10.44-10.41 10.44Zm5.72-7.7c-.31-.16-1.85-.9-2.14-1-.29-.11-.5-.16-.71.16-.21.31-.82 1-.99 1.2-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.49-1.52-.92-.81-1.54-1.82-1.72-2.13-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.69-.98-2.32-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.22 3.35 5.39 4.7.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.85-.75 2.11-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36Z" />
                    </svg>
                  </span>
                  WhatsApp ile Yazın
                </a>
                
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="
                    w-full sm:w-auto
                    inline-flex items-center justify-center gap-2 rounded-full
                    border border-brand-navy/15 bg-white px-6 py-3.5
                    text-base font-bold text-brand-navy
                    shadow-[0_10px_24px_rgba(6,31,69,0.08)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 hover:border-brand-navy hover:bg-brand-navy hover:text-white hover:shadow-[0_16px_34px_rgba(6,31,69,0.16)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
                    active:scale-[0.99]
                    motion-reduce:transform-none motion-reduce:transition-none
                  "
                >
                  Hemen Arayın
                </a>

                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full sm:w-auto
                    inline-flex items-center justify-center gap-2 rounded-full
                    border border-brand-gold/60 bg-brand-cream px-6 py-3.5
                    text-base font-bold text-brand-navy
                    shadow-[0_10px_24px_rgba(6,31,69,0.08)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 hover:border-brand-gold hover:bg-white hover:shadow-[0_16px_34px_rgba(6,31,69,0.14)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
                    active:scale-[0.99]
                    motion-reduce:transform-none motion-reduce:transition-none
                  "
                >
                  Yol Tarifi Al
                </a>
              </div>
            </div>
            <div className="relative w-full aspect-video md:aspect-[21/9] lg:h-[500px] bg-brand-soft rounded-2xl flex items-center justify-center border border-brand-border overflow-hidden hero-animate-right hero-delay-200">
              <img 
                src={anasayfa?.coverImageUrl || "/images/hero-puppy.jpg"} 
                alt="Ankara Pet House" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Highlights */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Güvenli Konaklama', desc: 'Kontrollü, sakin ve güvenilir pansiyon alanı' },
              { title: 'Temiz ve Düzenli', desc: 'Hijyene önem verilen konforlu ortam' },
              { title: 'Kedi ve Köpek Dostu', desc: 'Kediler ve küçük/orta ırk köpekler için uygun bakım' },
              { title: 'Kolay İletişim', desc: 'Konaklama sürecinde pratik bilgilendirme' }
            ].map((item, i) => (
              <div 
                key={i} 
                className="group relative overflow-hidden rounded-3xl border border-brand-border/80 bg-gradient-to-br from-white via-brand-soft to-white p-8 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-xl active:scale-[0.99] active:border-brand-gold/50 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-gold/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
                <div
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy text-2xl font-bold text-brand-gold shadow-lg shadow-brand-navy/15 ring-1 ring-white/70 transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transform-none"
                >
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="text-base leading-7 text-brand-text/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Preview */}
      <Section className="bg-brand-soft">
        <Container>
          <SectionHeading 
            title="Hizmetlerimiz" 
            subtitle="Ankara Pet House olarak evcil dostlarınız için sunduğumuz profesyonel hizmetler."
            centered
          />
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
                <RevealOnScroll direction="left" delay={100}><ServiceCard title="Ankara Kedi Oteli" description="Kediniz için stresten uzak, rahat ve güvenli konaklama alanları." href="/ankara-kedi-oteli" /></RevealOnScroll>
                <RevealOnScroll direction="up" delay={200}><ServiceCard title="Ankara Köpek Oteli" description="Köpeğiniz için enerjisini atabileceği geniş ve konforlu alanlar." href="/ankara-kopek-oteli" /></RevealOnScroll>
                <RevealOnScroll direction="right" delay={300}><ServiceCard title="Ankara Pet Pansiyonu" description="Kısa veya uzun süreli güvenli konaklama ve bakım hizmeti." href="/ankara-pet-pansiyonu" /></RevealOnScroll>
                <RevealOnScroll direction="left" delay={100}><ServiceCard title="Pet Taksi" description="Evcil dostunuzun veteriner veya transfer ulaşımını güvenle sağlıyoruz." href="/pet-taksi-ankara" /></RevealOnScroll>
                <RevealOnScroll direction="up" delay={200}><ServiceCard title="Pet Kreş" description="Gün içinde yalnız kalmasını istemediğiniz dostlarınız için oyun ve sosyalleşme." href="/pet-kres-ankara" /></RevealOnScroll>
                <RevealOnScroll direction="right" delay={300}><ServiceCard title="Pet Bakım ve Gezdirme" description="Günlük egzersiz ve temel bakım ihtiyaçları için profesyonel destek." href="/pet-bakim-gezdirme-ankara" /></RevealOnScroll>
              </>
            )}
          </div>
        </Container>
      </Section>

      {/* Rooms Preview */}
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading title="Konaklama Alanlarımız" subtitle="Evcil dostlarınız için temiz, sakin ve kontrollü konaklama alanları sunuyoruz. Uygunluk durumu, evcil dostunuzun ihtiyaçları ve bakım süreci öncesinde paylaştığınız bilgilere göre değerlendirilir." />
            <Link href="/odalar" className="text-brand-navy font-bold hover:text-brand-gold transition-colors inline-flex items-center">
              Tüm Odaları Gör <span className="ml-2">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dynamicRooms.length > 0 ? (
              dynamicRooms.slice(0, 2).map((room, idx) => (
                <RevealOnScroll key={room.id} direction="up" delay={(idx + 1) * 100}>
                  <RoomCard title={room.title} description={room.description} imageUrl={room.coverImageUrl || '/rooms/konaklama.jpg'} />
                </RevealOnScroll>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-8">
                <p className="text-brand-text/70 text-lg">Şu an gösterilecek konaklama alanı bulunmuyor.</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* About Preview */}
      <Section className="bg-brand-navy text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="absolute inset-0 bg-brand-gold rounded-2xl transform translate-x-4 translate-y-4"></div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl z-10 shadow-lg">
                <img 
                  src={anasayfa?.secondaryImageUrl || "/about/hakkimizda.jpg"}
                  alt="Ankara Pet House’ta kedi ve köpek dostlarımız"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Neden Bizi Tercih Etmelisiniz?</h2>
              <div className="text-lg text-white/80 mb-6 leading-relaxed space-y-4">
                <p>
                  Ankara Pet House olarak evcil dostlarınızın güvenli, temiz ve sakin bir ortamda konaklamasını önemsiyoruz. Kediler ve küçük/orta ırk köpekler için uygunluk durumuna göre pansiyon, bakım, kreş, gezdirme, pet taksi ve temel eğitim desteği sunuyoruz.
                </p>
                <p>
                  Her evcil dostun karakteri ve rutini farklıdır. Bu nedenle bakım sürecinde sizin paylaştığınız bilgileri dikkate alıyor, iletişimi açık tutmaya ve süreci mümkün olduğunca konforlu hale getirmeye özen gösteriyoruz.
                </p>
              </div>
              <Button href="/hakkimizda" variant="gold">Daha Fazla Bilgi</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Blog Preview */}
      <Section className="bg-brand-soft">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading title="Son Yazılarımız" subtitle="Evcil hayvan bakımı ve otel süreçleri hakkında faydalı bilgiler." />
            <Link href="/blog" className="text-brand-navy font-bold hover:text-brand-gold transition-colors inline-flex items-center">
              Tüm Yazılar <span className="ml-2">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealOnScroll direction="up" delay={100}><BlogCard title="Kedilerin Mırlamasının Sebepleri" summary="Kedilerin mırlaması çoğu zaman huzur ve güven duygusuyla ilişkilidir, ancak her zaman tek bir anlama gelmez." href="/blog/kedilerin-mirlamasinin-sebepleri" imageUrl="/blog/mirlama.jpg" /></RevealOnScroll>
            <RevealOnScroll direction="up" delay={200}><BlogCard title="Kedilerin Doğum Öncesi Hazırlığı, Doğum Zamanı ve Doğum Sonrası Nasıl Olmalıdır?" summary="Kedilerde doğum süreci öncesi hazırlık, sakin bir alan oluşturmak ve anneyi dikkatle gözlemlemekle başlar." href="/blog/kedilerin-dogum-oncesi-hazirligi-dogum-zamani-ve-dogum-sonrasi" imageUrl="/blog/dogum.jpg" /></RevealOnScroll>
            <RevealOnScroll direction="up" delay={300}><BlogCard title="Kediler Neden İdrarını ya da Dışkısını Kum Kabının Dışına Yapar?" summary="Kedilerin kum kabı dışına tuvalet yapması davranışsal, çevresel ya da sağlıkla ilgili birçok nedenden kaynaklanabilir." href="/blog/kediler-neden-kum-kabinin-disina-yapar" imageUrl="/blog/kum.jpg" /></RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-white border-t border-brand-border">
        <Container>
          <div className="bg-brand-navy rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Evcil Dostunuz İçin Yer Ayırtın</h2>
              <p className="text-lg md:text-xl text-white/80 mb-10">
                Evcil dostunuz için uygun konaklama seçeneğini konuşmak ister misiniz? WhatsApp, telefon veya yol tarifi seçenekleriyle bize kolayca ulaşabilirsiniz.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap justify-center">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full sm:w-auto
                    group inline-flex items-center justify-center gap-3 rounded-full
                    bg-brand-gold px-8 py-4 text-lg font-bold text-brand-navy
                    shadow-[0_14px_30px_rgba(6,31,69,0.22)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 hover:bg-white hover:text-brand-navy hover:shadow-[0_18px_40px_rgba(6,31,69,0.28)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy
                    active:scale-[0.99]
                    motion-reduce:transform-none motion-reduce:transition-none
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      flex h-8 w-8 items-center justify-center rounded-full
                      bg-[#25D366] text-white
                      shadow-[0_0_0_4px_rgba(37,211,102,0.14)]
                    "
                  >
                    <svg
                      viewBox="0 0 32 32"
                      className="h-5 w-5"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.02 3.2C9.02 3.2 3.33 8.82 3.33 15.74c0 2.2.58 4.35 1.68 6.24L3.2 28.8l6.98-1.78a12.83 12.83 0 0 0 5.84 1.43c7 0 12.69-5.62 12.69-12.54S23.02 3.2 16.02 3.2Zm0 22.98c-1.83 0-3.62-.49-5.18-1.42l-.37-.22-4.14 1.05 1.1-4.02-.25-.39a10.18 10.18 0 0 1-1.57-5.44c0-5.68 4.67-10.3 10.41-10.3s10.41 4.62 10.41 10.3-4.67 10.44-10.41 10.44Zm5.72-7.7c-.31-.16-1.85-.9-2.14-1-.29-.11-.5-.16-.71.16-.21.31-.82 1-.99 1.2-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.49-1.52-.92-.81-1.54-1.82-1.72-2.13-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.69-.98-2.32-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.22 3.35 5.39 4.7.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.85-.75 2.11-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36Z" />
                    </svg>
                  </span>
                  WhatsApp ile İletişim
                </a>
                
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="
                    w-full sm:w-auto
                    inline-flex items-center justify-center gap-2 rounded-full
                    border border-white bg-transparent px-8 py-4
                    text-lg font-bold text-white
                    shadow-[0_10px_24px_rgba(6,31,69,0.08)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 hover:bg-white hover:text-brand-navy hover:shadow-[0_16px_34px_rgba(6,31,69,0.16)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy
                    active:scale-[0.99]
                    motion-reduce:transform-none motion-reduce:transition-none
                  "
                >
                  Bizi Arayın
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
