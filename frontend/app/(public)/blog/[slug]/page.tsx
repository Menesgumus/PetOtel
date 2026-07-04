import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBlogPostingSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site/config';
import { MarkdownContent } from '@/components/ui/MarkdownContent';
import { getWhatsAppUrl } from '@/lib/utils/whatsapp';

const placeholderBlogs = {
  'kedilerin-mirlamasinin-sebepleri': { 
    title: 'Kedilerin Mırlamasının Sebepleri', 
    summary: 'Kedilerin mırlaması çoğu zaman huzur ve güven duygusuyla ilişkilidir, ancak her zaman tek bir anlama gelmez.',
    seoTitle: 'Kedilerin Mırlamasının Sebepleri | Ankara Pet House',
    seoDescription: 'Kediler neden mırlar? Mutluluk, rahatlama, iletişim ve stres gibi farklı sebeplerle ortaya çıkan mırlama davranışını sade şekilde anlattık.',
    imageUrl: '/blog/mirlama.jpg',
    content: 'Kedilerin mırlaması, onları seven herkesin en çok merak ettiği davranışlardan biridir. Çoğu zaman huzurlu, mutlu ve güvende hissettiklerinde mırlarlar. Ancak mırlama her zaman sadece “mutluluk” anlamına gelmez.\n\n## Kediler neden mırlar?\n\nKediler mırlayarak hem kendilerini rahatlatabilir hem de çevreleriyle iletişim kurabilir. Özellikle sevildiklerinde, sakin bir ortamda dinlenirken veya güvendikleri bir kişinin yanında olduklarında mırlama davranışı daha sık görülür.\n\n## Mırlama her zaman mutluluk belirtisi midir?\n\nGenellikle olumlu bir davranış gibi düşünülse de bazı kediler stres, ağrı veya huzursuzluk yaşadıklarında da mırlayabilir. Bu nedenle mırlamayı tek başına değil, kedinizin genel davranışlarıyla birlikte değerlendirmek daha doğru olur.\n\n## Hangi durumlarda dikkat edilmeli?\n\nKediniz normalden farklı davranıyorsa, iştahı azaldıysa, saklanıyorsa, halsizse veya mırlama ile birlikte huzursuz görünüyorsa bir veteriner hekime danışmanız daha güvenli olur.\n\n## Sonuç\n\nMırlama çoğu zaman kedinizin kendini rahat ve güvende hissettiğini gösteren güzel bir davranıştır. Yine de her kedinin karakteri farklıdır. Kedinizin beden dilini, alışkanlıklarını ve günlük rutinini gözlemlemek onu daha iyi anlamanıza yardımcı olur.'
  },
  'kedilerin-dogum-oncesi-hazirligi-dogum-zamani-ve-dogum-sonrasi': { 
    title: 'Kedilerin Doğum Öncesi Hazırlığı, Doğum Zamanı ve Doğum Sonrası Nasıl Olmalıdır?', 
    summary: 'Kedilerde doğum süreci öncesi hazırlık, sakin bir alan oluşturmak ve anneyi dikkatle gözlemlemekle başlar.',
    seoTitle: 'Kedilerde Doğum Öncesi ve Sonrası Hazırlık',
    seoDescription: 'Kedilerde doğum öncesi hazırlık, doğum zamanı ve doğum sonrası dikkat edilmesi gerekenleri sade ve anlaşılır şekilde anlattık.',
    imageUrl: '/blog/dogum.jpg',
    content: 'Kedilerde doğum süreci, anne kedinin rahat, sakin ve güvenli bir ortamda olması gereken hassas bir dönemdir. Bu süreçte en önemli nokta, anne kediyi gereksiz yere strese sokmadan gözlemlemek ve ihtiyaç duyduğunda veteriner desteği almaktır.\n\n## Doğum öncesi hazırlık nasıl yapılmalı?\n\nDoğum yaklaşırken anne kedi daha sakin, korunaklı ve sessiz bir alan arayabilir. Bu dönemde ona temiz, sıcak ve rahat bir doğum alanı hazırlamak faydalı olur.\n\nHazırlık için dikkat edilebilecekler:\n\n- Sessiz ve sakin bir alan seçmek\n- Temiz battaniye veya havlu hazırlamak\n- Mama ve suya kolay ulaşmasını sağlamak\n- Anne kediyi sık sık yer değiştirmeye zorlamamak\n- Gerektiğinde ulaşılabilecek veteriner bilgisini hazır tutmak\n\n## Doğum zamanı nelere dikkat edilmeli?\n\nDoğum sırasında anne kediler genellikle içgüdüsel olarak ne yapacaklarını bilirler. Bu nedenle panik yapmadan, uzaktan ve sakin şekilde gözlemlemek önemlidir.\n\nAnne kediyi sürekli ellemek, yavrulara gereksiz müdahale etmek veya ortamı kalabalıklaştırmak stresi artırabilir. Ancak uzun süren zorlanma, aşırı halsizlik, kanama veya doğumun ilerlememesi gibi durumlarda vakit kaybetmeden veteriner hekime danışılmalıdır.\n\n## Doğum sonrası bakım nasıl olmalı?\n\nDoğumdan sonra anne kedi ve yavruların sakin bir ortamda kalması gerekir. Anne kedinin mama ve su ihtiyacı artabilir. Yavruların annelerini emip emmediği ve ortamın sıcaklığı düzenli olarak kontrol edilmelidir.\n\nDoğum sonrası dönemde dikkat edilebilecekler:\n\n- Anne ve yavruları rahatsız etmemek\n- Alanı temiz ve sıcak tutmak\n- Anne kedinin beslenmesini desteklemek\n- Yavruların emme durumunu gözlemlemek\n- Olağan dışı durumlarda veteriner desteği almak\n\n## Sonuç\n\nKedilerde doğum süreci doğal ilerleyebilen bir dönemdir, ancak dikkatli gözlem çok önemlidir. Anne kedinin rahat hissettiği güvenli bir alan oluşturmak ve beklenmedik durumlarda veteriner hekime danışmak en doğru yaklaşımdır.'
  },
  'kediler-neden-kum-kabinin-disina-yapar': { 
    title: 'Kediler Neden İdrarını ya da Dışkısını Kum Kabının Dışına Yapar?', 
    summary: 'Kedilerin kum kabı dışına tuvalet yapması davranışsal, çevresel ya da sağlıkla ilgili birçok nedenden kaynaklanabilir.',
    seoTitle: 'Kediler Neden Kum Kabının Dışına Tuvalet Yapar?',
    seoDescription: 'Kedilerin idrarını veya dışkısını kum kabı dışına yapmasının olası nedenlerini ve dikkat edilmesi gerekenleri anlattık.',
    imageUrl: '/blog/kum.jpg',
    content: 'Kedilerin idrarını ya da dışkısını kum kabının dışına yapması, kedi sahipleri için endişe verici bir durum olabilir. Bu davranış bazen kum kabı düzeniyle, bazen stresle, bazen de sağlık sorunlarıyla ilişkili olabilir.\n\n## Kum kabı temizliği önemli mi?\n\nEvet. Kediler temizliğe önem veren canlılardır. Kum kabı kirliyse, kötü kokuyorsa veya uzun süre temizlenmediyse kullanmak istemeyebilirler. Bu nedenle kum kabının düzenli temizlenmesi çok önemlidir.\n\n## Kum kabının yeri etkili olabilir mi?\n\nKum kabı çok gürültülü, kalabalık veya kedinin kendini güvende hissetmediği bir yerdeyse kedi farklı alanlara tuvalet yapabilir. Kum kabının sakin, kolay ulaşılabilir ve kedinin rahat hissedebileceği bir yerde olması gerekir.\n\n## Stres ve değişiklikler bu davranışı tetikler mi?\n\nEvet. Eve yeni bir hayvan gelmesi, taşınma, misafir yoğunluğu, mama değişikliği, ev düzeninin değişmesi veya kedinin rutinindeki farklılıklar stres oluşturabilir. Bazı kediler bu stresi tuvalet alışkanlığındaki değişikliklerle gösterebilir.\n\n## Sağlık sorunu olabilir mi?\n\nKediniz özellikle idrarını kum kabı dışına yapıyorsa, sık sık tuvalete gidiyorsa, zorlanıyorsa, miyavlıyorsa veya idrarında kan fark ediyorsanız bu durum sağlıkla ilgili olabilir. Bu gibi belirtilerde veteriner hekime danışmak gerekir.\n\n## Ne yapılabilir?\n\nÖncelikle kum kabının temizliği, konumu, kum tipi ve kedinizin günlük rutini gözden geçirilmelidir. Ani başlayan, tekrarlayan veya başka belirtilerle birlikte görülen durumlarda ise veteriner kontrolü ihmal edilmemelidir.\n\n## Sonuç\n\nKum kabı dışına tuvalet yapma davranışı kedinizin size bir şey anlatma şekli olabilir. Temizlik, ortam, stres ve sağlık ihtimallerini birlikte değerlendirmek en doğru yaklaşımdır.'
  },
};

