# Ankara Pet House - Admin Panel Documentation

## Architecture

The admin panel is built using Next.js 15+ App Router and lives under the `frontend/app/admin/(protected)` route group. It interacts with the Spring Boot backend via a secure JWT authentication flow.

### Authentication Flow
1. **Login**: User submits credentials to `POST /api/v1/auth/login`.
2. **Token Storage**: The Next.js server receives the JWT and stores it in an `httpOnly` cookie (`auth_token`) via Next.js Server Actions. This prevents the token from being accessed by client-side JavaScript, mitigating XSS attacks.
3. **Protected Routes**: The `frontend/app/admin/(protected)/layout.tsx` server component checks for the existence of the `auth_token` cookie. If missing, it redirects to `/admin/login`.
4. **API Requests**: All outgoing requests to the backend from the admin panel use the `authorizedFetch` wrapper (in `frontend/lib/api/client.ts`), which automatically attaches the `Authorization: Bearer <token>` header.

### Next.js Server Actions & Data Mutation
To keep the JWT secure and unexposed to the browser:
- The `lib/api/admin.ts` file is marked with the `"use server";` directive.
- This turns all exported CRUD functions into **Server Actions**.
- Client Components (like `BlogForm`, `ServiceForm`) can import these functions directly. When called on the client, Next.js transparently makes a POST request to the Next.js server, which then calls the Java backend using the `httpOnly` cookie.

### Media Uploads (API Proxy)
Since standard Server Actions do not easily support `FormData` streams with raw `File` objects going directly to an external backend, we implemented a Next.js API Route Proxy at `frontend/app/api/media/upload/route.ts`.
- The Client Component posts the file to `/api/media/upload`.
- The Next.js API route reads the file, attaches the `auth_token` cookie from the request, and forwards the `multipart/form-data` payload to the Spring Boot backend (`POST /api/v1/admin/media/upload`).
- This keeps the JWT out of the browser while supporting large file uploads.

## Adding New Admin Pages

1. **API Wrapper**: Add your backend API calls in `lib/api/admin.ts` (they automatically become Server Actions).
2. **Route Structure**: Create a new folder under `app/admin/(protected)/new-feature/`.
3. **List View**: Create a Client Component (e.g. `NewFeatureList.tsx`) and a Server Component (`page.tsx`) that fetches the initial data and passes it to the list.
4. **Form View**: Create a Client Component form (e.g. `NewFeatureForm.tsx`) that captures user input and calls the Server Actions from `lib/api/admin.ts`.
5. **Navigation**: Add the new link to the sidebar in `app/admin/(protected)/layout.tsx`.
