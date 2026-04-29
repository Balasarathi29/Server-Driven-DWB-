# Complete Project Documentation

## 1. Project Overview

### 1.1 What this project is

This project is an AI-assisted server-driven website builder focused on university and institution websites.

It has two applications:

- Frontend app: server-driven-ui (Next.js + React)
- Backend API: sdui-backend (Node.js + Express + TypeScript)

It also uses supporting services:

- MongoDB for main data storage
- Redis for caching and performance helpers
- Cloudinary for media storage
- AI providers (Anthropic, OpenAI, Groq) for AI generation and assistant features

### 1.2 Main idea (server-driven UI)

Traditional web apps keep page UI fixed in frontend code.

This project stores page structure/content in the backend database and renders it dynamically in the frontend.

That means:

- Content teams can create/update pages from a dashboard
- Published pages can change without rebuilding frontend code
- AI can generate blocks or full HTML pages and save them as page content

### 1.3 Who can use this system

- Super Admin: full access to advanced controls and AI usage summary
- Admin: manage settings, content, and performance tools
- Editor: create/update pages and media
- Viewer: view dashboards/content with limited actions
- Public user: can access published pages and public forms

## 2. High-Level Architecture

### 2.1 System architecture summary

1. User uses frontend pages (public or authenticated dashboard)
2. Frontend calls backend API endpoints
3. Backend validates request and checks auth/role
4. Backend reads/writes MongoDB
5. Optional Redis and Cloudinary integrations are used
6. Backend returns data
7. Frontend renders either block-based UI (Craft.js JSON) or full HTML mode

### 2.2 Runtime architecture diagram

flowchart TD
U[User Browser] --> F[Next.js Frontend\nserver-driven-ui]
F -->|REST API| B[Express Backend\nsdui-backend]
B --> M[(MongoDB)]
B --> R[(Redis)]
B --> C[(Cloudinary)]
B --> A1[Anthropic API]
B --> A2[OpenAI API]
B --> A3[Groq API]

### 2.3 Deployment architecture (Docker Compose)

Services defined in docker-compose.prod.yml:

- mongo (MongoDB 7)
- redis (Redis 7 alpine)
- backend (Node 20 multi-stage image)
- frontend (Node 20 multi-stage image)

Ports:

- Frontend: 3000
- Backend: 5001
- MongoDB: 27017
- Redis: 6379

## 3. Technology Stack and Tools

### 3.1 Frontend technologies

- Next.js (App Router)
- React 19
- TypeScript
- Craft.js (visual block editor)
- Tailwind CSS
- Axios
- Sonner (toasts)
- Lucide icons
- Framer Motion (animations)

### 3.2 Backend technologies

- Node.js 20+
- Express
- TypeScript
- Mongoose
- ioredis
- Multer (uploads)
- Helmet, CORS, Compression
- express-validator
- express-rate-limit
- JWT auth
- Winston + Morgan logging

### 3.3 AI and content technologies

- Anthropic SDK
- OpenAI SDK
- Groq via OpenAI-compatible API
- AI command parsing and generation service

### 3.4 DevOps and operations tools

- Docker / Docker Compose
- GitHub Actions CI (described in DEPLOYMENT.md)
- Multi-stage Dockerfiles for frontend and backend

## 4. Repository Structure and Responsibilities

Root folders/files:

- DEPLOYMENT.md: production deployment notes
- docker-compose.prod.yml: production-like local orchestration
- sdui-backend: backend API project
- server-driven-ui: frontend Next.js project

### 4.1 Backend structure (sdui-backend)

- src/server.ts: app bootstrap, middleware, route mounting, startup lifecycle
- src/config: env, database, redis, cloudinary configs
- src/routes: API route definitions and validation
- src/controllers: HTTP layer and request handling
- src/services: business logic and integrations (AI, pages, media, etc.)
- src/models: Mongoose schemas
- src/middleware: auth, role checks, rate limit, error, validation
- src/scripts/seed.ts: seed data script
- scripts/free-port.js: frees backend dev port before start

### 4.2 Frontend structure (server-driven-ui)

- app: Next.js routes (public pages + dashboard pages)
- app/[slug]: dynamic published page route
- app/edit/[slug]: page editor route
- app/dashboard: admin/editor workspace
- components/editor: visual editor tools and panels
- components/renderer: runtime rendering components
- components/builder-components: reusable page blocks
- lib/api: all frontend API clients
- lib/context/AuthContext.tsx: auth state provider
- scripts/dev.js: frontend dev startup helper for stale lock/process cleanup

