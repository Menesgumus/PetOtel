# Technical SEO Strategy

This document outlines the SEO architecture and strategies implemented in Phase 5 for the Ankara Pet House modernization project.

## 1. Metadata Strategy
All public routes export unique metadata to ensure proper indexing and social sharing. 
- The Next.js `app/layout.tsx` defines default metadata and the base `openGraph` properties, leveraging `NEXT_PUBLIC_SITE_URL` for absolute paths and `metadataBase`.
- The `lib/seo/metadata.ts` helper standardizes the generation of `<title>`, `<meta name="description">`, canonical tags, and Open Graph tags.
- Dynamic routes (`/blog/[slug]`, `/hakkimizda`, etc.) attempt to fetch backend SEO properties (e.g., `seoTitle`, `seoDescription`) using Server Components. If the backend is unreachable or the data is missing, they gracefully fall back to static, safe placeholder strings, ensuring SEO performance is never compromised by API downtime.

## 2. Canonical URLs
Canonical tags are generated dynamically for all pages to prevent duplicate content issues.
- `metadataBase` is set to `NEXT_PUBLIC_SITE_URL` (or localhost for dev).
- Each page passes its relative `canonicalUrl` (e.g., `/iletisim`) to the `constructMetadata` helper, ensuring strict and consistent canonical tags across the entire site.

## 3. Sitemap & Robots
- **Sitemap (`sitemap.xml`)**: Generated dynamically via `app/sitemap.ts`. It includes static Turkish SEO routes (e.g., `/ankara-kedi-oteli`) alongside dynamically fetched blog posts and services. Crucially, the fetch operations use `catch(() => null)` so that the static routes remain available even if the backend is down. Drafts, deleted posts, and `/admin` routes are strictly excluded.
- **Robots (`robots.txt`)**: Generated dynamically via `app/robots.ts`. It allows crawling of the public site, disallows all `/admin` routes, and clearly points to the full sitemap URL.

## 4. Structured Data (JSON-LD)
JSON-LD schemas are implemented conservatively to provide search engines with context without violating guidelines (e.g., no fake ratings).
- **LocalBusiness**: Included on the Homepage and Contact page. Dynamic site settings (like `instagramUrl`, `phone`, `email`) are fetched and injected.
- **BlogPosting**: Included on blog details pages (`/blog/[slug]`), populated with the title, description, and dynamic publication dates.
- **Breadcrumbs**: Used on blog detail pages to improve site architecture understanding for bots.

## 5. Old URL Redirects
To preserve the SEO authority of old WordPress-style URLs, permanent (308) redirects are configured in `next.config.ts`.
Next.js handles trailing slashes natively, so `/services/pet-taksi/` and `/services/pet-taksi` both safely redirect.
- `/services` & `/services/` -> `/hizmetlerimiz`
- `/kategori/pet-pansiyon` & `/kategori/pet-pansiyon/` -> `/blog`
- `/services/pet-taksi` -> `/pet-taksi-ankara`
- `/services/pet-pansiyonu` -> `/ankara-pet-pansiyonu`
- `/services/pet-kres` -> `/pet-kres-ankara`
- `/services/pet-bakim-ve-gezdirme` -> `/pet-bakim-gezdirme-ankara`
- `/services/pet-egitimi` -> `/pet-egitimi-ankara`

## 6. Image SEO
The `next.config.ts` allows the usage of `next/image` with backend media uploads by configuring `remotePatterns`. 
- Supported protocols/hosts include `http://localhost:8080` and `https://ankarapethouse.com`.
- **Placeholder Rule**: All placeholders maintain fixed aspect ratios to prevent Layout Shift. Stock images and AI-generated content are strictly avoided in favor of neutral placeholders until real business photography is supplied.

## 7. GTM Preparation
Google Tag Manager should be injected later. When doing so:
- **Head snippet**: Place inside `app/layout.tsx` within the `<head>` tag.
- **Body snippet**: Place immediately after the opening `<body>` tag.
- Do not use fake or placeholder GTM IDs to avoid data pollution.

## Production Checklist
- [ ] Ensure `NEXT_PUBLIC_SITE_URL` is set to `https://ankarapethouse.com`.
- [ ] Supply real `.env.production` files.
- [ ] Confirm the backend upload path matches `next.config.ts` remote patterns if the host changes.