import { getPublicBlogPost } from '@/lib/api/public';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const dynamicPost = await getPublicBlogPost(slug).catch(() => null);
  if (dynamicPost) {
    return constructMetadata({
      title: dynamicPost.seoTitle || dynamicPost.title,
      description: dynamicPost.seoDescription || dynamicPost.summary,
      canonicalUrl: `/blog/${slug}`
    });
  }

  const post = placeholderBlogs[slug as keyof typeof placeholderBlogs];
  if (!post) return {};

  return constructMetadata({
    title: (post as any).seoTitle || post.title,
    description: (post as any).seoDescription || post.summary,
    canonicalUrl: `/blog/${slug}`
  });
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post = await getPublicBlogPost(slug).catch(() => null);
  let isDynamic = true;

  if (!post) {
    const staticPost = placeholderBlogs[slug as keyof typeof placeholderBlogs];
    if (!staticPost) {
      notFound();
    }
    post = {
      title: staticPost.title,
      summary: staticPost.summary,
      content: 'Bu alan, makalenin detaylı içeriğini göstermek için tasarlanmış statik bir yer tutucudur. Phase 3 kapsamında bu içerik Spring Boot arka uç (backend) sistemi üzerinden dinamik olarak getirilecektir.\n\n## Alt Başlık Örneği\n\nAnkara Pet House olarak blog sayfamızda hayvan sağlığı, beslenme, eğitim ve güvenli konaklama gibi konularda bilgilendirici içerikler sunmayı amaçlıyoruz. Düzenli olarak yayınlayacağımız makalelerimizle evcil dost sahiplerine faydalı bilgiler aktaracağız.',
      slug: slug,
      id: 0,
      isActive: true,
      status: 'PUBLISHED',
      createdAt: '2026-06-29T12:00:00Z',
      updatedAt: '2026-06-29T12:00:00Z'
    } as any;
    isDynamic = false;
  }

  const schema = generateBlogPostingSchema({
    title: post!.title,
    description: post!.summary,
    url: `/blog/${slug}`,
    datePublished: post!.publishedAt || post!.createdAt
  });

  return (
    <>
      <JsonLd data={schema} />
      
      <Section className="bg-white min-h-screen pt-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs items={[
              { name: 'Blog', href: '/blog' },
              { name: post!.title, href: `/blog/${slug}` }
            ]} />
            
            <h1 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">{post!.title}</h1>
            <p className="text-xl text-brand-text/70 mb-8">{post!.summary}</p>
            
            {post!.coverImageUrl || (post as any).imageUrl ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg border border-brand-border/50">
                <img src={post!.coverImageUrl || (post as any).imageUrl} alt={post!.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <ImagePlaceholder aspectRatio="video" className="mb-12 rounded-2xl" text="Blog görseli yakında eklenecek" />
            )}
            
            <div className="mb-16">
              <MarkdownContent content={post!.content} />
            </div>
            
            <div className="bg-brand-soft p-8 rounded-2xl border border-brand-border text-center">
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Daha Fazla Bilgiye mi İhtiyacınız Var?</h3>
              <p className="text-brand-text/80 mb-6">Hizmetlerimiz hakkında detaylı bilgi almak veya hemen yer ayırtmak için bizimle iletişime geçin.</p>
              <Button href={getWhatsAppUrl(siteConfig.whatsapp, "Merhaba, web siteniz üzerinden ulaşıyorum. Bilgi almak istiyorum.")} variant="primary">
                WhatsApp Üzerinden Ulaşın
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