## 5. Backend Deep Dive

### 5.1 Startup flow

The backend startup sequence in src/server.ts:

1. Load env config
2. Initialize middleware (helmet, compression, cors, json parser, metrics)
3. Configure logging (development or combined)
4. Register health endpoint
5. Register API route groups
6. Register 404 and global error handler
7. Connect MongoDB
8. Optionally connect Redis if REDIS_URL exists
9. Optionally configure Cloudinary when keys exist
10. Start HTTP server

### 5.2 Environment configuration

Core required env values:

- MONGODB_URI
- JWT_SECRET
- JWT_REFRESH_SECRET

Optional AI keys (at least one recommended):

- ANTHROPIC_API_KEY
- OPENAI_API_KEY
- GROQ_API_KEY

Other important env values:

- PORT
- NODE_ENV
- REDIS_URL
- ALLOWED_ORIGINS
- CLOUDINARY\_\* values

### 5.3 Security model

Security layers used:

- Helmet headers
- CORS allow-list via ALLOWED_ORIGINS
- JWT authentication middleware
- RBAC authorization middleware
- Input validation using express-validator
- Rate limiting with endpoint-specific strategies
- Centralized error responses

Rate limit profiles:

- General API limiter: 100 requests per minute
- Auth limiter: strict login/register protection
- AI limiter: 30 AI requests per hour

### 5.4 Authentication and authorization

Auth flow:

1. User login/register via /api/auth
2. Backend issues access token + refresh token
3. Frontend stores tokens in localStorage
4. Access token sent in Authorization header
5. On token expiry, frontend interceptor calls /api/auth/refresh
6. New access token replaces old token

Role checks:

- authenticate middleware validates Bearer token
- authorize middleware checks role requirements per route

### 5.5 Backend route modules

Major route groups mounted in src/server.ts:

- /api/auth
- /api/pages
- /api/ai
- /api/media
- /api/templates
- /api/versions
- /api/settings
- /api/system
- /api/public (no auth required)

### 5.6 API endpoint coverage by domain

Auth domain:

- Register institution
- Login
- Refresh token
- Get current user
- Create user (super-admin)

Pages domain:

- CRUD pages
- Publish/unpublish
- Schedule publish/unpublish
- Duplicate page
- Batch operations
- Save page as template
- Get published page by slug

AI domain:

- Natural-language command processing
- Content generation
- Suggestions and validation
- Generate/modify full HTML page
- Plan full site pages from prompt
- Chat with memory (threads)
- Compliance validation/report/audit trail
- Usage summary (super-admin)
- Image generation
- JSX execution endpoint

Media domain:

- File upload with mime/type checks
- Query/filter media
- Folder create/rename/delete
- Bulk media operations
- Usage analytics
- Metadata updates and deletion

Templates domain:

- Public template listing/search/trending/top-rated
- User templates
- Template CRUD
- Duplicate/apply template
- Ratings and shares
- Shared-template by share code
- Template analytics

Version domain:

- Version history by page
- Specific version by number
- Restore version

Settings domain:

- Get institution settings
- Update settings with validation

System domain:

- Performance metrics (admin roles)

Public domain:

- Public health
- Institution list
- Public settings
- Published pages listing/by slug
- Public form submission and delivery testing

### 5.7 Data models (major entities)

Important backend entities include:

- Institution
- User
- Page
- Version
- Template
- TemplateRating
- TemplateShare
- TemplateAnalytics
- Media
- MediaFolder
- FormSubmission
- AIConversation
- AIUsage
- ComplianceAudit
- CustomComponent

These models together support:

- Multi-institution architecture
- Role-based users
- Versioned page management
- Template marketplace and analytics
- Media management
- AI interaction history and usage tracking

### 5.8 AI service behavior

Key backend AI behavior from ai.service.ts:

- Supports multiple providers (Anthropic, OpenAI, Groq)
- Selects providers/models based on configuration and request
- Handles structured command processing into operations
- Supports full-page HTML generation workflows
- Stores conversation history and audit-like AI records

Practical outcome:

- If one provider is missing, others can still power AI features
- AI features can degrade gracefully when no AI key is configured

