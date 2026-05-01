# Server-Driven UI - AI-Assisted Website Builder

A modern, AI-powered website builder designed specifically for universities and institutions. Build dynamic, content-rich websites without coding using our server-driven architecture with visual block editor and AI-assisted page generation.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Overview

Server-Driven UI is a full-stack website builder that separates page content and structure from frontend code. This allows content teams to create, update, and manage institutional websites through an intuitive dashboard without requiring code changes or redeployment.

### Key Concept: Server-Driven Architecture

Instead of storing UI in frontend code, page structure and content are stored in MongoDB and rendered dynamically:

- 📝 **Content Management**: Create/edit pages from dashboard
- 🚀 **No Code Deployments**: Update pages instantly without rebuilds
- 🤖 **AI Generation**: Auto-generate blocks or complete HTML pages
- 👥 **Role-Based Access**: Super Admin, Admin, Editor, Viewer, Public User roles
- 📊 **Analytics & Compliance**: Track template usage and audit events
- 🎨 **Visual Editor**: Drag-and-drop block editor with Craft.js

## ✨ Features

### Core Features

- ✅ **Drag-and-Drop Editor**: Visual block editor for creating pages
- ✅ **Pre-built Components**: Rectangle, Circle, Text, Image, Video, Forms, Cards, Sections, Hero Banners, and more
- ✅ **Template System**: Create, share, and reuse page templates
- ✅ **AI Assistance**:
  - Generate page content from prompts
  - Create components via natural language
  - Generate complete HTML pages
  - AI-powered block suggestions

### Dashboard Features

- 📊 **Performance Analytics**: Track page views and template usage
- 📋 **Template Management**: Browse, rate, share, and analyze templates
- 🎬 **Media Library**: Upload, organize, and manage media with Cloudinary
- ⚙️ **Settings Management**: Configure institutions and branding
- 📜 **Compliance Auditing**: Track AI usage and system activities
- 🔐 **Access Control**: Role-based permissions and organization scoping

### Advanced Features

- 🔒 **Rate Limiting**: Protect API endpoints
- ♻️ **Redis Caching**: High-performance data caching
- 🔑 **JWT Authentication**: Secure token-based auth
- 📧 **Email Notifications**: System and AI feature alerts
- 🎯 **Custom Components**: Define institution-specific components
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                             │
├─────────────────────────────────────────────────────────────┤
│ Next.js Frontend (server-driven-ui)                         │
│ - React 19 + TypeScript                                     │
│ - Craft.js Visual Editor                                    │
│ - Dashboard & Public Pages                                  │
├─────────────────────────────────────────────────────────────┤
│ Express Backend (sdui-backend)                              │
│ - TypeScript + Node.js                                      │
│ - REST API Endpoints                                        │
│ - Authentication & Authorization                            │
├─────────────────────────────────────────────────────────────┤
│ Supporting Services                                         │
│ - MongoDB (Data)                                            │
│ - Redis (Caching)                                           │
│ - Cloudinary (Media Storage)                                │
│ - AI APIs (Anthropic, OpenAI, Groq)                        │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend

- **Next.js 16** - Modern React framework with App Router
- **React 19** - Latest UI library
- **TypeScript** - Type-safe development
- **Craft.js** - Visual page editor framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Beautiful icon library
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation

#### Backend

- **Node.js 20+** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Cloudinary SDK** - Media management
- **Anthropic/OpenAI SDK** - AI integrations
- **Redis** - Caching layer

#### Database & Services

- **MongoDB 7** - NoSQL database
- **Redis 7** - In-memory cache
- **Cloudinary** - Media hosting
- **AI Providers**: Anthropic, OpenAI, Groq

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20 or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control
- **Docker** & **Docker Compose**: For containerized deployment (optional)

### Required Accounts & Credentials

- **MongoDB**: Atlas cluster or local instance
- **Redis**: Atlas or local instance
- **Cloudinary**: For media storage
- **AI API Keys**:
  - Anthropic API key (optional)
  - OpenAI API key (optional)
  - Groq API key (optional)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/server-driven-ui.git
