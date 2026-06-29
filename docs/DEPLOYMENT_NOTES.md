# Deployment Notes

## Local Development Notes
To work locally, ensure you use the `.env.local` for the frontend and `.env` for the backend, as defined in their respective `.example` files.
- You must run the Postgres docker container first before launching the backend.
- The Next.js frontend defaults to port `3000`.
- The Spring Boot backend defaults to port `8080`.

## Production Deployment Notes (Future)
- **Database**: Do NOT use the local docker-compose Postgres for production. Provision a managed PostgreSQL instance (e.g., AWS RDS, DigitalOcean Managed Database) and configure the production backend `SPRING_DATASOURCE_URL`.
- **Backend Deployment**: The backend can be containerized using a Dockerfile or deployed via a JAR directly on an EC2/Droplet.
- **Frontend Deployment**: Vercel is the recommended hosting platform for the Next.js frontend due to its out-of-the-box optimization for the App Router.

## Upload Directory Persistence Warning
In Phase 1, media uploads are stored locally on the backend server at `APP_UPLOAD_DIR`. 
**WARNING**: If you redeploy the backend in a containerized environment without mounting a persistent volume to this directory, **all uploaded images will be lost.**
Ensure persistent storage is used if keeping this strategy in production, or migrate to S3.

## HTTPS & Reverse Proxy
In a traditional VPS deployment, ensure you put a reverse proxy (like Nginx) in front of the Spring Boot application and configure SSL (Let's Encrypt). Do not expose the Spring Boot Tomcat instance directly to port 80/443 without a proxy.

## Google Tag Manager (GTM) Note
GTM will be added in the final phase. Be prepared to add the GTM `<script>` tags in the Next.js `app/layout.tsx` file when the G-code is provided.
