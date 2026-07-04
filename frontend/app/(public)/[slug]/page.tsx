import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateServiceSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site/config';
import { getPublicService } from '@/lib/api/public';
import { MarkdownContent } from '@/components/ui/MarkdownContent';
import { getWhatsAppUrl } from '@/lib/utils/whatsapp';

// Fallback content for original SEO seeded services
const FALLBACK_SERVICES: Record<string, any> = {
  'ankara-kedi-oteli': {
    title: 'Ankara Kedi Oteli',
    seoTitle: 'Ankara Kedi Oteli | Güvenli Kedi Konaklama',
    shortDescription: 'Ankara’da kediniz için güvenli, temiz ve konforlu kedi oteli hizmeti. Ankara Pet House ile kediniz için özenli konaklama alanlarını inceleyin.',
    seoDescription: 'Ankara’da kediniz için güvenli, temiz ve konforlu kedi oteli hizmeti. Ankara Pet House ile kediniz için özenli konaklama alanlarını inceleyin.',
    content: `
Ankara Pet House’ta kediniz için güvenli, temiz ve kontrollü pet pansiyonu konaklama desteği sunulur. Konaklama alanları, evcil dostların ihtiyaçları ve uygunluk durumuna göre değerlendirilir.

## Bu hizmet kimler için uygun?
Kısa veya uzun süreli şehir dışına çıkması gereken, tatil veya iş gezisi planlayan kedi sahipleri için uygundur.

## Detaylı Bilgi
Kedi konaklamalarımız ana [Ankara Pet Pansiyonu](/ankara-pet-pansiyonu) hizmetimiz kapsamında değerlendirilmektedir. Lütfen detaylı bilgi ve uygunluk durumu için Pet Pansiyonu sayfamızı inceleyin veya bizimle iletişime geçin.
    `
  },
  'ankara-kopek-oteli': {
    title: 'Ankara Köpek Oteli',
    seoTitle: 'Ankara Köpek Oteli | Güvenli Köpek Konaklama',
    shortDescription: 'Ankara’da köpeğiniz için güvenli, temiz ve konforlu köpek oteli hizmeti. Ankara Pet House ile köpek dostu konaklama çözümlerini keşfedin.',
    seoDescription: 'Ankara’da köpeğiniz için güvenli, temiz ve konforlu köpek oteli hizmeti. Ankara Pet House ile köpek dostu konaklama çözümlerini keşfedin.',
    content: `
Ankara Pet House’ta küçük ve orta ırk köpekler için uygunluk durumuna göre pet pansiyonu konaklama desteği sunulur.

## Bu hizmet kimler için uygun?
Köpeğini güvenli ellere emanet edip tatile veya iş seyahatine çıkmak isteyen, küçük ve orta ırk köpek sahipleri için uygunluk durumuna göre hizmet verilmektedir.

## Detaylı Bilgi
Köpek konaklamalarımız ana [Ankara Pet Pansiyonu](/ankara-pet-pansiyonu) hizmetimiz kapsamında değerlendirilmektedir. Büyük ırklar için hizmet verememekteyiz. Lütfen detaylı bilgi ve güncel uygunluk durumu için Pet Pansiyonu sayfamızı inceleyin veya bizimle iletişime geçin.
    `
  },
  'ankara-pet-pansiyonu': {
    title: 'Ankara Pet Pansiyonu',
    seoTitle: 'Ankara Pet Pansiyonu | Kedi ve Köpek Konaklama',
    shortDescription: 'Ankara Pet House, kedi ve köpekler için güvenli ve konforlu pet pansiyonu hizmeti sunar. Evcil dostunuz için iletişime geçin.',
    seoDescription: 'Ankara Pet House, kedi ve köpekler için güvenli ve konforlu pet pansiyonu hizmeti sunar. Evcil dostunuz için iletişime geçin.',
    content: `
Ankara Pet Pansiyonu hizmetimizle, hem kedi hem de küçük/orta ırk köpek dostlarımız için kısa ve uzun süreli konaklama çözümleri sunuyoruz. Tesisimizde evcil dostların sakin ve stressiz bir ortamda kalması önceliğimizdir.

## Bu hizmet kimler için uygun?
Ev taşıma, ev ilaçlatma, tatil veya acil seyahatler durumunda evcil hayvanını güvenilir bir şekilde misafir edecek temiz bir yer arayanlar içindir. Küçük ve orta ırk köpekler ile kediler için uygundur. Büyük ırk köpek kabul edilmemektedir.

## Süreç Nasıl İlerler?
Dostunuzun genel durumu ve güncel aşıları kontrol edilir. Uygunluk durumuna göre rezervasyon oluşturulur. Konaklama süresince günlük bakım, beslenme ve (köpekler için) temel gezdirme ihtiyaçları karşılanır.

## Neden Bizi Tercih Etmelisiniz?
Şeffaf iletişim, temiz ortam ve güvenilir bakım. Misafirlerimizin durumları hakkında iletişimde kalarak aklınızın onlarda kalmamasını sağlıyoruz.
    `
  },
  'pet-taksi-ankara': {
    title: 'Ankara Pet Taksi',
    seoTitle: 'Ankara Pet Taksi | Evcil Hayvan Ulaşım Hizmeti',
    shortDescription: 'Ankara’da evcil dostunuz için güvenli pet taksi hizmeti. Ankara Pet House ile ulaşım süreci hakkında bilgi alın.',
    seoDescription: 'Ankara’da evcil dostunuz için güvenli pet taksi hizmeti. Ankara Pet House ile ulaşım süreci hakkında bilgi alın.',
    content: `
Evcil hayvanınızın güvenli ve konforlu bir şekilde veteriner, havalimanı veya ev transferlerini Ankara Pet Taksi hizmetimizle gerçekleştiriyoruz.

## Bu hizmet kimler için uygun?
Aracı olmayan, yoğun tempoda çalışan veya dostunun transferi sırasında profesyonel bir destek isteyen herkes için uygundur.

## Ankara Pet House'ta süreç nasıl ilerler?
Belirlenen saatte dostunuz özel taşıma araçlarımızla bulunduğu yerden alınır ve istediğiniz noktaya güvenle ulaştırılır.

## Neden bizi tercih etmelisiniz?
Araçlarımız her transfer sonrası dezenfekte edilir ve seyahat boyunca dostunuzun güvenliği en üst seviyede tutulur.
    `
  },
  'pet-kres-ankara': {
    title: 'Ankara Pet Kreş',
    seoTitle: 'Ankara Pet Kreş | Günlük Evcil Hayvan Bakımı',
    shortDescription: 'Ankara Pet House, gün içinde ilgi ve bakım ihtiyacı olan evcil dostlar için pet kreş hizmeti sunar.',
    seoDescription: 'Ankara Pet House, gün içinde ilgi ve bakım ihtiyacı olan evcil dostlar için pet kreş hizmeti sunar.',
    content: `
Siz işteyken dostunuz evde yalnız mı sıkılıyor? Pet kreş hizmetimiz sayesinde gün boyunca sosyalleşip enerjilerini atabilecekleri harika bir ortam sunuyoruz.

## Bu hizmet kimler için uygun?
Çalışan, gün içinde evcil dostuna yeterince vakit ayıramayan ve onun yalnızlık stresi yaşamasını istemeyen hayvan sahipleri için idealdir.

## Ankara Pet House'ta süreç nasıl ilerler?
Sabah kreşe bırakılan dostunuz, uzmanlar eşliğinde kendi enerjisine uygun diğer petlerle oyunlar oynar, beslenir ve dinlenir.

## Neden bizi tercih etmelisiniz?
Düzenli sosyalleşme sayesinde dostunuzun agresyon ve ayrılık anksiyetesi gibi sorunları en aza iner.
    `
  },
  'pet-bakim-gezdirme-ankara': {
    title: 'Pet Bakım ve Gezdirme',
    seoTitle: 'Ankara Pet Bakım ve Gezdirme | Ankara Pet House',
    shortDescription: 'Evcil hayvanınızın temel bakım ve gezdirme ihtiyaçları için Ankara Pet House uzmanlığından destek alın.',
    seoDescription: 'Evcil hayvanınızın temel bakım ve gezdirme ihtiyaçları için Ankara Pet House uzmanlığından destek alın.',
    content: `
Evcil dostunuzun günlük egzersiz ihtiyaçlarını karşılamak ve temel bakımını üstlenmek için profesyonel destek sağlıyoruz.

## Bu hizmet kimler için uygun?
Hastalık, yoğun iş temposu veya yorgunluk gibi sebeplerle dostunun günlük bakım ve egzersizine vakit ayıramayanlar içindir.

## Ankara Pet House'ta süreç nasıl ilerler?
Gezdirme işlemi, belirlenen saatlerde güvenli rotalarda uzman personelimiz tarafından gerçekleştirilir. Aynı zamanda tırnak kesimi ve tarama gibi temel bakım işlemleri de sağlanır.

## Neden bizi tercih etmelisiniz?
Güvenli ekipman kullanımı ve doğru yönlendirmeler ile dostunuzun enerjisini en verimli şekilde harcamasını sağlıyoruz.
    `
  },
  'pet-egitimi-ankara': {
    title: 'Pet Eğitimi',
    seoTitle: 'Ankara Pet Eğitimi | Köpek Eğitim Merkezi',
    shortDescription: 'Ankara Pet House ile köpeğiniz için temel itaat, sosyalleşme ve tuvalet eğitimi hizmetleri.',
    seoDescription: 'Ankara Pet House ile köpeğiniz için temel itaat, sosyalleşme ve tuvalet eğitimi hizmetleri.',
    content: `
Evcil dostunuzun ev kurallarına uyum sağlaması, dışarıda daha uyumlu olması ve istenmeyen davranışların önüne geçilmesi için profesyonel eğitim desteği veriyoruz.

## Bu hizmet kimler için uygun?
Yavru köpeğine temel alışkanlıkları kazandırmak veya yetişkin köpeğindeki davranış sorunlarını çözmek isteyen sahipler içindir.

## Ankara Pet House'ta süreç nasıl ilerler?
Öncelikle köpeğinizin karakteri analiz edilir. Ardından temel itaat, ileri itaat veya davranış düzeltme üzerine size ve köpeğinize özel bir program hazırlanır.

## Neden bizi tercih etmelisiniz?
Pozitif eğitim yöntemlerini kullanarak, ceza değil ödül odaklı bir anlayışla dostunuzun size güven duymasını sağlıyoruz.
    `
  }
};

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const dynamicService = await getPublicService(slug).catch(() => null);
  const fallback = FALLBACK_SERVICES[slug];

  if (!dynamicService && !fallback) {
    return constructMetadata({
      title: 'Sayfa Bulunamadı | Ankara Pet House',
      description: 'Aradığınız sayfa bulunamadı.'
    });
  }

  const title = dynamicService?.seoTitle || dynamicService?.title || fallback?.seoTitle || fallback?.title;
  const description = dynamicService?.seoDescription || dynamicService?.shortDescription || fallback?.seoDescription || fallback?.shortDescription;
  
  return constructMetadata({
    title,
    description,
    canonicalUrl: `/${slug}`,
    image: dynamicService?.coverImageUrl || undefined
  });
}

