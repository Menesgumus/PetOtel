# Phase 6 & 7 Pre-Launch QA Checklist

## 1. Visual & UI Checks
- [ ] Homepage is strictly cream/white/navy (no pure black).
- [ ] OS dark mode does not turn the site black.
- [ ] Brand colors are compiling correctly via Tailwind v4 `@theme`.
- [ ] Header logo is proportional (desktop ~48-56px height, mobile ~36-44px height).
- [ ] Footer logo is visible against the navy background (using subtle borders or cream container).
- [ ] Placeholders are clean and explicitly state "Gerçek otel fotoğrafı yüklenecek".
- [ ] No fake AI or stock images are present.

## 2. Mobile & Responsive Checks
- [ ] No horizontal overflow on major pages (Homepage, Services, Rooms, Blog).
- [ ] Mobile contact bar (`WhatsApp`, `Hemen Arayın`) is fully visible and does not cover the footer text.
- [ ] Mobile hamburger menu has 44x44px touch target.
- [ ] Admin tables do not overflow or stretch the viewport (wrapped in `overflow-x-auto`).

## 3. Accessibility (a11y) Checks
- [ ] One `<h1>` per public page with logical `<h2>`/`<h3>` hierarchy.
- [ ] Hamburger menu has descriptive `aria-label`.
- [ ] Focus states are visible and styled properly (e.g. `focus:ring-brand-gold`).
- [ ] All uploaded images and logo use meaningful `alt` text.

## 4. API & Fallback Checks
- [ ] Missing CMS pages (`hizmetlerimiz`, `odalar`, `hakkimizda`) return 404 gracefully.
- [ ] 404s DO NOT trigger massive red Next.js error overlays in development.
- [ ] The public fetch catches errors safely, logging a `console.warn` instead of throwing unhandled Exceptions.

## 5. Admin & Security Checks
- [ ] `/admin/login` sets `httpOnly` auth cookie.
- [ ] JWT is NEVER stored in client-side `localStorage` or `sessionStorage`.
- [ ] Protected routes successfully redirect unauthorized users to login.
- [ ] Blog CRUD works successfully.
- [ ] Media Uploads correctly proxy the `multipart/form-data` to the backend.

## 6. SEO & Metadata Checks
- [ ] `robots.txt` is accessible and properly disallows `/admin/`.
- [ ] `sitemap.xml` correctly maps all public pages.
- [ ] Old URLs (`/services/pet-taksi`, `/kategori/pet-pansiyon`) correctly 301 redirect to the new slugs.
- [ ] JSON-LD structured data is valid on the homepage.
- [ ] Dynamic Blog metadata handles slugs properly (returns `notFound()` if actual blog fails to load).

## 7. Phase 7: Deployment & Post-Launch
- [ ] Set Production Environment Variables (`NEXT_PUBLIC_API_BASE_URL`, `JWT_SECRET`, DB Credentials).
- [ ] Integrate Google Tag Manager (GTM) for analytics.
- [ ] Upload real pet hotel photos to replace placeholders.
- [ ] Confirm Domain DNS is pointed to Vercel/VPS.