## 6. Frontend Deep Dive

### 6.1 Frontend app route map

Main routes include:

- /: marketing/public homepage
- /login
- /register
- /dashboard
- /dashboard/templates
- /dashboard/media
- /dashboard/settings
- /dashboard/compliance
- /dashboard/performance
- /edit/[slug]: editor for content creation
- /[slug]: dynamic published page renderer

### 6.2 Layout and global providers

Root layout includes:

- AuthProvider for auth context
- React warning filter component
- Google Analytics loader
- Toast notifications

### 6.3 API client and token refresh behavior

Frontend uses lib/api/client.ts with Axios interceptors:

- Request interceptor adds access token to protected requests
- Response interceptor catches 401
- Automatically calls refresh endpoint using refresh token
- Retries original request with new access token
- Redirects to login if refresh fails

### 6.4 Public page rendering model

Route app/[slug]/page.tsx does server metadata generation based on fetched SEO data.

Client renderer app/[slug]/PageClient.tsx handles:

- Public fetch first via public endpoint
- Falls back to private preview for authorized roles
- Two rendering modes:
  - HTML mode: renders full-page AI HTML using SafeHTMLRenderer
  - Block mode: renders Craft.js JSON structure with ComponentMapper

### 6.5 Visual editor workflow

Route app/edit/[slug]/page.tsx is the editing interface.

Editor architecture:

- Craft.js Editor + Frame + Element root container
- Component library and property panel
- RenderNode custom rendering
- AI chat assist (dynamic import)
- Device preview modes (desktop/tablet/mobile)

Key editor capabilities:

- Build and modify block-based pages
- Convert and render AI-generated HTML in safe mode
- Sanitize invalid component types
- Auto-save logic based on page mode

### 6.6 Dashboard workflow highlights

Dashboard supports complete authoring lifecycle:

- View pages and project status
- Generate full-site plans from AI prompt
- Create DB pages in batch
- Generate HTML page-by-page using AI
- Update page content and publish workflow
- Access compliance and performance sections

## 7. End-to-End Workflows

### 7.1 Workflow A: New institution onboarding

1. Register institution through auth endpoint
2. System creates institution + initial user context
3. User logs in and gets JWT tokens
4. User enters dashboard to create pages/templates/media

### 7.2 Workflow B: Create and publish a block-based page

1. Editor creates page record with slug
2. User designs page via Craft.js blocks
3. Page JSON config saved via pages update endpoint
4. User publishes page
5. Public route /[slug] renders JSON with ComponentMapper

### 7.3 Workflow C: AI full HTML page generation

1. User sends prompt in dashboard/editor
2. Frontend calls AI planning or generate-html endpoint
3. Backend AI service generates HTML
4. Frontend saves htmlContent and useHtml flag on page
5. Public route renders full HTML through SafeHTMLRenderer

### 7.4 Workflow D: Multi-page AI full-site build

1. User provides site-level prompt
2. Backend returns planned pages (name/slug/purpose)
3. Frontend creates all pages first
4. Frontend loops each page and requests HTML generation
5. Results are saved to each page and shown in completion state

### 7.5 Workflow E: Token lifecycle on protected APIs

1. Frontend sends access token with API request
2. If access token expired, backend returns 401
3. Axios interceptor calls refresh endpoint
4. New token stored and request retried
5. If refresh fails, user session ends and redirects to login

### 7.6 Workflow F: Media management

1. Authenticated editor uploads media
2. Backend validates type/size
3. Media stored with metadata and categorization
4. Users can filter/search/tag/move media
5. Bulk operations support cleanup and organization

## 8. Development Setup (Local)

### 8.1 Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm
- MongoDB (local or Atlas)
- Redis (optional but recommended)
- Cloudinary account (optional for uploads)
- At least one AI provider key (optional but needed for AI features)

### 8.2 Backend local run

1. Go to sdui-backend folder
2. Install dependencies
3. Create .env from example and fill values
4. Start development server

Notes:

- Backend dev script first frees port 5001
- Then starts nodemon with ts-node

### 8.3 Frontend local run

1. Go to server-driven-ui folder
2. Install dependencies
3. Configure NEXT_PUBLIC_API_URL to backend API
4. Start development server

Notes:

- Frontend dev script removes stale Next lock and stale process on Windows

