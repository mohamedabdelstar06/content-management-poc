# Next.js + Directus Headless CMS POC

This is a production-ready Proof of Concept integrating a Next.js App Router frontend with a Directus headless CMS. It demonstrates clean architecture, strong typing, environment variable validation, and modern rendering patterns.

## Features
- **Next.js 15 App Router**: Modern server-first routing.
- **Directus SDK**: Strongly typed data fetching.
- **TypeScript & Zod**: Runtime environment variable validation and static typing for API responses.
- **Incremental Static Regeneration (ISR)**: Content is cached and revalidated every 60 seconds.
- **Security Headers**: Strict CSP, frame options, and nosniff headers configured.

## Prerequisites

1. Node.js 18+ and `pnpm` installed.
2. A Directus instance running (local or remote).

## Directus Setup

Before running this app, ensure your Directus instance has the following collections with the exact fields below:

### 1. `news`
- **Fields:**
  - `title` (String, Required)
  - `slug` (String, Required)
  - `summary` (Text)
  - `content` (WYSIWYG)
  - `cover_image` (Image)
  - `published_date` (Datetime)
  - `status` (String: 'published', 'draft', 'archived')

### 2. `events`
- **Fields:**
  - `title` (String, Required)
  - `slug` (String, Required)
  - `description` (WYSIWYG)
  - `event_date` (Datetime)
  - `location` (String)
  - `cover_image` (Image)
  - `status` (String: 'published', 'draft', 'archived')

### 3. `team_members`
- **Fields:**
  - `full_name` (String, Required)
  - `role` (String)
  - `bio` (Text)
  - `photo` (Image)
  - `linkedin_url` (String)
  - `status` (String: 'published', 'draft', 'archived')

### Permissions
Ensure the **Public** role in Directus has read permissions for these three collections, OR provide a `DIRECTUS_STATIC_TOKEN` in the `.env.local` file that corresponds to a user/role with read permissions.

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   pnpm install
   ```

2. Copy the `.env.example` to `.env.local` and configure your Directus URL:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This application is ready to be deployed to Vercel:
1. Push the code to a Git repository.
2. Import the project in Vercel.
3. Set the `NEXT_PUBLIC_DIRECTUS_URL` and `DIRECTUS_STATIC_TOKEN` (if used) environment variables in the Vercel dashboard.
4. Deploy.

The build process will type-check the code, lint it, and generate static pages for the dynamic routes using ISR.
