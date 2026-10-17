# AURA EVENTS — CURSOR AI MASTER BUILD PROMPT

You are a principal frontend engineer, award-winning creative director, accessibility specialist, and technical SEO architect. Build a COMPLETE, production-ready, enterprise-quality website for **Aura Events**, a premium Indian event management, branding and media-production company. Implement actual code, not a mockup, proposal or placeholder skeleton. Work autonomously through architecture, implementation, testing, and documentation. Ask only for truly blocking secrets or business facts; use explicitly marked configurable placeholders otherwise.

## Brand and business context

**Name:** Aura Events

**About:** Aura Events is a premier event management and branding company dedicated to crafting unforgettable experiences for brands and individuals. With a passion for creativity and a commitment to excellence, we have delivered hundreds of successful events across industries.

**Mission:** To elevate every event and campaign with innovative ideas, flawless execution, and a touch of elegance, ensuring our clients' visions become reality.

**Vision:** To be the most trusted and creative event partner, setting new standards in the industry for quality, impact, and client satisfaction.

**Why choose Aura:** Personalized event planning tailored to the client's vision; creative branding and marketing; experienced team with 100+ successful events delivered; premium vendor network; transparent pricing; on-time execution; 24/7 support and dedicated event manager. Treat these as user-provided marketing claims, expose as editable content, and confirm before production publication, especially numerical and absolute claims.

**Existing services — MUST PRESERVE all 12:**
1. Branding — strategic brand development and creative solutions.
2. ATL and BTL Activation — above- and below-the-line marketing campaigns.
3. Corporate Events — conferences, seminars, launches and more.
4. Printing Media — print and physical marketing collateral.
5. Film Production — end-to-end film production.
6. Advertisement Films — creative video advertising.
7. Documentary Films — authentic documentary storytelling.
8. Media Advertising — media planning and advertising across channels.
9. Radio Campaign — audio creative and radio advertising.
10. Credit Control — business credit control solutions.
11. Birthday and Marriage/Reception Events — personal celebrations and weddings.
12. Healthcare Consultancy — healthcare business consultancy.

Organize these into clear navigation categories: Corporate & MICE; Social & Wedding Events; Branding & Activations; Film & Media; Print & Creative; Business Consultancy. Credit Control and Healthcare Consultancy should remain discoverable but be positioned in a secondary Business Solutions section so they do not confuse the core event-management proposition. Do not delete or silently rename offerings. Provide descriptions, slugs, icons, and image references in typed content data.

**Suggested additional services** (only mark as available when owner confirms): exhibitions and trade shows; stall design/fabrication; product launches; dealer/distributor meets; employee engagement; annual days and award ceremonies; team building; MICE (meetings, incentives, conferences, exhibitions); roadshows; mall activations; retail branding; experiential marketing; destination weddings; anniversary and private celebrations; decor and venue styling; artist/celebrity management; sound, lighting, LED walls, stage and AV; hybrid events and livestreaming; photography/videography; digital invitations and RSVP; event logistics, guest management and hospitality; sponsorship management; influencer campaigns; event microsites and digital promotion. Clearly label unconfirmed capabilities as future options internally; do not publicly promise them without approval.

## Stack — mandatory
- React 19, TypeScript strict mode, Vite.
- Tailwind CSS v4, with v4-native setup (`@import "tailwindcss"`, Vite integration), no obsolete v3-only config assumptions.
- React Router (current compatible version) for SPA routes and lazy route splitting.
- TanStack React Query for asynchronous mutations (contact form) and future API integration; do NOT use React Query for static local data.
- Zod for runtime form validation and typed schemas, React Hook Form and `@hookform/resolvers`.
- Motion for React (`motion/react`) for purposeful premium motion; respect `prefers-reduced-motion`.
- Lucide React icons; accessible Radix primitives or shadcn/ui only where they add value and versions are compatible.
- Vitest + React Testing Library + Playwright for tests.
- ESLint, Prettier, strict TS checking, environment schema validation.
- Choose only current mutually compatible stable package versions, verify against package metadata at implementation time, and avoid unnecessary dependencies.

## Creative direction

