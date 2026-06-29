# SEO Strategy Plan

## Why Next.js App Router?
Next.js App Router allows us to mix Server Components and Client Components smoothly. Server Components ensure that search engine crawlers receive fully rendered HTML without needing to execute JavaScript, resulting in significantly better crawling speeds, core web vitals, and indexing reliability.

## Planned SEO Routes
The application will utilize semantic Turkish URLs to maximize local relevancy in Turkey.
Primary target routes:
- `/` (Ankara Pet Otel - Main Focus)
- `/hakkimizda`
- `/hizmetlerimiz`
- `/odalar`
- `/blog`
- `/iletisim`
- `/ankara-kedi-oteli`
- `/ankara-kopek-oteli`
- `/ankara-pet-pansiyonu`
- `/pet-taksi-ankara`
- `/pet-kres-ankara`
- `/pet-bakim-gezdirme-ankara`
- `/pet-egitimi-ankara`

## Metadata Strategy
We utilize Next.js's native `generateMetadata` API. 
- A base layout metadata provides the default site name, description, Open Graph images, and Twitter cards.
- Individual pages will override this metadata with highly specific titles and descriptions based on their primary keyword target.

## Sitemap and Robots Strategy
- `sitemap.ts` dynamically generates an XML sitemap mapping out all primary static routes, and eventually will loop through dynamic routes (like blog posts and services).
- `robots.ts` allows all crawling on public routes, while specifically disallowing crawling of the `/admin` prefix.

## Structured Data (Schema.org)
Future phases will implement JSON-LD structured data inside the Next.js `head`.
- **LocalBusiness**: For contact info, maps, and hours.
- **Article**: For blog posts.
- **Service**: For specific pet services.

## Keyword Map Structure
| Route | Target Primary Keyword | Strategy Focus |
|-------|------------------------|----------------|
| `/` | Ankara pet otel | Main brand trust, local pack listing synergy. |
| `/ankara-kedi-oteli` | Ankara kedi oteli | Specific landing page for cat owners. |
| `/ankara-kopek-oteli` | Ankara köpek oteli | Specific landing page for dog owners. |
| `/ankara-pet-pansiyonu` | Ankara pet pansiyonu | Targeting 'pansiyon' intent searchers. |
| `/pet-taksi-ankara` | Ankara pet taksi | Local utility service searches. |
| `/blog/*` | Long-tail educational | e.g. 'Köpekler neden otları yer?' to drive top-of-funnel traffic. |
