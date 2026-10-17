# Aura Events — Marketing Website

Production-ready React 19 + TypeScript + Vite + Tailwind CSS v4 website for **Aura Events**, a premium Indian event management, branding and media production company.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript project references |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke tests |

## Environment variables

Copy `.env.example` to `.env` and set:

- **EmailJS** — `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`
- **Contact display** — `VITE_CONTACT_EMAIL_DISPLAY`
- **WhatsApp** — `VITE_WHATSAPP_NUMBER` (digits only, e.g. `919876543210`)
- **SEO** — `VITE_SITE_URL` (canonical URL, no trailing slash)

Public `VITE_*` values are bundled into the client. Never put SMTP passwords or private API secrets in the frontend.

### EmailJS setup

1. Create an account at [emailjs.com](https://www.emailjs.com/) and verify your sending domain / inbox routing per their current free-tier limits.
2. Create an **Email Service** connected to your inbox.
3. Create an **Email Template** with variables matching the app:
   - `from_name`, `from_email`, `reply_to`, `phone`, `service`, `service_slug`, `event_date`, `city`, `budget`, `guest_count`, `message`, `consent`, `submitted_at`, `to_email`, `html_message`
4. Copy Public Key, Service ID and Template ID into `.env`.
5. In EmailJS dashboard, **restrict allowed domains** to your production hostname.
6. Submit a test enquiry from `/contact` and confirm delivery end-to-end before go-live.

## Editable content

- **Brand & claims** — `src/data/siteConfig.ts`
- **All 12 services** — `src/data/services.ts`
- **Navigation** — `src/data/navigation.ts`
- **FAQs** — `src/data/faqs.ts`
- **Why Aura / process** — `src/data/whyAura.ts`

Replace demo images under `public/images/` with licensed or owned photography. Current assets are duplicated placeholders — not client work.

## Deployment

### Vercel / Netlify

- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites: `vercel.json` and `public/_redirects` are included.

Update `public/sitemap.xml` and `public/robots.txt` with your live domain.

### Launch checklist

- [ ] Confirm marketing claims in `siteConfig` (event counts, awards, etc.)
- [ ] Replace all demo images
- [ ] Configure EmailJS + test enquiry delivery
- [ ] Set WhatsApp number and verify floating button
- [ ] Add verified phone, address, business hours if applicable
- [ ] Legal review of `privacy-policy` and `terms` pages
- [ ] Update sitemap/robots canonical URLs
- [ ] Run `npm run lint`, `npm run test`, `npm run build`, `npm run test:e2e`
- [ ] Lighthouse audit on production URL

## Architecture

- **Router** — `src/app/router.tsx` with lazy-loaded routes
- **Contact** — `src/features/contact/` (Zod + React Hook Form + TanStack Query mutation + EmailJS)
- **SEO** — `src/lib/seo.tsx` (client-side meta; consider prerender/SSR for stronger crawlers)

## License

Proprietary — Aura Events. Demo stock/placeholder imagery must be replaced before public launch.