Build a visually stunning, distinctive, editorial luxury experience, NOT a generic bootstrap template or repeated tiny cards. Think a high-end experiential agency meets a luxury wedding studio. Balance corporate credibility with emotional photography. Palette: midnight `#10141D`, slate `#222936`, champagne gold `#C7A46A`, warm ivory `#F6F1E8`, white `#FFFFFF`. Contrast must meet WCAG AA for normal text; gold on light backgrounds should be decorative or darkened for text. Heading font Cormorant Garamond or Playfair Display; body font Manrope or DM Sans. Use self-hosted optimized fonts or sensible fallbacks, consistent tracking and typographic scale, abundant whitespace, fine borders, elegant gradients, subtle grain if inexpensive, rounded-but-not-bubbly corners, and authentic-looking event photography.

Homepage visual direction:
- Transparent-to-solid sticky navbar with restrained logo, clear services menu, portfolio, about, contact and prominent “Plan Your Event” CTA; accessible mobile drawer.
- Cinematic hero using an optimized static hero photo by default (optional muted video only when supplied), layered midnight gradient, eyebrow “Experiences worth remembering”, impactful serif heading, short subheading, primary “Plan Your Event” and secondary “Explore Our Work” CTAs. Provide polished mobile composition and avoid layout shifts.
- Elegant trust strip with editable metrics and client logo slots; do NOT invent logos, testimonials, awards, statistics or real projects. Use a tasteful value proposition instead when unverified.
- Intro/story section with asymmetric image/text layout.
- Signature services: 6 featured editorial photo cards with hover reveals, then link to all services; support all 12 on Services page with category filters.
- Selected work: visually compelling masonry/editorial portfolio with real content placeholders clearly marked for replacement; no fabricated client names or project outcomes.
- Why Aura: value propositions with refined iconography and authentic copy.
- Process: Discover → Conceptualize → Plan → Produce → Celebrate / Measure.
- Immersive full-bleed event image/quote interlude (not an invented client quote).
- Testimonials only if real and supplied; otherwise omit and display approach/commitments.
- FAQ accordion answering practical India-specific enquiry questions without invented prices.
- Closing conversion banner, contact teaser, WhatsApp contact link, comprehensive footer.

Motion design:
- Smooth fade/translate reveals on scroll with IntersectionObserver or Motion viewport and `once: true`.
- Subtle hero text sequencing and image scale-in, restrained card hover lift and image zoom, elegant underline animation, number reveals only for verified stats, gallery lightbox transitions, subtle background parallax only on capable devices.
- No scroll hijacking, aggressive autoplay, constant bouncing, excessive blur, or heavy animation libraries. Keep animations mostly transform/opacity; target 60 fps and reduce or disable for reduced-motion users.

## Pages and routes

1. `/` Home as above.
2. `/about` Brand story, mission, vision, values, planning philosophy, process, people/team slots only when actual names/photos provided, CTA.
3. `/services` Search/filter or accessible category tabs; show all 12 original services; optional additional confirmed services. Responsive grid with high-quality photography, clear descriptions, links.
4. `/services/:slug` Dynamic service details from typed data, SEO title/description, benefits, service deliverables, optional image gallery, related services, enquiry CTA with service preselected. Generate only for genuine active offerings.
5. `/portfolio` Filterable editorial case-study gallery (Corporate, Wedding, Branding, Film, etc.). If no real project data is supplied, show an attractive non-deceptive “Portfolio coming soon” experience with general visual inspiration explicitly labeled, rather than fabricated projects.
6. `/portfolio/:slug` Optional, only if actual project data exists; brief, challenge, solution, gallery, outcomes only when verified.
7. `/why-aura` Distinct advantages, planning approach, commitments, FAQ and CTA (or merge into About if navigation becomes too crowded).
8. `/contact` Enquiry form, contact methods, business hours if supplied, city/service areas if supplied, map only if a verified address exists. No invented phone, address or email.
9. `/privacy-policy` and `/terms` with clearly editable starter copy; owner/legal review before launch.
10. Catch-all branded 404 page.

Use a reusable layout, scroll restoration, page transitions with reduced-motion support, accessible breadcrumb navigation on detail pages, canonical paths and functional navigation. SPA deep links must work on chosen hosting via rewrite configuration. Consider prerendering static marketing routes or a lightweight static-generation approach for stronger SEO; do not pretend client-only SPA meta tags guarantee rich crawler support.