export default async function DynamicServicePage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const dynamicService = await getPublicService(slug).catch(() => null);
  const fallback = FALLBACK_SERVICES[slug];

  if (!dynamicService && !fallback) {
    console.log(`[slug] /${slug} not found. dynamicService=`, dynamicService, `fallback=`, !!fallback);
    notFound();
  } else {
    console.log(`[slug] /${slug} found! dynamicService=`, !!dynamicService, `fallback=`, !!fallback);
  }

  const title = dynamicService?.title || fallback?.title;
  const description = dynamicService?.shortDescription || fallback?.shortDescription;
  const content = dynamicService?.content; // dynamic content
  const fallbackContent = fallback?.content; // fallback html string

  const serviceSchema = generateServiceSchema({
    name: title,
    description: dynamicService?.seoDescription || fallback?.seoDescription || description,
    url: `/${slug}`
  });

  const breadcrumbs = [
    { name: 'Hizmetlerimiz', href: '/hizmetlerimiz' },
    { name: title, href: `/${slug}` }
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      
      <Section className="bg-brand-soft pt-12 pb-16 border-b border-brand-border/50">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl mb-6">
                {title}
              </h1>
              <p className="text-lg leading-8 text-brand-text/80 mb-8 max-w-xl">
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href={getWhatsAppUrl(siteConfig.whatsapp, `Merhaba, ${title} hakkında bilgi almak istiyorum.`)} variant="gold">
                  WhatsApp ile Bilgi Al
                </Button>
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-brand-navy hover:bg-brand-border focus:ring-brand-border border border-brand-border shadow-sm"
                >
                  Yol Tarifi Al
                </a>
              </div>
            </div>
            
            {dynamicService?.coverImageUrl ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/80 bg-brand-soft shadow-[0_10px_30px_rgba(6,31,69,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-brand-navy/5" />
                <img 
                  src={dynamicService.coverImageUrl} 
                  alt={title}
                  className="relative z-10 w-full h-full object-contain p-2"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/80 bg-brand-soft shadow-inner flex items-center justify-center text-brand-text/50">
                 <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
              </div>
            )}
          </div>
        </Container>
      </Section>
      
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0 rounded-[2rem] border border-brand-border/80 bg-white p-7 shadow-[0_10px_30px_rgba(6,31,69,0.04)] sm:p-10">
            <MarkdownContent content={content || fallbackContent || ''} />
          </article>
      
          <aside className="h-fit rounded-[2rem] border border-brand-border/80 bg-brand-soft/80 p-7 shadow-sm sticky top-28">
            <h3 className="text-xl font-bold text-brand-navy mb-4">Bu hizmet hakkında bilgi alın</h3>
            <p className="text-brand-text/75 mb-6 text-sm leading-6">
              Evcil dostunuz için uygunluk durumunu ve detayları öğrenmek için bizimle iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-col gap-3">
              <Button href={getWhatsAppUrl(siteConfig.whatsapp, `Merhaba, ${title} hakkında bilgi almak istiyorum.`)} variant="primary" className="w-full">
                WhatsApp ile İletişime Geç
              </Button>
              <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center px-4 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-brand-navy hover:bg-brand-border focus:ring-brand-border border border-brand-border text-sm shadow-sm"
                >
                  Yol Tarifi Al
                </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
