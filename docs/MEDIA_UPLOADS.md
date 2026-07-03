# Media Uploads (Phase 3)

Media assets are currently stored locally on the server filesystem.

## Storage Configuration
Files are saved to a directory defined by the environment variable:
```properties
APP_UPLOAD_DIR=./uploads
```
- The backend automatically creates this directory if it doesn't exist.
- Uploaded files are served publicly at `/uploads/**` via a static resource handler in `WebConfig.java`.

## Security & Constraints
- **Authentication**: Only authenticated admins can upload media (`/api/v1/admin/media/upload`).
- **File Names**: Original filenames are discarded for storage to prevent path traversal and collisions. All files are saved using a generated `UUID`.
- **MIME Types**: Strongly validated. 
  - **Allowed**: `image/jpeg`, `image/png`, `image/webp`, `image/avif`
  - **Blocked**: `image/svg+xml` (blocked to prevent XSS injection via XML), executables, scripts, etc.
- **File Size**: Bounded by Spring Boot config (`spring.servlet.multipart.max-file-size=10MB`).

## Metadata
The original filename, dimensions (width/height), file size, MIME type, and optional `altText` are saved to the PostgreSQL database in the `media_assets` table.

## Production Warning
Storing files on the local filesystem is acceptable for Phase 3 development and low-traffic deployments. For high availability or containerized production (Docker/Kubernetes), local volumes are ephemeral.
**Future TODO**: Migrate `MediaService` to AWS S3, Cloudinary, or a persistent shared network volume in production.