## Contact form — must actually deliver emails

Primary requirement: static website, no database, email enquiries to the owner's inbox, using a free-tier service.

Implement **EmailJS** as the simplest launch option, behind a typed `ContactEmailService` abstraction to permit later migration to a serverless endpoint. Verify current free plan limits and allowed use before claiming a specific quota. EmailJS public key, service ID and template ID are client-exposed by design; NEVER put a private email account password, SMTP credential, or provider secret in frontend code. Add allowed-domain restrictions and provider anti-abuse protections. Client-side honeypot and submission throttling are only supplementary and cannot guarantee abuse prevention. If strong abuse controls are required, document a more secure alternative: free-tier serverless function with server-side validation, Turnstile verification, and an email provider (e.g. Resend), with credentials stored server-side. Do not claim a pure static site can securely keep server secrets.

Form fields: full name (required), email (required), Indian phone number with country code support (required), event type/service (required), preferred event date (optional), event city (required), estimated budget range (optional; INR ranges configurable), approximate guest count (optional), message/requirements (required), privacy consent checkbox (required), and hidden honeypot field. Use Zod schemas with meaningful field-level messages, trim and length bounds, basic normalization and safe text rendering. Validate event date when present. Phone validation should support international format without rejecting valid Indian numbers. Use accessible field labels, error summaries, `aria-invalid`, and focus handling.

On submit: disable duplicate submissions; show loading, success and actionable error states; send a structured, HTML-escaped email template to the owner's configured inbox, include reply-to where supported, timestamp, selected service and consent flag. Never display “sent” until provider resolves successfully. Clear/reset only on confirmed success; preserve form data on error. Add accessible toast/live region, retry, and optional WhatsApp fallback. Do not log sensitive enquiry details to analytics or console. Include `.env.example` with `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_CONTACT_EMAIL_DISPLAY`, `VITE_WHATSAPP_NUMBER`, `VITE_SITE_URL` (note public env values are bundled into browser code). Provide EmailJS dashboard setup instructions including template variable names, inbox routing, domain allowlisting and end-to-end verification. If variables are missing, display a graceful unavailable state with alternate contact channel, never silently fake success.

A WhatsApp floating action must use `https://wa.me/<digits>?text=<encoded-message>` and only render with a valid configured number; avoid covering mobile CTAs or cookie controls. Optional click-to-call and mailto only when owner supplies details.

## Content architecture and components

Suggested folders:
```
src/
  app/              # router, providers, app shell, error boundary
  components/
    ui/             # buttons, inputs, accordion, dialog, containers
    layout/         # header, mobile nav, footer, breadcrumbs
    sections/       # hero, services, gallery, process, FAQ, CTA
  features/
    contact/        # schema, form, email service, mutation, tests
    services/       # catalog, cards, detail template
    portfolio/      # typed case studies, filters, gallery
  data/             # brand, services, navigation, FAQs, content
  hooks/            # media query, reduced motion, etc.
  lib/              # env validation, SEO, utilities
  pages/
  styles/
public/
  images/           # licensed/owned optimized assets
  favicon.svg
```

Keep content in strongly typed local TS data structures or JSON validated by Zod. Include a centralized `siteConfig` for company name, tagline, verified facts, email, phone, WhatsApp, social links, city, SEO defaults, feature flags. Avoid hardcoding repeated marketing copy. Component APIs must be reusable and strongly typed; no `any`, no unchecked type assertions, no unused packages.

## Image and asset requirements

Use only properly licensed imagery (owner-provided, appropriately licensed stock, or clearly temporary demo assets). Do not hotlink random third-party photos in production or imply stock photos depict Aura's real work. Supply useful descriptive alt text; decorative images have empty alt. Responsive `<picture>`/`srcSet`, AVIF/WebP where feasible, appropriate sizes, lazy loading below the fold, eager/LCP priority hero image, explicit width/height or aspect-ratio, blur/color placeholders to avoid CLS. Provide graceful image fallbacks. Do not use the screenshot itself as a web page design asset; use it only as the original service inventory reference.

## UX and accessibility

