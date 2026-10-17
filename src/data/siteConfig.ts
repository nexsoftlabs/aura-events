export const siteConfig = {
  name: 'Aura Events',
  legalName: 'Aura Events',
  tagline: 'Experiences worth remembering',
  description:
    'Premier event management, branding and media production — crafting unforgettable experiences for brands and individuals across India.',
  /** Editable marketing claims — confirm before production publication */
  claims: {
    eventsDelivered: '100+',
    eventsDeliveredLabel: 'Successful events delivered',
    supportLabel: 'Dedicated event manager & support',
  },
  mission:
    'To elevate every event and campaign with innovative ideas, flawless execution, and a touch of elegance, ensuring our clients\' visions become reality.',
  vision:
    'To be the most trusted and creative event partner, setting new standards in the industry for quality, impact, and client satisfaction.',
  about:
    'Aura Events is a premier event management and branding company dedicated to crafting unforgettable experiences for brands and individuals. With a passion for creativity and a commitment to excellence, we have delivered hundreds of successful events across industries.',
  /** Supply verified contact details via environment or edit here */
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL_DISPLAY as string | undefined,
    phone: undefined as string | undefined,
    address: undefined as string | undefined,
    city: 'India',
    serviceAreas: ['Pan-India event management'] as string[],
    businessHours: undefined as string | undefined,
  },
  social: {
    instagram: undefined as string | undefined,
    facebook: undefined as string | undefined,
    linkedin: undefined as string | undefined,
    youtube: undefined as string | undefined,
  },
  seo: {
    defaultTitle: 'Aura Events — Premium Event Management & Branding',
    titleTemplate: '%s | Aura Events',
    defaultDescription:
      'Aura Events delivers corporate events, weddings, branding, activations, film production and media solutions with elegance and precision across India.',
    ogImage: '/images/og-share.jpg',
    locale: 'en_IN',
  },
  featureFlags: {
    showTestimonials: false,
    portfolioHasProjects: false,
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
} as const;