### 8.4 Seed script (optional)

Backend includes src/scripts/seed.ts to create demo institution/users.

Default sample users in seed:

- admin@gmail.com (super-admin)
- user@gmail.com (viewer)

## 9. Docker and Production Deployment

### 9.1 Compose-based deployment

Root command (from project root):

docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build

Stop command:

docker compose --env-file .env.prod -f docker-compose.prod.yml down

### 9.2 Container build strategy

Both apps use multi-stage Dockerfiles:

- Stage 1 dependencies
- Stage 2 build
- Stage 3 production runner with only runtime dependencies

Benefits:

- Smaller production images
- Cleaner separation of build vs runtime
- More secure/runtime-efficient containers

### 9.3 Production hardening recommendations

- Add reverse proxy and TLS (Nginx/Caddy)
- Use managed secret store for JWT/API keys
- Restrict CORS to real domains
- Add backup strategy for MongoDB
- Add image scanning and deployment stage in CI/CD

## 10. Configuration Reference

### 10.1 Backend env checklist

- PORT
- NODE_ENV
- MONGODB_URI
- REDIS_URL
- ALLOWED_ORIGINS
- JWT_SECRET
- JWT_REFRESH_SECRET
- JWT_EXPIRES_IN
- JWT_REFRESH_EXPIRES_IN
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- ANTHROPIC_API_KEY
- OPENAI_API_KEY
- GROQ_API_KEY

### 10.2 Frontend env checklist