cd "Final Version"
```

### 2. Install Dependencies

#### Frontend

```bash
cd server-driven-ui
npm install
```

#### Backend

```bash
cd ../sdui-backend
npm install
```

### 3. Configure Environment Variables

#### Backend (.env in `sdui-backend/`)

```env
# Server
NODE_ENV=development
PORT=5001
CORS_ORIGIN=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/sdui
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=24h

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Providers (choose at least one)
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

# Logging
LOG_LEVEL=debug
```

#### Frontend (.env.local in `server-driven-ui/`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id (optional)
```

### 4. Start Services

#### Option A: Local Development

```bash
# Terminal 1: Start MongoDB (if local)
mongod

# Terminal 2: Start Redis (if local)
redis-server

# Terminal 3: Start Backend
cd sdui-backend
npm run dev

# Terminal 4: Start Frontend
cd server-driven-ui
npm run dev
```

Access the application at `http://localhost:3000`

#### Option B: Using Docker Compose

```bash
docker-compose -f docker-compose.prod.yml up -d
```

This will start:

- Frontend on `http://localhost:3000`
- Backend API on `http://localhost:5001`
- MongoDB on `localhost:27017`
- Redis on `localhost:6379`

## 📁 Project Structure

```
Final Version/
├── server-driven-ui/              # Next.js Frontend
│   ├── app/                       # App Router pages
│   │   ├── [slug]/               # Public page viewer
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── edit/                 # Page editor
│   │   ├── login/                # Authentication
│   │   └── register/             # User registration
│   ├── components/               # React components
│   │   ├── editor/               # Editor components
│   │   ├── builder-components/   # Pre-built blocks
│   │   ├── renderer/             # Page rendering
│   │   └── ui/                   # UI components
│   ├── lib/                      # Utilities & hooks
│   ├── public/                   # Static assets
│   └── package.json
│
├── sdui-backend/                  # Express Backend
│   ├── src/
│   │   ├── server.ts            # Entry point
│   │   ├── config/              # Configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Express middleware
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Utilities
│   │   └── scripts/             # Helper scripts
│   ├── dist/                    # Compiled JS
│   └── package.json
│
├── docker-compose.prod.yml        # Docker orchestration
├── PROJECT_DOCUMENTATION.md       # Detailed docs
└── README.md                      # This file
```

## 🔑 Key Components

### Frontend Components

#### Editor Components

- **EditorToolbar**: Controls for copy, paste, delete, undo/redo
- **RenderNode**: Selectable node wrapper with delete button
- **ComponentMapper**: Central registry for component resolution

#### Builder Components

- **Shapes**: Rectangle, Circle, Triangle, Ellipse, Line
- **Content**: Heading, Paragraph, TextBlock, Image, Video
- **Layout**: Container, Grid, Section, Spacer, Card
- **Special**: HeroBanner, TemplateRenderer, CustomComponent
- **Forms**: FormRenderer for dynamic form submission

#### Dashboard

- **Pages**: Create, edit, publish pages
- **Templates**: Browse, search, analyze, share templates
- **Media**: Upload and organize media files
- **Settings**: Institution and system configuration
- **Compliance**: Audit logs and AI usage tracking

### Backend Endpoints

#### Authentication

```
POST /api/auth/register       - Register new user
POST /api/auth/login          - Login user
POST /api/auth/refresh        - Refresh token
POST /api/auth/logout         - Logout user
```

#### Pages

```
GET    /api/pages             - List pages
POST   /api/pages             - Create page
GET    /api/pages/:id         - Get page
PUT    /api/pages/:id         - Update page
DELETE /api/pages/:id         - Delete page
POST   /api/pages/:id/publish - Publish page
```

#### Templates

```
GET    /api/templates         - List templates
POST   /api/templates         - Create template
GET    /api/templates/:id     - Get template
PUT    /api/templates/:id     - Update template
DELETE /api/templates/:id     - Delete template
POST   /api/templates/:id/rate - Rate template
POST   /api/templates/:id/share - Share template
```

#### AI Features

```
POST /api/ai/generate-content   - Generate page content
POST /api/ai/generate-html      - Generate HTML page
POST /api/ai/enhance-block      - Enhance block content
GET  /api/ai/usage              - Get AI usage stats
```

#### Media

```
GET    /api/media              - List media
POST   /api/media/upload       - Upload file
DELETE /api/media/:id          - Delete media
```

#### Settings

```
GET    /api/settings           - Get settings
PUT    /api/settings           - Update settings
GET    /api/institutions       - Get institutions
POST   /api/institutions       - Create institution
```

