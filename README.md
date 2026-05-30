# TableTap Console

TableTap Console is the internal dashboard for the TableTap restaurant ordering platform. It is used by admins and kitchen staff to manage tables, menu items, and live order flow.

This repository contains the Next.js console application. The backend API lives in the separate [`table-tap.api`](https://github.com/Tech-Notes/table-tap.api) repository.

## What This App Does

- Authenticates staff with `next-auth`
- Displays dashboard, tables, menu items, and orders views
- Proxies authenticated requests from the browser to the backend API
- Signs server-side API requests with HMAC headers
- Exposes a small auth helper endpoint for notification websocket setup

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript with `strict` mode
- Tailwind CSS 4
- shadcn/ui-style component structure
- TanStack Query
- NextAuth credentials provider

## Project Structure

```text
src/
  app/
    (auth)/              Sign-in flow
    (console)/           Main authenticated console routes
    api/
      auth/              NextAuth handlers
      notifications/ws/  Websocket auth bootstrap endpoint
      proxy/             Request proxy to the backend API
  api/                   Typed API helper functions
  components/            Shared UI and feature components
  hooks/                 Client hooks
  lib/                   Shared utilities
  types/                 App and API types
  base.ts                Shared fetch wrapper
  clientFn.ts            Browser API wrapper via /api proxy
  serverFn.ts            Server API wrapper via API_BASE
  hmacSignature.ts       HMAC signing helper
  middleware.ts          Auth guard and API rewrite behavior
```

## Request Flow

For browser-driven data fetching:

1. Client code calls a function built with `clientFn(...)`.
2. The request hits `/api/*` in this Next.js app.
3. `middleware.ts` rewrites most `/api/*` requests to `/api/proxy`.
4. `src/app/api/proxy/route.ts` forwards the request to `API_BASE`, adds HMAC and user email headers, and returns the backend response.

For server-side fetching:

1. Server components or server actions use `serverFn(...)`.
2. The helper calls `API_BASE` directly.
3. It signs the request with `SECRET_API_KEY` and includes the current session email.

## Environment Variables

The codebase directly depends on these variables:

```bash
API_BASE=http://localhost:8080
SECRET_API_KEY=replace-me
```

You will also typically need standard NextAuth configuration in local and deployed environments:

```bash
NEXTAUTH_SECRET=replace-me
NEXTAUTH_URL=http://localhost:3000
```

See [`.env.example`](./.env.example) for a starter template.

## Local Development

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

The app runs on [http://localhost:3000](http://localhost:3000) by default.

## Available Scripts

```bash
yarn dev
yarn build
yarn start
yarn lint
```

## Conventions

- Use the `@/` path alias for imports from `src`
- Keep route UI under `src/app/...` and API helpers under `src/api/...`
- Reuse the shared `fetchJSON`, `clientFn`, and `serverFn` helpers instead of rolling custom request logic
- Keep backend contract types in `src/types`
- Prefer feature-specific components near the route that uses them

## Current Product Scope

- Dashboard
- Tables management
- Orders management
- Menu items management
- Notification plumbing for live updates

## Planned / In-Progress Areas

- User and role management
- Reporting views
- Print workflows
- Excel import/export flows

## Working With AI Agents

If you are using Codex or another coding agent in this repository, start with [AGENTS.md](./AGENTS.md). It documents the architecture, safe edit zones, validation steps, and repository-specific expectations for agent-driven changes.
