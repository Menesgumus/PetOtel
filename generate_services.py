import os

base_dir = r"c:\Users\muham\Desktop\ankarapethouse\frontend\app"

services = {
    "ankara-kedi-oteli": {
        "title": "Ankara Kedi Oteli",
        "seoTitle": "Ankara Kedi Oteli | Güvenli Kedi Konaklama | Ankara Pet House",
        "description": "Ankara’da kediniz için güvenli, temiz ve konforlu kedi oteli hizmeti. Ankara Pet House ile kediniz için özenli konaklama alanlarını inceleyin.",
        "content_intro": "Kediler yapıları gereği hassas ve stresli olmaya meyillidirler. Ankara Kedi Oteli olarak, kedinizin huzurla vakit geçirebileceği, köpeklerden bağımsız ve tamamen onlara özel alanlar sunuyoruz.",
        "kimler": "Kısa veya uzun süreli şehir dışına çıkması gereken, tatil veya iş gezisi planlayan kedi sahipleri için uygundur.",
        "surec": "Kedinizin aşı takvimi kontrol edildikten sonra ona özel hazırlanan temiz odasına alınır. Gün içerisinde tırmanma alanlarında vakit geçirmesi sağlanır.",
        "neden": "Kafes sistemi kullanmıyoruz. Kedinize özgürce hareket edebileceği, hijyenik ve stresten uzak bir yaşam alanı sunuyoruz."
    },
    "ankara-kopek-oteli": {
        "title": "Ankara Köpek Oteli",
        "seoTitle": "Ankara Köpek Oteli | Güvenli Köpek Konaklama | Ankara Pet House",
        "description": "Ankara’da köpeğiniz için güvenli, temiz ve konforlu köpek oteli hizmeti. Ankara Pet House ile köpek dostu konaklama çözümlerini keşfedin.",
        "content_intro": "Köpekler enerjik, sosyal ve ilgiye muhtaçtır. Ankara Köpek Oteli hizmetimizle, köpeğinizin enerjisini doğru atabileceği, güvenle sosyalleşebileceği alanlar yaratıyoruz.",
        "kimler": "Köpeğini güvenli ellere emanet edip tatile veya iş seyahatine çıkmak isteyen köpek sahipleri için mükemmel bir çözümdür.",
        "surec": "Aşıları tam olan köpeğiniz, boyutlarına ve ırkına uygun bölüme yerleştirilir. Günlük oyun ve egzersiz rutinleri uzman ekibimiz eşliğinde gerçekleştirilir.",
        "neden": "Köpeğinizin sıkılmaması ve strese girmemesi için bolca oyun, sevgi ve profesyonel gözetim sağlıyoruz."
    },
    "ankara-pet-pansiyonu": {
        "title": "Ankara Pet Pansiyonu",
        "seoTitle": "Ankara Pet Pansiyonu | Kedi ve Köpek Konaklama | Ankara Pet House",
        "description": "Ankara Pet House, kedi ve köpekler için güvenli ve konforlu pet pansiyonu hizmeti sunar. Evcil dostunuz için iletişime geçin.",
        "content_intro": "Pet pansiyonu hizmetimizle, hem kedi hem de köpek dostlarımız için kısa süreli bakım ve konaklama çözümleri sunuyoruz.",
        "kimler": "Ev taşıma, ev ilaçlatma veya kısa süreli acil seyahatler durumunda evcil hayvanını geçici süreliğine bırakacak güvenilir bir yer arayanlar içindir.",
        "surec": "Dostunuzun beslenme ve günlük bakım rutinini sizden alarak, aynı düzeni pansiyon sürecimizde de harfiyen uyguluyoruz.",
        "neden": "Esnek konaklama süreleri ve her an iletişimde kalabilme garantisiyle güveninizi sağlıyoruz."
    },
    "pet-taksi-ankara": {
        "title": "Ankara Pet Taksi",
        "seoTitle": "Ankara Pet Taksi | Evcil Hayvan Ulaşım Hizmeti",
        "description": "Ankara’da evcil dostunuz için güvenli pet taksi hizmeti. Ankara Pet House ile ulaşım süreci hakkında bilgi alın.",
        "content_intro": "Evcil hayvanınızın güvenli ve konforlu bir şekilde veteriner, havalimanı veya ev transferlerini Ankara Pet Taksi hizmetimizle gerçekleştiriyoruz.",
        "kimler": "Aracı olmayan, yoğun tempoda çalışan veya dostunun transferi sırasında profesyonel bir destek isteyen herkes için uygundur.",
        "surec": "Belirlenen saatte dostunuz özel taşıma araçlarımızla bulunduğu yerden alınır ve istediğiniz noktaya güvenle ulaştırılır.",
        "neden": "Araçlarımız her transfer sonrası dezenfekte edilir ve seyahat boyunca dostunuzun güvenliği en üst seviyede tutulur."
    },
    "pet-kres-ankara": {
        "title": "Ankara Pet Kreş",
        "seoTitle": "Ankara Pet Kreş | Günlük Evcil Hayvan Bakımı",
        "description": "Ankara Pet House, gün içinde ilgi ve bakım ihtiyacı olan evcil dostlar için pet kreş hizmeti sunar.",
        "content_intro": "Siz işteyken dostunuz evde yalnız mı sıkılıyor? Pet kreş hizmetimiz sayesinde gün boyunca sosyalleşip enerjilerini atabilecekleri harika bir ortam sunuyoruz.",
        "kimler": "Çalışan, gün içinde evcil dostuna yeterince vakit ayıramayan ve onun yalnızlık stresi yaşamasını istemeyen hayvan sahipleri için idealdir.",
        "surec": "Sabah kreşe bırakılan dostunuz, uzmanlar eşliğinde kendi enerjisine uygun diğer petlerle oyunlar oynar, beslenir ve dinlenir.",
        "neden": "Düzenli sosyalleşme sayesinde dostunuzun agresyon ve ayrılık anksiyetesi gibi sorunları en aza iner."
    },
    "pet-bakim-gezdirme-ankara": {
        "title": "Ankara Pet Bakım ve Gezdirme",
        "seoTitle": "Ankara Pet Bakım ve Gezdirme Hizmeti",
        "description": "Ankara’da evcil dostunuz için bakım ve gezdirme desteği. Ankara Pet House hizmetlerini inceleyin.",
        "content_intro": "Günlük egzersiz, köpekler için fiziksel ve zihinsel sağlık açısından kritik öneme sahiptir. Düzenli pet bakım ve gezdirme hizmetimizle dostunuzun enerjisini dengelemesine yardımcı oluyoruz.",
        "kimler": "Sağlık sorunları yaşayan, yoğun çalışan veya dostunun enerjisini atmakta zorlanan köpek sahipleri için uygundur.",
        "surec": "Dostunuzun yaşına, ırkına ve enerji seviyesine uygun rotalarda, güvenli tasmalar eşliğinde yürüyüşler düzenlenir.",
        "neden": "Profesyonel gezdiricilerimiz sayesinde dostunuz yolda karşılaşabileceği risklerden uzak, güvenli bir yürüyüş deneyimi yaşar."
    },
    "pet-egitimi-ankara": {
        "title": "Ankara Pet Eğitimi",
        "seoTitle": "Ankara Pet Eğitimi | Evcil Hayvan Eğitim Desteği",
        "description": "Ankara Pet House ile evcil dostunuz için eğitim süreci hakkında bilgi alın. Güvenli ve kontrollü destek için iletişime geçin.",
        "content_intro": "Temel itaat, tuvalet eğitimi veya davranış bozukluklarının giderilmesi için profesyonel pet eğitimi hizmeti sağlıyoruz.",
        "kimler": "Yavru köpek sahipleri veya davranış problemleri (aşırı havlama, kemirme, çekiştirme) yaşayan evcil hayvan sahipleri için.",
        "surec": "İlk tanışmada dostunuzun karakter analizi yapılır. Sizin hedefleriniz doğrultusunda tamamen pozitif pekiştirme yöntemleriyle eğitim takvimi oluşturulur.",
        "neden": "Şiddetten uzak, tamamen pozitif pekiştirme ve ödül yöntemleriyle kalıcı, mutlu edici sonuçlar alıyoruz."
    }
}

