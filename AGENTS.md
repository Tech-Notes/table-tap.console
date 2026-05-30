# AGENTS.md

This file helps coding agents work safely and productively in `table-tap.console`.

## Goal Of This Repository

This is the staff-facing TableTap console built with Next.js. It handles authentication, console navigation, CRUD-style data screens, and proxied communication with the backend API.

## Stack Summary

- Next.js 15 App Router
- React 19
- TypeScript `strict`
- Tailwind CSS 4
- TanStack Query
- NextAuth credentials provider
- shadcn/ui-style component organization

## Important Runtime Facts

- Browser requests should normally go through `/api/*`, not directly to the backend.
- `src/middleware.ts` rewrites most `/api/*` traffic to `src/app/api/proxy/route.ts`.
- The proxy adds `X-HMAC-SIGNATURE` and `X-USER-EMAIL` headers before forwarding to `API_BASE`.
- Server-side data access should use `serverFn(...)`.
- Client-side data access should use `clientFn(...)`.
- HMAC signing depends on `SECRET_API_KEY`.
- Auth is handled with `next-auth` credentials flow in `src/app/api/auth/[...nextauth]/authOptions.ts`.

## Required Environment

Directly referenced in the code:

```bash
API_BASE=
SECRET_API_KEY=
```

Usually required for NextAuth environments as well:

```bash
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## Directory Guide

```text
src/app/(auth)           Authentication pages
src/app/(console)        Authenticated console routes
src/app/api/auth         NextAuth route handlers
src/app/api/proxy        Backend proxy endpoint
src/app/api/notifications/ws
                         Websocket auth/bootstrap endpoint
src/api                  API helper functions by resource
src/components           Shared and feature UI
src/types                API contracts and shared types
src/base.ts              Shared fetch wrapper
src/clientFn.ts          Browser-side API wrapper
src/serverFn.ts          Server-side API wrapper
```

## Safe Change Patterns

- Add new backend-backed features by:
  1. Adding or extending a helper in `src/api/`
  2. Reusing `clientFn(...)` or `serverFn(...)`
  3. Updating `src/types/` when backend contracts change
  4. Rendering the feature in the relevant route under `src/app/(console)/`

- Add shared UI primitives under `src/components/ui/` only when they are truly reusable.
- Add feature-specific components close to the route when reuse is limited.

## Things To Preserve

- Keep the `/api` rewrite behavior intact unless the task explicitly changes transport architecture.
- Do not bypass HMAC signing for backend requests.
- Do not move auth pages or rewrite sign-in URLs casually; they are coupled to NextAuth and middleware behavior.
- Keep TypeScript types aligned with backend payloads.
- Prefer the existing `@/` import alias.

## Validation Checklist

Before finishing a change, try to run:

```bash
yarn lint
```

If the change affects routing, auth, proxying, or request payloads, also sanity-check:

- sign-in flow still resolves correctly
- `/dashboard` remains the authenticated landing route
- `/api/*` requests still pass through the proxy as expected
- websocket auth bootstrap route still returns email and signature

## Known Gaps

- There is no dedicated automated test suite in this repository yet.
- README was originally minimal; check both docs and code before making assumptions.
- Some UX and product areas are still under active development.

## Recommended Agent Workflow

1. Read `README.md` and the target feature files first.
2. Inspect existing route, component, and API helper patterns before adding new abstractions.
3. Prefer small targeted edits over broad refactors unless the user asks for structural cleanup.
4. Run `yarn lint` after doc or code changes when possible.
5. If a change touches auth, middleware, or proxy behavior, call that out explicitly in the final summary.
