# Convivia — Codebase Guide for Coding Agents

This document is written for AI coding agents and maintainers who need to modify or extend this codebase. It describes structure, conventions, and where to make changes.

---

## 1. Project Overview

**Convivia** is a coworking space platform (marketing site + member portal + admin panel). It provides:

- **Public**: Home, pricing, events listing, signup, login, terms, privacy.
- **Member portal** (`/portal/*`): Dashboard, reservations (room booking), profile, billing. Requires login; role `member` or `admin`.
- **Admin** (`/admin/*`): Members CRM, events, reservations, email campaigns, settings. Requires login and role `admin`.

Tech: **Next.js 15** (App Router), **React 19**, **TypeScript**, **Prisma** (PostgreSQL), **NextAuth v5** (Credentials), **Stripe** (checkout + billing portal + webhooks), **Tailwind CSS**.

---

## 2. Directory Structure

```
convivia/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: Nav + SessionProvider + footer
│   ├── globals.css               # Global styles
│   ├── page.tsx                  # Home (marketing)
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── pricing/page.tsx
│   ├── events/page.tsx          # Public events list
│   ├── events/[id]/page.tsx     # Single event (public)
│   ├── terms/page.tsx
│   ├── privacy/page.tsx
│   ├── portal/                   # Member area (auth required)
│   │   ├── page.tsx              # Dashboard
│   │   ├── reservations/page.tsx
│   │   ├── profile/page.tsx
│   │   └── billing/page.tsx
│   ├── admin/                    # Admin area (admin role required)
│   │   ├── page.tsx
│   │   ├── members/page.tsx
│   │   ├── members/[id]/page.tsx
│   │   ├── events/page.tsx
│   │   ├── events/new/page.tsx
│   │   ├── events/[id]/edit/page.tsx
│   │   ├── reservations/page.tsx
│   │   ├── campaigns/page.tsx
│   │   ├── campaigns/new/page.tsx
│   │   └── settings/page.tsx
│   └── api/                      # API routes
│       ├── auth/
│       │   ├── [...nextauth]/route.ts   # NextAuth handler
│       │   └── signup/route.ts          # Member signup + Stripe checkout redirect
│       ├── profile/route.ts             # GET/PATCH member profile
│       ├── reservations/route.ts        # Member: list/create reservations
│       ├── reservations/[id]/cancel/route.ts
│       ├── rooms/route.ts               # List rooms
│       ├── rooms/availability/route.ts
│       ├── rooms/[id]/availability/route.ts
│       ├── billing/portal/route.ts      # Stripe billing portal URL
│       ├── membership/pause/route.ts
│       ├── membership/cancel/route.ts
│       ├── webhooks/stripe/route.ts     # Stripe webhooks (checkout, subscription, etc.)
│       └── admin/
│           ├── members/route.ts
│           ├── members/[id]/route.ts
│           ├── events/route.ts
│           ├── events/[id]/route.ts
│           ├── reservations/route.ts
│           ├── reservations/[id]/cancel/route.ts
│           ├── campaigns/route.ts
│           └── campaigns/[id]/send/route.ts
├── components/                   # Shared React components
│   ├── Nav.tsx                   # Main nav (client: useSession, signOut)
│   ├── SessionProvider.tsx       # next-auth session wrapper
│   ├── FlashMessage.tsx
│   ├── BookingCalendar.tsx
│   └── EventForm.tsx
├── lib/                          # Shared server-side utilities
│   ├── prisma.ts                 # Singleton PrismaClient (use `db`)
│   ├── email.ts                  # sendEmail() — currently logs to email-log.txt
│   └── stripe.ts                 # Stripe client, getPriceId, createCheckoutSession, createBillingPortalSession
├── prisma/
│   ├── schema.prisma             # Data model (PostgreSQL)
│   └── seed.ts                   # Seed admin + members + rooms + sample events/reservation
├── auth.ts                       # NextAuth config + Credentials provider (uses db, bcrypt)
├── auth.config.ts                # Edge-safe config: pages, callbacks (jwt, session, authorized)
├── middleware.ts                 # Protects /portal and /admin; redirects unauthenticated / non-admin
└── next.config.js
```

---

## 3. Data Model (Prisma)

**Location**: `prisma/schema.prisma`. Database: **PostgreSQL** (`DATABASE_URL`).

| Model | Purpose |
|-------|--------|
| **User** | id, name, email, passwordHash, phone?, company?, role (`member` \| `admin`), profile?, membership?, reservations[], emailLogs[] |
| **MemberProfile** | userId (1:1), gdprConsentTimestamp, marketingOptIn |
| **Membership** | userId (1:1), tier, status, stripeCustomerId?, stripeSubscriptionId?, currentPeriodEnd? |
| **Room** | id, name, description?, active; has reservations |
| **Reservation** | roomId, userId, startDatetime, endDatetime, status (e.g. `confirmed`) |
| **Event** | title, description, startDatetime, endDatetime, location, imageUrl?, status (`draft` \| `published`) |
| **EmailCampaign** | createdById, subject, body, audienceFilter, status, sentAt? |
| **EmailLog** | type, userId?, email, subject, status |

**Conventions**: IDs are `cuid()`; use `include`/`relation` for nested reads; run `npx prisma generate` after schema changes (build script runs it).

---

## 4. Authentication and Authorization