## 🔐 Authentication & Authorization

### User Roles

| Role            | Permissions                                        |
| --------------- | -------------------------------------------------- |
| **Super Admin** | Full system access, AI usage summary, all settings |
| **Admin**       | Manage content, templates, media, compliance       |
| **Editor**      | Create/edit pages, upload media, use AI            |
| **Viewer**      | View-only access to dashboards                     |
| **Public User** | Access published pages and submit forms            |

### Authentication Flow

1. User registers/logs in
2. Backend validates credentials
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. Subsequent requests include token in Authorization header
6. Backend verifies token and checks permissions

## 🚀 Deployment

### Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Deployment

#### Build Frontend

```bash
cd server-driven-ui
npm run build
npm start
```

#### Build Backend

```bash
cd sdui-backend
npm run build
npm start
```

### Environment Considerations

- **Development**: Use local MongoDB/Redis
- **Staging**: Use managed services with staging databases
- **Production**: Use MongoDB Atlas, Redis Cloud, managed services
- **SSL/TLS**: Enable HTTPS in production
- **CORS**: Update allowed origins for production domain

## 📊 Database Schema Overview

### Key Collections

#### Users

```typescript
{
  _id: ObjectId;
  email: string;
  password: string(hashed);
  firstName: string;
  lastName: string;
  role: "super-admin" | "admin" | "editor" | "viewer";
  institution: ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Pages

```typescript
{
  _id: ObjectId
  title: string
  slug: string
  content: {
    blocks: Array      // Craft.js node tree
    mode: 'block' | 'html'
    html: string       // For HTML mode
  }
  template: ObjectId
  status: 'draft' | 'published'
  seoMetadata: {
    description: string
    keywords: string[]
  }
  createdBy: ObjectId
  institution: ObjectId
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}
```

#### Templates

```typescript
{
  _id: ObjectId
  name: string
  description: string
  thumbnail: string
  content: {
    blocks: Array
  }
  category: string
  tags: string[]
  rating: {
    average: number
    count: number
  }
  analytics: {
    views: number
    uses: number
  }
  isPublic: boolean
  createdBy: ObjectId
  createdAt: Date
  updatedAt: Date
}
```

## 🛠️ Development

### Running Tests

```bash
# Backend tests
cd sdui-backend
npm test

# Frontend tests (if configured)
cd server-driven-ui
npm test
```

### Code Quality

```bash
# Frontend linting
cd server-driven-ui
npm run lint

# Backend linting (if configured)
cd sdui-backend
npm run lint
```

### Development Scripts

#### Frontend

```bash
npm run dev      # Start dev server with HMR
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

#### Backend

```bash
npm run dev      # Start with nodemon
npm run build    # Compile TypeScript
npm start        # Run compiled app
npm test         # Run tests
```

## 🔧 Configuration Files

### Frontend

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript config
- `tailwind.config.mjs` - Tailwind CSS
- `postcss.config.mjs` - PostCSS
- `eslint.config.mjs` - ESLint rules

### Backend

- `tsconfig.json` - TypeScript config
- `.env` - Environment variables
- `docker-compose.prod.yml` - Docker services

## 📚 API Documentation

### Request Format

All API requests should include:

- `Content-Type: application/json`
- `Authorization: Bearer <token>` (for protected routes)

### Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

### Error Handling

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Server Error

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5001
lsof -i :5001 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

#### MongoDB Connection Issues

```bash
# Test connection
mongo "mongodb://localhost:27017"

# Or with MongoDB Atlas
mongo "mongodb+srv://user:password@cluster.mongodb.net/dbname"
```

#### Redis Connection Issues

```bash
# Test connection
redis-cli ping
# Should return: PONG
```

#### Build Failures

```bash
# Clear caches
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📖 Additional Resources

- [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) - Detailed documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Craft.js Docs](https://craft.js.org/)
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Write descriptive commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For issues, questions, or suggestions:

- **Issues**: Create an issue on GitHub
- **Email**: support@example.com
- **Documentation**: See [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- Visual editing powered by [Craft.js](https://craft.js.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- AI providers: Anthropic, OpenAI, Groq

---

**Made with ❤️ for institutional website builders**

Last Updated: May 1, 2026
