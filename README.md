# Ankara Pet House

Modern, responsive and fully manageable web platform developed for Ankara Pet House. The project includes a public website and a custom admin panel for managing content, services, accommodation areas, blog posts and site settings.

🌐 **Live Demo:** https://ankarapethouse.com

## Features

- Responsive and SEO-friendly frontend
- Secure Spring Boot REST API
- Custom admin panel
- Blog & service management
- Accommodation management
- Media upload system
- SEO management
- JWT authentication
- Docker-based deployment
- Nginx reverse proxy
- HTTPS / SSL
- Cloudflare integration

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS

**Backend**
- Java
- Spring Boot
- Spring Security
- PostgreSQL

**DevOps**
- Docker
- Docker Compose
- Nginx
- Cloudflare

## Architecture

```text
Visitor
   ↓
Cloudflare
   ↓
Nginx
   ↓
Next.js Frontend
   ↓
Spring Boot REST API
   ↓
PostgreSQL
```

## Getting Started

```bash
git clone https://github.com/username/repository.git
cd repository
docker compose up -d --build
```

## Project Status

✅ Production Ready

## License

This project was developed for private use. All rights reserved.
