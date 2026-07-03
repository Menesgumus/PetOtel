# Frontend-Backend Integration

This document outlines how the Next.js frontend integrates with the Spring Boot backend in Phase 4 of the Ankara Pet House Modernization Project.

## Overview
The architecture is decoupled:
- **Frontend**: Next.js App Router running on `localhost:3000`.
- **Backend**: Spring Boot REST API running on `localhost:8080`.
- **Database**: PostgreSQL via Docker running on port `5434`.

## Security & Authentication
1. **JWT Strategy**: The backend issues a JWT on successful login (`POST /api/v1/auth/login`).
2. **Cookie Storage**: The frontend Next.js server receives this JWT and stores it in an `httpOnly`, `secure` cookie. This ensures the token is never accessible to client-side JavaScript.
3. **API Authorization**: When the frontend Next.js server needs to fetch protected data (e.g. `getAdminBlogPosts`), it uses `authorizedFetch()`. This wrapper automatically reads the `httpOnly` cookie and attaches it to the `Authorization: Bearer <token>` header of the request to the Spring Boot backend.

## Server Actions
To ensure secure operations, we leverage **Next.js Server Actions**:
- `lib/api/admin.ts` contains all CRUD functions and is marked with `"use server";` at the top.
- This allows Client Components (e.g. `BlogForm.tsx`) to seamlessly import and call backend mutations.
- Next.js automatically proxies these calls through the Next.js Node server, preserving the `httpOnly` cookie securely.

## Media Uploads (Next.js Proxy)
For file uploads, Next.js Server Actions have limitations with raw multipart data forwarding. Therefore, we use a Next.js API Route Proxy at `frontend/app/api/media/upload/route.ts`.
1. User selects a file in the browser and clicks upload.
2. The browser sends the file to the Next.js server (`/api/media/upload`).
3. The Next.js proxy extracts the `auth_token` cookie and forwards the exact `multipart/form-data` payload to the backend (`POST /api/v1/admin/media/upload`).

## Public Pages & Fallbacks
Public pages (e.g., `/hizmetlerimiz`, `/odalar`, `/blog`) dynamically fetch data using Next.js Server Components.
- To prevent SEO and availability issues, these pages implement a **Graceful Fallback Strategy**.
- If the backend is down, returns a `500`, or returns an empty list, the frontend automatically falls back to rendering static placeholder content (Phase 2 designs).
- This ensures the website always remains functional and visually appealing for end-users, even during backend maintenance.
