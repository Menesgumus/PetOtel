# Authentication Strategy (Phase 3)

The application uses **JWT (JSON Web Token)** for securing the Admin API.

## Admin Seed (Development Only)
In development, an admin user can be seeded on application startup.
**Configuration (`application.yml` / `.env`):**
```properties
APP_ADMIN_SEED_ENABLED=true
APP_ADMIN_EMAIL=admin@ankarapethouse.com
APP_ADMIN_PASSWORD=change-me-locally
```
- The password is automatically hashed with BCrypt before being saved to PostgreSQL.
- If `ENABLED` is false or missing, no user is created.
- **IMPORTANT**: This is for development only. In production, disable the seed and ensure the admin user has a strong, secure password.

## JWT Configuration
Tokens are stateless and signed using HMAC SHA.
```properties
APP_JWT_SECRET=super-secret-key-for-jwt-generation-which-must-be-long-enough
APP_JWT_EXPIRATION_MS=86400000
```
- **Secret**: Must be overridden in production using a long, random string.
- **Expiration**: Currently defaults to 24 hours (86,400,000 ms).

## Login Flow
1. Client sends `POST /api/v1/auth/login` with `{ "email": "...", "password": "..." }`.
2. Backend verifies credentials using BCrypt.
3. Backend generates and returns a JWT in the `token` field.
4. Client includes token in subsequent requests: `Authorization: Bearer <token>`.