- **Provider**: NextAuth v5, **Credentials** only. Config in `auth.ts` (uses `db` and bcrypt); edge-safe bits in `auth.config.ts`.
- **Session**: Contains `user.id`, `user.email`, `user.name`, and `(user as any).role` (`member` | `admin`). JWT stores `id` and `role`; session callback copies them to `session.user`.
- **Middleware** (`middleware.ts`): Protects `/portal/*` (any logged-in user) and `/admin/*` (must be `role === 'admin'`). Redirects to `/login` when unauthorized.
- **API routes**: Use `const session = await auth()` (from `@/auth`). Member-only: `if (!session?.user) return 401`. Admin-only: `if (!session?.user || (session.user as any).role !== 'admin') return 403`.
- **Signup**: `POST /api/auth/signup` creates User + MemberProfile + Membership (status `pending`), then returns Stripe Checkout URL; after payment, webhook sets membership to `active`.

**Where to change**: Add new protected routes in `middleware.ts` matcher and in `auth.config.ts` `authorized` if needed. Add roles by extending User.role and checks in middleware + API.

---

## 5. API Conventions

- **Handler location**: `app/api/<resource>/route.ts` for list/create; `app/api/<resource>/[id]/route.ts` for get/update/delete.
- **Dynamic params**: In Next 15, `params` is a Promise: `export async function GET(_req, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; ... }`.
- **Auth**: First line of handler: `const session = await auth()`. Then 401 for missing session, 403 for wrong role.
- **Body**: `const body = await req.json()`. Validate required fields and return 400 with `{ error: '...' }`.
- **Responses**: `NextResponse.json(data)` or `NextResponse.json({ error: '...' }, { status: 4xx })`. Use 201 for created resources.
- **DB**: Import `db` from `@/lib/prisma`. Use Prisma types; dates from JSON are passed as strings, convert with `new Date(...)`.

**Admin APIs**: Under `app/api/admin/*`. All require `(session.user as any).role === 'admin'`.

---

## 6. Key Flows

- **Signup**: Signup form → `POST /api/auth/signup` → User + Membership (pending) created → redirect to Stripe Checkout → on success, webhook `checkout.session.completed` updates membership to active (and optionally sends welcome email).
- **Reservations**: Member creates booking via `POST /api/reservations` (roomId, startDatetime, endDatetime). Validation: 07:00–22:00, min 30 min, max 60 days ahead, active membership, no conflict. Confirmation email via `lib/email`.
- **Stripe**: Checkout and billing portal URLs from `lib/stripe.ts`. Webhooks in `app/api/webhooks/stripe/route.ts` (signature verification when `STRIPE_WEBHOOK_SECRET` is set). Handles checkout.session.completed, subscription updates/cancellation, etc.

---

## 7. Environment Variables

Required for full functionality:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | NextAuth JWT signing |
| `NEXTAUTH_URL` | Base URL (e.g. http://localhost:3000) |
| `STRIPE_SECRET_KEY` | Stripe API |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing (optional for local; use Stripe CLI to forward) |
| `STRIPE_PRICE_HOT_DESK`, `STRIPE_PRICE_DEDICATED_DESK`, `STRIPE_PRICE_PRIVATE_OFFICE`, `STRIPE_PRICE_DAY_PASS` | Price IDs for tiers |

Email is currently file-logged in `lib/email.ts` (no SMTP env needed). Add real provider (e.g. Resend) when moving to production.

---

## 8. Scripts and Commands

| Command | Purpose |
|---------|--------|
| `npm run dev` | Start Next.js dev server (default port 3000; use `-- --port 3001` to override) |
| `npm run build` | `prisma generate` + `next build` |
| `npm run start` | Production server after build |
| `npm run lint` | Next.js ESLint |
| `npx prisma generate` | Regenerate Prisma Client after schema change |
| `npx prisma db push` | Push schema to DB (dev); or use `prisma migrate dev` for migrations |
| `npx prisma db seed` | Run seed (admin + members + rooms + sample data) |

---

## 9. Styling and UI

- **Tailwind CSS**. Config: `tailwind.config.ts`. Global styles: `app/globals.css`.
- **Theme**: Background `#FAF8F5`, text `#2C2C2C`, accent `#C1623F` (used in Nav and links).
- **Layout**: Root layout wraps all pages with `<Nav />` and footer (Privacy, Terms). Client components use `'use client'` (e.g. Nav, SessionProvider).

---

## 10. Where to Change What

| Task | Primary locations |
|------|-------------------|
| Add a new page | `app/<path>/page.tsx` (or under `portal/` / `admin/`) |
| Add a new API route | `app/api/<resource>/route.ts` or `app/api/<resource>/[id]/route.ts` |
| Change data model | `prisma/schema.prisma` then `prisma generate` (and migrate or push) |
| Change auth / roles | `auth.ts`, `auth.config.ts`, `middleware.ts`; session type in callbacks |
| Add admin-only API | `app/api/admin/<resource>/...`; check `role === 'admin'` |
| Member-only API | Use `auth()` and require `session?.user` |
| Email content / provider | `lib/email.ts` |
| Stripe products / prices | `lib/stripe.ts` (PRICE_MAP); env vars for price IDs |
| Stripe webhook events | `app/api/webhooks/stripe/route.ts` |
| Navigation links | `components/Nav.tsx` |
| Shared layout / footer | `app/layout.tsx` |
| Seed data | `prisma/seed.ts` |

---

## 11. Demo / Local Testing

- **Demo guide**: See `DEMO.md` for run command, demo credentials (admin@convivia.co / admin123, alice@example.com / member123), and key URLs.
- **Seed**: Creates admin, two members (Alice, Bob), three rooms (room-a, room-b, room-c), sample reservation and events. Run after DB is set up.

---

## 12. Linting and Types

- **ESLint**: `eslint.config.mjs` (Next.js config). Run `npm run lint`.
- **TypeScript**: Strict mode. Path alias `@/*` → project root. NextAuth session `role` is typed as `any` on `session.user`; extend in `auth.config.ts` or a global `next-auth.d.ts` if you want stricter typing.

---

This README is the single source of truth for agents: use it to locate files, follow API and auth patterns, and apply changes consistently.
