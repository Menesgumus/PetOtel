import { constructMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { BlogCard } from '@/components/ui/BlogCard';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata = constructMetadata({
  title: 'Pet Bakımı Blog | Ankara Pet House',
  description: 'Kedi bakımı, evcil hayvan davranışları ve pet yaşamına dair pratik bilgileri Ankara Pet House blogunda keşfedin.',
  canonicalUrl: '/blog'
});

const placeholderBlogs = [
  { slug: 'kedilerin-mirlamasinin-sebepleri', title: 'Kedilerin Mırlamasının Sebepleri', summary: 'Kedilerin mırlaması çoğu zaman huzur ve güven duygusuyla ilişkilidir, ancak her zaman tek bir anlama gelmez.', imageUrl: '/blog/mirlama.jpg' },
  { slug: 'kedilerin-dogum-oncesi-hazirligi-dogum-zamani-ve-dogum-sonrasi', title: 'Kedilerin Doğum Öncesi Hazırlığı, Doğum Zamanı ve Doğum Sonrası Nasıl Olmalıdır?', summary: 'Kedilerde doğum süreci öncesi hazırlık, sakin bir alan oluşturmak ve anneyi dikkatle gözlemlemekle başlar.', imageUrl: '/blog/dogum.jpg' },
  { slug: 'kediler-neden-kum-kabinin-disina-yapar', title: 'Kediler Neden İdrarını ya da Dışkısını Kum Kabının Dışına Yapar?', summary: 'Kedilerin kum kabı dışına tuvalet yapması davranışsal, çevresel ya da sağlıkla ilgili birçok nedenden kaynaklanabilir.', imageUrl: '/blog/kum.jpg' },
];

import { getPublicBlogPosts } from '@/lib/api/public';

export default async function BlogPage() {
  const dynamicResponse = await getPublicBlogPosts();
  const dynamicBlogs = dynamicResponse.content;

  return (
    <>
      <PageHero title="Ankara Pet House Blog" description="Evcil dostlarınızın sağlığı, bakımı ve konaklama süreçleri hakkında faydalı içerikler." />
      
      <Section className="bg-brand-soft min-h-screen">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dynamicBlogs.length > 0 ? (
              dynamicBlogs.map((post, idx) => (
                <RevealOnScroll key={post.id} direction="up" delay={(idx % 3) * 100}>
                  <BlogCard 
                    title={post.title} 
                    summary={post.summary} 
                    href={`/blog/${post.slug}`} 
                    date={new Date(post.publishedAt || post.createdAt).toLocaleDateString('tr-TR')}
                    imageUrl={post.coverImageUrl}
                  />
                </RevealOnScroll>
              ))
            ) : (
              placeholderBlogs.map((post, idx) => (
                <RevealOnScroll key={post.slug} direction="up" delay={(idx % 3) * 100}>
                  <BlogCard 
                    title={post.title} 
                    summary={post.summary} 
                    href={`/blog/${post.slug}`} 
                    date="29 Haziran 2026"
                    imageUrl={post.imageUrl}
                  />
                </RevealOnScroll>
              ))
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
