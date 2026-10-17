# Aura Events — Launch Checklist

## Content & legal

- [ ] Review and confirm marketing claims in `src/data/siteConfig.ts`
- [ ] Replace demo images in `public/images/`
- [ ] Add verified phone, address, business hours if publishing
- [ ] Legal review of Privacy Policy and Terms pages
- [ ] Update `public/sitemap.xml` and `public/robots.txt` with production domain

## Integrations

- [ ] Configure `.env` from `.env.example`
- [ ] EmailJS: service, template, domain allowlist, test enquiry E2E
- [ ] WhatsApp number for FAB and contact fallbacks
- [ ] Optional GA4: `VITE_ENABLE_ANALYTICS=true` + measurement ID

## Quality

- [ ] `npm run lint && npm run typecheck && npm run test && npm run build`
- [ ] `npm run test:e2e`
- [ ] Lighthouse on production URL (performance, a11y, SEO)
- [ ] Manual check: mobile nav, contact form, all 12 service detail URLs

## Hosting

- [ ] Deploy `dist` with SPA rewrite (Vercel/Netlify configs included)
- [ ] Custom domain + HTTPS
- [ ] Verify deep links (`/services/corporate-events`, etc.)