template = """import {{ constructMetadata }} from '@/lib/seo/metadata';
import {{ generateServiceSchema, generateBreadcrumbSchema }} from '@/lib/seo/schema';
import {{ JsonLd }} from '@/components/seo/JsonLd';
import {{ Container }} from '@/components/ui/Container';
import {{ Section }} from '@/components/ui/Section';
import {{ PageHero }} from '@/components/ui/PageHero';
import {{ Breadcrumbs }} from '@/components/seo/Breadcrumbs';
import {{ Button }} from '@/components/ui/Button';
import {{ siteConfig }} from '@/lib/site/config';

export const metadata = constructMetadata({{
  title: '{seoTitle}',
  description: '{description}',
  canonicalUrl: '/{slug}'
}});

export default function ServicePage() {{
  const serviceSchema = generateServiceSchema({{
    name: '{title}',
    description: '{description}',
    url: '/{slug}'
  }});

  const breadcrumbs = [
    {{ name: 'Hizmetlerimiz', href: '/hizmetlerimiz' }},
    {{ name: '{title}', href: '/{slug}' }}
  ];

  return (
    <>
      <JsonLd data={{serviceSchema}} />
      <PageHero title="{title}" description="{description}" />
      
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={{breadcrumbs}} />
            
            <div className="prose prose-lg max-w-none text-brand-text/80 mb-12">
              <p className="text-xl font-medium text-brand-navy mb-8">{content_intro}</p>
              
              <h2 className="text-2xl font-bold text-brand-navy mb-4 mt-8">Bu hizmet kimler için uygun?</h2>
              <p>{kimler}</p>
              
              <h2 className="text-2xl font-bold text-brand-navy mb-4 mt-8">Ankara Pet House'ta süreç nasıl ilerler?</h2>
              <p>{surec}</p>
              
              <h2 className="text-2xl font-bold text-brand-navy mb-4 mt-8">Neden bizi tercih etmelisiniz?</h2>
              <p>{neden}</p>
            </div>
            
            <div className="bg-brand-soft p-8 md:p-12 rounded-3xl border border-brand-border text-center mt-12">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">Evcil Dostunuz İçin Destek Alın</h3>
              <p className="text-lg text-brand-text/80 mb-8 max-w-2xl mx-auto">
                {title} hizmetimiz hakkında detaylı bilgi, müsaitlik durumu ve fiyatlandırma için bizimle WhatsApp veya telefon üzerinden iletişime geçebilirsiniz.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href={{`https://wa.me/${{siteConfig.whatsapp.replace(/\s+/g, '')}}`}} variant="primary">
                  WhatsApp'tan Yazın
                </Button>
                <Button href={{`tel:${{siteConfig.phone.replace(/\s+/g, '')}}`}} variant="outline">
                  Bizi Arayın
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}}
"""

for slug, data in services.items():
    folder_path = os.path.join(base_dir, slug)
    os.makedirs(folder_path, exist_ok=True)
    page_path = os.path.join(folder_path, "page.tsx")
    
    content = template.format(
        slug=slug,
        title=data["title"],
        seoTitle=data["seoTitle"].split(" | ")[0], # Just use the exact title for next.js metadata, the template in layout adds the rest or we can use exactly what was requested.
        description=data["description"],
        content_intro=data["content_intro"],
        kimler=data["kimler"],
        surec=data["surec"],
        neden=data["neden"]
    )
    
    # Small fix for seoTitle to make sure it precisely matches user request for the tag
    content = content.replace("title: '"+data["seoTitle"].split(" | ")[0]+"'", "title: '"+data["seoTitle"].replace(" | Ankara Pet House", "").replace(" | Ankara Pet Otel", "")+"'")
    
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Service pages generated successfully.")
