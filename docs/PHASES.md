# Project Phases Roadmap

The Ankara Pet House modernization project is divided into the following sequential phases:

### Phase 1: Architecture & Setup (Completed)
- Monorepo structure creation.
- Next.js (frontend) and Spring Boot (backend) basic initialization.
- Database entity modeling and migration setup.
- Route and documentation placeholders.

### Phase 2: Public Frontend Theme and Pages (Completed)
- Full implementation of Tailwind CSS brand styling.
- Responsive mobile-first layouts for header, footer, and mobile contact bar.
- Creation of static UI content for all planned Turkish SEO routes.
- Component library finalization (Buttons, Sections, Cards).

### Phase 3: Backend CRUD APIs
- Full implementation of JPA repositories and services.
- Mapping entities to DTOs.
- Creating functional public read endpoints (Services, Rooms, Blog).
- Structuring Admin CRUD endpoints.

### Phase 4: Admin Panel
- Next.js Admin authentication UI implementation.
- Spring Security JWT / Session integration on the backend.
- Forms for managing blog posts, media uploads, and services.
- WYSIWYG editor integration for content.

### Phase 5: SEO Layer
- Finalizing dynamic metadata injection.
- Creating the robust JSON-LD schema components.
- Connecting dynamic backend content to the Next.js frontend rendering pipeline.

### Phase 6: Performance and Mobile Polish
- Lighthouse score optimization.
- Image optimization pipeline using Next/Image and backend sizing.
- Final CSS micro-interactions and touch targets polish.

### Phase 7: GTM and Production Deployment
- Injecting Google Tag Manager.
- Preparing production environment variables.
- Deploying frontend to Vercel/similar.
- Deploying backend to VPS/Managed hosting.
- Go-live.
