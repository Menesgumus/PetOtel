# API Documentation (Phase 3)

The backend provides RESTful APIs for managing the Ankara Pet House platform. 
Endpoints are strictly segregated into public (`/api/v1/public/**`) and admin (`/api/v1/admin/**`) routes.

## Core Rules
- **Public Endpoints**: Unauthenticated. Returns only safe, active, published, and non-deleted records.
- **Admin Endpoints**: Requires JWT authentication via `Authorization: Bearer <token>`. Allows managing all records, including drafts and soft-deleted records (when explicitly queried).
- **Responses**: Always use DTOs to avoid leaking sensitive fields like `passwordHash` or internal states.

## Endpoints

### 1. Health
- `GET /api/v1/health` (Public) - Returns application health status.

### 2. Authentication
- `POST /api/v1/auth/login` (Public) - Authenticate with email/password and receive a JWT.
- `GET /api/v1/auth/me` (Protected) - Retrieve the profile of the currently authenticated user.

### 3. Blog Module
**Public**
- `GET /api/v1/public/blog?page=0&size=10`
- `GET /api/v1/public/blog/{slug}`

**Admin**
- `GET /api/v1/admin/blog`
- `GET /api/v1/admin/blog/{id}`
- `POST /api/v1/admin/blog`
- `PUT /api/v1/admin/blog/{id}`
- `PATCH /api/v1/admin/blog/{id}/status`
- `DELETE /api/v1/admin/blog/{id}`

### 4. Media Module
**Admin**
- `POST /api/v1/admin/media/upload` (multipart/form-data)
- `GET /api/v1/admin/media`
- `GET /api/v1/admin/media/{id}`
- `PATCH /api/v1/admin/media/{id}/alt-text`
- `DELETE /api/v1/admin/media/{id}`

**Public**
- Media files are served via static mappings: `GET /uploads/{filename}`

### 5. Services & Rooms
Provides identical structured CRUD. 
- Public: `GET /api/v1/public/services` & `GET /api/v1/public/rooms`
- Admin: Full CRUD under `/api/v1/admin/services` and `/api/v1/admin/rooms`. Supports `PATCH .../active` and `PATCH .../sort-order`.

### 6. Pages & Settings
- Public: `GET /api/v1/public/pages/{slug}` & `GET /api/v1/public/site-settings`
- Admin: `PUT /api/v1/admin/pages/{slug}` & `PUT /api/v1/admin/settings`
