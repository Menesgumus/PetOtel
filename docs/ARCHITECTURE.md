# Architecture Notes

## Monorepo Structure
This repository utilizes a simplified monorepo approach containing both frontend and backend codebases in a single version control repository. 
- `frontend/`: Contains the Next.js React application.
- `backend/`: Contains the Java Spring Boot REST application.
- `docker-compose.yml`: Found at the root to handle local infrastructure (PostgreSQL).

## Frontend/Backend Separation
The application relies on a strict decoupling of the UI from the server.
- The **frontend** (Next.js) acts strictly as a client, making HTTP REST calls to the backend. It also utilizes Next.js Server Components to fetch initial data for SEO indexing prior to serving pages to the client.
- The **backend** (Spring Boot) acts as a headless API service. It does not render HTML templates; it only serves JSON responses.

## API Versioning
All backend API routes are prefixed with `/api/v1/`. This ensures backward compatibility if structural API changes are needed in the future.
- Public routes (read-only): `/api/v1/public/...`
- Admin routes (protected): `/api/v1/admin/...`

## Database Design
The application uses PostgreSQL. Key design features:
- **UUIDs**: We use UUIDs as primary keys to avoid predictable IDs.
- **Soft Deletion**: Entities like blog posts, services, and rooms utilize a `deleted_at` timestamp. This allows recovery and historical logging without breaking referential integrity.
- **Migrations**: Database schema evolution is managed via Flyway.

## Media Upload Strategy (Phase 1)
For Phase 1, media uploads are handled via local filesystem storage on the backend server.
- Files are saved in a directory defined by the `APP_UPLOAD_DIR` environment variable.
- The database stores metadata (URL path, dimensions, size, original filename) in the `media_assets` table.
- Future phases may migrate this to an S3-compatible cloud object storage if scale requires.