- NEXT_PUBLIC_API_URL (for example http://localhost:5001/api)

## 11. Observability, Logging, and Health

### 11.1 Health endpoints

Backend health endpoints:

- /health
- /api/public/health

### 11.2 Logging

- Morgan request logging for HTTP logs
- Winston utility logger for structured backend logs
- Environment-specific log format (dev vs combined)

### 11.3 Metrics and performance

- metricsMiddleware applied globally
- System performance endpoint available for admin roles
- AI usage summary endpoint for super-admin role

## 12. Security and Compliance Notes

### 12.1 Security controls implemented

- JWT access + refresh token model
- Role-based authorization on protected routes
- Validation on route input fields
- Rate limits on auth, API, and AI endpoints
- Content security helpers (helmet, cors)

### 12.2 Compliance support

AI compliance-related endpoints support checks and reporting for:

- AICTE
- UGC
- WCAG
- SEO

This enables quality and regulatory checks before publish.

## 13. Known Design Patterns in This Project

### 13.1 Server-driven page delivery

- Page content lives in backend model
- Frontend route dynamically renders based on slug
- No frontend rebuild needed for content changes

### 13.2 Dual content mode

Each page can exist as:

- Craft.js block JSON mode
- Full AI-generated HTML mode

This gives flexibility for both structured editing and fast AI generation.

### 13.3 Graceful optional integrations

Backend startup treats Redis and Cloudinary as optional when unconfigured, allowing MVP/local development to continue.

## 14. How a New Developer Can Learn This Project Step-by-Step

### Step 1: Understand business goal

Read this document section 1 and section 2.

### Step 2: Run the project locally

Set up backend then frontend using section 8.

### Step 3: Learn backend request path

Follow in this order:

- src/server.ts
- One route file (for example src/routes/page.routes.ts)
- Matching controller
- Matching service
- Matching model

### Step 4: Learn frontend rendering path

Follow in this order:

- app/[slug]/page.tsx
- app/[slug]/PageClient.tsx
- components/renderer/ComponentMapper
- one builder component

### Step 5: Learn editor and AI flow

Follow in this order:

- app/edit/[slug]/page.tsx
- components/editor modules
- lib/api/ai.api.ts
- backend src/routes/ai.routes.ts and src/services/ai.service.ts

### Step 6: Learn deployment

Read:

- docker-compose.prod.yml
- backend and frontend Dockerfiles
- DEPLOYMENT.md

## 15. Quick Troubleshooting Guide

### Problem: Backend fails to start with Mongo error

Checks:

- Verify MONGODB_URI value
- Confirm Atlas IP whitelist
- Confirm cluster is running
- Check network/firewall

### Problem: AI features not working

Checks:

- Ensure one AI key is configured
- Verify provider quota/credits
- Check backend logs for provider errors

### Problem: User gets logged out repeatedly

Checks:

- Verify JWT and refresh secrets are set and stable
- Ensure frontend can reach /api/auth/refresh
- Check token expiry values

### Problem: Media upload fails

Checks:

- File type is in allowed MIME list
- File size is under 10MB
- Cloudinary credentials configured (if required by flow)

### Problem: Public page does not render

Checks:

- Page is published
- Slug is correct
- Institution scoping is correct
- Page has either valid jsonConfig or htmlContent

## 16. Feature Checklist Covered by This Documentation

This document explains:

- Product goal and architecture
- Full stack technologies and tools
- Folder-level project structure
- Backend startup/security/auth patterns
- API domains and major endpoints
- Frontend route and rendering model
- Editor and AI generation workflows
- Data model responsibilities
- Local development setup
- Docker/deployment strategy
- Logging, health, metrics, and troubleshooting
- Beginner learning path to understand complete project

## 17. Recommended Next Documentation Files (Optional)

For even stronger maintainability, you can later add:

- API_REFERENCE.md with full request/response examples per endpoint
- DATA_MODEL_GUIDE.md with each schema fields and relationships
- CONTRIBUTING.md with coding standards and PR checklist
- INCIDENT_RUNBOOK.md for production operations

---

If you are a new developer and follow this documentation in sequence, you can understand how the complete system is built, how each major component works, and how to run, extend, and deploy this project safely.

## 18. API Quick Examples (Copyable)

Auth - Login (cURL):

```bash
curl -X POST "http://localhost:5001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"password123"}'
```

Get published page by slug (public):

```bash
curl "http://localhost:5001/api/public/pages/home"
```

Create page (authenticated):

```bash
curl -X POST "http://localhost:5001/api/pages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{"name":"About","slug":"about","useHtml":false}'
```

Generate page HTML using AI (authenticated):

```bash
curl -X POST "http://localhost:5001/api/ai/generate-html" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{"prompt":"Create a homepage for a small college","currentSlug":"home"}'
```

## 19. Sample .env (example values)

Create `.env` in `sdui-backend` (example):

```
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sdui
REDIS_URL=redis://localhost:6379
ALLOWED_ORIGINS=http://localhost:3000
JWT_SECRET=replace_with_strong_secret
JWT_REFRESH_SECRET=replace_with_strong_refresh_secret
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 20. Data Model Samples

Below are simplified samples to help learning (not exact Mongoose schemas but reflective):

- `User` (important fields):

```
{
  _id: ObjectId,
  institutionId: ObjectId,
  name: string,
  email: string,
  passwordHash: string,
  role: 'super-admin'|'admin'|'editor'|'viewer',
  isActive: boolean
}
```

- `Page` (important fields):

```
{
  _id: ObjectId,
  institutionId: ObjectId,
  name: string,
  slug: string,
  jsonConfig: object | null,
  useHtml: boolean,
  htmlContent: string | null,
  published: boolean,
  versions: [{ versionNumber, jsonConfig, htmlContent, createdAt }]
}
```

## 21. Useful Commands (copy-paste)

Backend dev (from repo root):

```bash
cd sdui-backend
npm install
cp .env.example .env
npm run dev
```

Frontend dev (from repo root):

```bash
cd server-driven-ui
npm install
export NEXT_PUBLIC_API_URL=http://localhost:5001/api
npm run dev
```

(On Windows use `set` instead of `export`.)

## 22. Contribution Guide (quick)

- Fork repo, create feature branch `feature/describe-thing`.
- Run unit tests if present; follow TS linting rules.
- Add tests for backend controllers when changing endpoints.
- Open PR and request review; include screenshots for UI changes.

## 23. Glossary

- Server-driven UI: UI where page structure is stored server-side and interpreted by the frontend.
- Craft.js: visual page builder framework used for block editing.
- useHtml flag: when true, page renders raw HTML saved in `htmlContent`.

## 24. FAQ (short)

Q: Can I host frontend separately (Vercel)?

A: Yes — ensure `NEXT_PUBLIC_API_URL` points to the backend and CORS is configured.

Q: What if AI provider costs are high?

A: Add usage caps, test with smaller models, or disable AI features by unsetting AI keys.

---

If you'd like, I can now generate a polished PDF of this expanded document and attach it here.  
The PDF file will be created as `PROJECT_DOCUMENTATION.pdf` at the repository root.