Mobile-first from 320px through tablets and wide desktop; check 360, 390, 768, 1024, 1440 and 1920px. No horizontal overflow. Touch targets at least 44x44 where practical, keyboard navigation, visible focus rings, semantic landmarks, skip-to-content, heading hierarchy, accessible menus/dialogs, alt text, form errors, ARIA where appropriate, adequate contrast, body text comfortably readable on phones. Mobile navigation closes on route change and Escape, traps focus when modal, restores focus on close. Gallery lightbox supports keyboard controls. Respect reduced motion, data saver and low-performance devices.

## SEO and marketing readiness

Meaningful page titles/descriptions, canonical URLs, Open Graph and Twitter metadata with configurable share image, sitemap.xml, robots.txt, favicon, organization and service structured data using only truthful business information, internal linking, semantic HTML, human-readable slugs, proper 404. For Indian audience: INR, India-friendly phone formatting, Indian English copy, local SEO only for verified service locations, no invented Google reviews or addresses. Add social links only when supplied. Google Business Profile link can be added after verification. Provide lightweight analytics integration as opt-in (e.g. GA4 or privacy-friendly alternative), without collecting form PII; include consent handling if non-essential trackers are enabled. Core Web Vitals targets: LCP <2.5s, CLS <0.1, INP <200ms on representative real devices/networks; Lighthouse targets 90+ in performance/accessibility/best practices/SEO where realistic, measure rather than assert.

## Reliability, security, maintainability

No client-side secrets; validate config; sanitize/escape interpolated email HTML; do not use `dangerouslySetInnerHTML` with user input; add reasonable CSP and security headers where hosting allows (adjust CSP for EmailJS/fonts/assets); error boundaries and resilient loading states; route-based lazy loading and Suspense; no blocking giant video; dependency audit; stable responsive design; no broken links; no fake functionality. Use `.gitignore`, `.env.example`, README and a deployment checklist. Keep build deterministic and warning-free. React Query provider configured with sensible defaults; mutation handles actual email request. Static content does not need React Query.

## Required testing and acceptance criteria

Create tests for contact Zod schema (valid/invalid phone/email, missing consent, date, empty/long message), email service success/failure and form state, navigation/menu accessibility, services data integrity (all 12 original services present, unique slugs), route rendering, portfolio empty state, 404 and reduced-motion behavior. Playwright smoke tests on desktop and mobile for home, services, detail, about, contact, navigation, form validation and responsive overflow. Mock EmailJS in automated tests; do not send real emails from CI. Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` and `npm run test:e2e` where browser tooling is available. Fix issues found; do not merely describe tests.

## Execution order — implement, don't stop at planning

1. Inspect existing repo, preserve working files, report key findings briefly.
2. Scaffold/install compatible dependencies and configure strict TypeScript, Tailwind v4, router, React Query, lint/test tooling.
3. Build design tokens, typography, layout primitives, responsive navigation and footer.
4. Implement typed company/service/FAQ/portfolio data and all pages/routes.
5. Build polished home sections, detail pages, mobile responsive layouts and tasteful animations.
6. Implement actual EmailJS contact mutation, validation, success/failure UI, environment configuration and email template instructions.
7. Implement SEO, accessibility, performance improvements, static host rewrites, privacy/legal draft pages.
8. Add and execute automated tests; fix all failures; inspect mobile/desktop screenshots if browser available.
9. Write thorough README with install, development, EmailJS setup, image replacement, editable content, deployment to Vercel/Netlify, DNS/domain basics and final launch checklist.
10. Provide concise final report: implemented features, file tree, commands/results, remaining owner-provided details, and launch blockers. Clearly separate verified completed work from anything requiring manual setup.

## Deliverables

A runnable React 19 + TS + Tailwind 4 project, complete pages and responsive components, beautiful premium UI, real working email integration once credentials are configured, functional WhatsApp link once number configured, truthful service catalog, quality animation, accessible interaction, tested build, `.env.example`, README, and launch checklist. Never mark integrations as operational before an actual end-to-end test. Do not ship fabricated testimonials, projects, reviews, clients, photos or achievements.

**Important:** Implement the website end-to-end now. Do not return only a design description or ask for approval between routine steps. Make reasonable design decisions, keep placeholders configurable, and flag only the final business details required for production launch.
