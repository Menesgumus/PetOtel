# Ankara Pet House - Frontend Theme & Design

## Brand Colors
The Phase 2 public website relies on a carefully selected palette designed to inspire trust, cleanliness, and professionalism.

- **brand.navy (`#061F45`)**: Used for primary headers, footers, primary buttons, and major headings. Represents trust and security.
- **brand.white (`#FFFFFF`)**: Pure white used for content cards and sections requiring high contrast. Represents cleanliness.
- **brand.soft (`#F7F4EF`)**: A very soft cream/beige background. Used to break up sections and provide a warm, pet-friendly atmosphere.
- **brand.gold (`#C9A76A`)**: Used sparingly for accents, active states, and secondary buttons. Adds a premium feel.
- **brand.text (`#172033`)**: Primary text color. Softened from pure black for better reading accessibility.
- **brand.border (`#E7E2DA`)**: Subtle borders to define cards and sections without being harsh.

## Core Component Structure
- `SiteHeader`: Contains the main navigation and logo. Implements a Server Component for layout and embeds a `MobileMenu` Client Component to handle interactivity.
- `SiteFooter`: Extensive footer with quick links and contact info.
- `MobileContactBar`: A sticky bottom bar exclusively for mobile users, offering immediate WhatsApp, Phone, and Map actions.
- **Cards**: Reusable components (`ServiceCard`, `RoomCard`, `BlogCard`, `ContactActionCard`) enforce consistency across the UI.
- **SEO Elements**: `JsonLd` injector, `Breadcrumbs`, and `PageHero` to ensure semantic structure and rich indexing.

## SEO Strategy Implementation
- We utilize `next/metadata` API strictly on every page.
- Semantic HTML tags (only one `H1` per page).
- We inject structured data (JSON-LD) for `LocalBusiness`, `Service`, `BreadcrumbList`, and `BlogPosting`.

## Policy: No Fake or AI-Generated Images
To ensure the website represents the true nature of the business:
- **No AI-generated pet images are used.**
- **No fake stock images of rooms or animals.**
- The UI strictly uses `ImagePlaceholder.tsx` (a neutral SVG block) for all image areas.
- The business owner will replace these placeholders with real photos of their own facilities and guest animals in a later phase.
