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

Copy `.env.example` to `.env` for local frontend config.

**Public (Vite)** — bundled into the browser; never put Resend API keys here.

- **Contact API** — optional `VITE_CONTACT_API_URL` (omit on Vercel to use same-origin `/api/*`)
- **Display email** — `VITE_CONTACT_EMAIL_DISPLAY`
- **WhatsApp** — `VITE_WHATSAPP_NUMBER` (digits only, e.g. `917908293247`)
- **SEO** — `VITE_SITE_URL`
- **EmailJS (optional fallback)** — `VITE_EMAILJS_*` only if you skip the Resend API

**Server (Vercel → Project → Environment Variables)** — secrets stay on the server:

| Variable | Example | Purpose |
|----------|---------|---------|
| `RESEND_API_KEY` | `re_…` | Nexsoft Resend account |
| `RESEND_FROM` | `Aura Events <info@auraeventservices.in>` | Must use a **verified** domain in Resend |
| `CONTACT_INBOX` | `eventservices.aura@gmail.com` | Where enquiries are delivered |
| `ALLOWED_ORIGINS` | production + preview + `http://127.0.0.1:5173` | CORS for `/api/contact` |

### Resend enquiry flow (recommended)

1. **Resend (Nexsoft)** — Verify domain `auraeventservices.in` (DNS below); use `RESEND_FROM=Aura Events <info@auraeventservices.in>`.
2. Publish Resend DNS records at **Hostinger** (same place as site DNS); wait until Resend shows **Verified**.
3. Create a **Resend API key** with send permission; add `RESEND_API_KEY` on Vercel for **Production** (and Preview if you test there).
4. Set `CONTACT_INBOX` and `RESEND_FROM`; redeploy **aura-events**.
5. Verify:
   - `GET https://www.auraeventservices.in/api/health` → `{ "mailConfigured": true }`
   - Submit `/contact` and confirm the inbox receives mail with **Reply-To** set to the visitor.

### Local development

| Command | Use |
|---------|-----|
| `npm run dev` | UI only — form shows “coming soon” unless API is reachable |
| `npm run dev:full` | **Vercel dev** — runs Vite + `/api/contact` (add `RESEND_API_KEY` via `vercel env pull` or Vercel dashboard) |

Legacy **EmailJS** still works as a fallback if the API returns not configured and `VITE_EMAILJS_*` is set.

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
- [ ] Configure Resend (`RESEND_*` on Vercel) + test enquiry delivery
- [ ] Set WhatsApp number and verify floating button
- [ ] Add verified phone, address, business hours if applicable
- [ ] Legal review of `privacy-policy` and `terms` pages
- [ ] Update sitemap/robots canonical URLs
- [ ] Run `npm run lint`, `npm run test`, `npm run build`, `npm run test:e2e`
- [ ] Lighthouse audit on production URL

## Architecture

- **Router** — `src/app/router.tsx` with lazy-loaded routes
- **Contact** — `src/features/contact/` (form + TanStack Query); `api/contact.ts` (Resend)
- **SEO** — `src/lib/seo.tsx` (client-side meta; consider prerender/SSR for stronger crawlers)

## License

Proprietary — Aura Events. Demo stock/placeholder imagery must be replaced before public launch.
