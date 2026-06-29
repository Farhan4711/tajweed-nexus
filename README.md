# Q.LMS — Online Quran Teaching Platform

![Q.LMS](https://img.shields.io/badge/Status-Under%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)

A full-stack, production-ready online Quran teaching platform featuring a public marketing website and four role-based management portals (Super Admin, Institute Admin, Teacher, and Student).

## Architecture

This project is built as a **Turborepo Monorepo**:

- **`apps/web`**: Next.js 14 App Router application containing both the `(public)` marketing site and `(portal)` dashboard routes.
- **`packages/db`**: Database layer using PostgreSQL 16 and Prisma ORM.
- **`packages/types`**: Shared TypeScript definitions (roles, enums, grading systems).
- **`packages/ui`**: Shared UI components built with Tailwind CSS and shadcn/ui.
- **`packages/config`**: Shared configuration for ESLint, Prettier, and TypeScript.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for local database & Redis)
- [Git](https://git-scm.com/)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Farhan4711/tajweed-nexus.git
   cd tajweed-nexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   *Edit `.env.local` to add any necessary API keys (Stripe, Daily.co, Resend, etc. will be needed in later phases).*

4. **Start the database services**
   ```bash
   docker compose up -d
   ```

5. **Initialize the database**
   ```bash
   npm run db:push
   npm run db:generate
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Development Roadmap & Progress

The project is being implemented in 5 distinct phases:

### Phase 1: Foundation (Completed)
- [x] Monorepo scaffolding (Turborepo, Next.js, ESLint, Prettier)
- [x] Database schema & Prisma setup (16 models, enums)
- [x] Seed data generation script
- [x] Authentication System (NextAuth.js, RBAC)
- [x] tRPC API Layer setup
- [x] Design System & Shared Components (Tailwind, shadcn/ui)

### Phase 2: Public Website (Completed)
- [x] Home Page
- [x] Courses Listing & Detail Pages
- [x] Teachers Listing & Profile Pages
- [x] Blog System
- [x] About, Pricing, & Contact Pages

### Phase 3: Core Platform Services
- [ ] File Upload System (Cloudflare R2 / AWS S3)
- [ ] Video Integration (Daily.co)
- [ ] Scheduling & Calendar System
- [ ] Payment Integration (Stripe)
- [ ] Notification System (Resend)
- [ ] Evaluation & Grading Engine

### Phase 4: Management Portals
- [ ] Super Admin Dashboard
- [ ] Institute Admin Dashboard
- [ ] Teacher Portal
- [ ] Student Portal

### Phase 5: Polish & Launch
- [ ] SEO & Sitemap Optimization
- [ ] Performance Optimization (Lighthouse 90+)
- [ ] Security Hardening
- [ ] Monitoring & Error Tracking
- [ ] Full-text Search (Meilisearch)
- [ ] Deployment Pipeline

---

*This README will be continuously updated as development progresses through the phases.*
