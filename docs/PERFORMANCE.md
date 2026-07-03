# Performance Optimization & Fallbacks

Ankara Pet House has been optimized for rapid page loads, high SEO performance, and maximum resilience against backend outages.

## 1. Next.js 16 Static Generation & Turbopack
- The site leverages Next.js 16 with the App Router and Turbopack for ultra-fast local development and optimized production builds.
- All non-dynamic public pages (`/hakkimizda`, `/hizmetlerimiz`, `/odalar`, `/iletisim`) are statically generated at build time where possible.
- The `generateMetadata` functions dynamically construct SEO tags but are designed to fallback gracefully.

## 2. API Resilience (Safe Public Fetch)
- The site uses a `safePublicFetch` wrapper (in `lib/api/public.ts`) for all non-admin data fetching.
- If the Spring Boot backend is down, or if a dynamic page hasn't been created in the CMS yet (returning a 404), the fetch catches the error and returns `null`.
- This guarantees the public UI never crashes with a `TypeError: fetch failed` or a red Next.js error overlay, ensuring potential customers always see a polished interface rather than a broken app.

## 3. Image Optimization
- Real uploaded media is served via the `next/image` component to automatically resize, compress to WebP, and lazy-load assets.
- Placeholders are rendered statically via CSS/HTML to avoid blocking the initial paint.

## 4. CSS Optimization
- Tailwind CSS v4 compiles utility classes instantly.
- Theme tokens (`brand-navy`, `brand-soft`) are injected natively via `@theme inline` inside `globals.css`, ensuring the smallest possible CSS payload without relying on heavy JavaScript-based theme toggles.
