# Ankara Pet House Docker Deployment

This project is fully dockerized to support PostgreSQL, Spring Boot, and Next.js within a unified Docker Compose network.

## Prerequisites
* Docker and Docker Compose installed.

## Running the Application Locally
To start the entire application stack in the background:
```bash
docker compose up -d --build
```
This will start:
* **postgres** on internal port 5432 (mapped to `localhost:5434` for safe host access)
* **backend** on port 8080 (`http://localhost:8080`)
* **frontend** on port 3000 (`http://localhost:3000`)

### Stopping the Stack
To stop the stack without losing your database or uploaded files:
```bash
docker compose down
```

> [!WARNING]
> **NEVER** run `docker compose down -v` unless you explicitly intend to permanently delete all your PostgreSQL data and all uploaded image files.

## Environment Variables
Ensure your `.env` file is properly configured.
Key networking variables:
* `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1` (Used by browsers to fetch data).
* `INTERNAL_API_BASE_URL=http://backend:8080/api/v1` (Used by Next.js server components inside Docker to directly connect to the backend without NAT loops).

### Rotating Credentials safely
If you ever need to change `POSTGRES_PASSWORD` or `APP_ADMIN_PASSWORD`:
1. Stop the stack: `docker compose down`
2. Update the values in `.env`. (If rotating `APP_ADMIN_PASSWORD`, remember to set `APP_ADMIN_SEED_ENABLED=true` temporarily).
3. Restart the stack: `docker compose up -d`
4. If you used `APP_ADMIN_SEED_ENABLED=true`, remember to turn it back to `false` in `.env` and restart the backend.

## Persistence
* **Database**: Survives container restarts via the `postgres-data` named volume.
* **Uploads**: Survives container restarts via the `backend_uploads` named volume mapped to `/app/uploads` in the backend container. 

*(Note: If you have existing files in `./backend/uploads/` from prior manual runs, they will not automatically appear inside the named volume until they are migrated or manually uploaded again).*

## Production Deployment Tips
For production, you should ideally:
* Only expose the `frontend` service to the public web (typically using NGINX/Caddy as a reverse proxy over port 80/443).
* Ensure `postgres` and `backend` remain completely internal to the Docker network unless strictly required.
* Ensure your `.env` secrets (DB passwords, JWT secret) are strong and randomized.
