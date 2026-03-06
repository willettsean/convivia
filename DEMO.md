# Convivia Platform — Demo Guide

## Running the app
```
cd /Users/sean/.openclaw/workspace/convivia-app
npm run dev -- --port 3001
```
Open: http://localhost:3001

## Demo credentials
| Role   | Email                | Password   |
|--------|----------------------|------------|
| Admin  | admin@convivia.co    | admin123   |
| Member | alice@example.com    | member123  |
| Member | bob@example.com      | member123  |

## Key URLs to demo
- http://localhost:3001 — Home / marketing site
- http://localhost:3001/pricing — Pricing tiers
- http://localhost:3001/events — Upcoming events
- http://localhost:3001/signup — Member signup flow
- http://localhost:3001/portal — Member dashboard (login required)
- http://localhost:3001/portal/reservations — Book rooms
- http://localhost:3001/portal/billing — Billing management
- http://localhost:3001/admin — Admin panel
- http://localhost:3001/admin/members — Member CRM
- http://localhost:3001/admin/events — Events management
- http://localhost:3001/admin/campaigns/new — Send email campaign

## Placeholder notes
- Stripe: UI shows billing options; clicking triggers "coming soon" message
- Email: Sent emails are logged to email-log.txt in the project root
- Database: SQLite file at prisma/dev.db

## Production readiness checklist
- [ ] Add real Stripe keys (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET)
- [ ] Add real email provider (Resend recommended)
- [ ] Switch DB to PostgreSQL (Supabase or Neon)
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Configure Cloudflare domain → Vercel
