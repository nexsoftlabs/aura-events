import type { LucideIcon } from 'lucide-react';
import { images, type Photo } from '@/data/images';
import {
  Building2,
  Camera,
  Clapperboard,
  CreditCard,
  Film,
  Heart,
  Megaphone,
  Palette,
  Printer,
  Radio,
  Stethoscope,
  Target,
} from 'lucide-react';

export type ServiceCategory =
  | 'corporate-mice'
  | 'social-wedding'
  | 'branding-activations'
  | 'film-media'
  | 'print-creative'
  | 'business-solutions';

export interface ServiceCategoryMeta {
  id: ServiceCategory;
  label: string;
  description: string;
  primary: boolean;
}

export const serviceCategories: ServiceCategoryMeta[] = [
  {
    id: 'corporate-mice',
    label: 'Corporate & MICE',
    description: 'Conferences, launches and professional gatherings',
    primary: true,
  },
  {
    id: 'social-wedding',
    label: 'Social & Wedding Events',
    description: 'Celebrations crafted with heart and detail',
    primary: true,
  },
  {
    id: 'branding-activations',
    label: 'Branding & Activations',
    description: 'Brand stories brought to life on ground and above the line',
    primary: true,
  },
  {
    id: 'film-media',
    label: 'Film & Media',
    description: 'Production and advertising across screens and airwaves',
    primary: true,
  },
  {
    id: 'print-creative',
    label: 'Print & Creative',
    description: 'Tangible brand touchpoints with premium finish',
    primary: true,
  },
  {
    id: 'business-solutions',
    label: 'Business Solutions',
    description: 'Specialised consultancy beyond core event delivery',
    primary: false,
  },
];

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ServiceCategory;
  icon: LucideIcon;
  image: Photo;
  imageAlt: string;
  featured: boolean;
  benefits: string[];
  deliverables: string[];
  relatedSlugs: string[];
}

const img = images.services;

export const services: Service[] = [
  {
    id: 'branding',
    slug: 'branding',
    title: 'Branding',
    shortDescription: 'Strategic brand development and creative solutions.',
    description:
      'We shape distinctive brand identities and creative systems that resonate across touchpoints — from positioning and visual language to launch-ready assets that elevate your presence in competitive markets.',
    category: 'branding-activations',
    icon: Palette,
    image: img.branding,
    imageAlt: 'Creative branding mood board and design elements',
    featured: true,
    benefits: [
      'Cohesive identity across events and campaigns',
      'Strategic positioning tailored to your audience',
      'Premium creative direction and asset libraries',
    ],
    deliverables: [
      'Brand strategy workshops',
      'Visual identity and guidelines',
      'Campaign creative and collateral',
    ],
    relatedSlugs: ['atl-btl-activation', 'printing-media', 'media-advertising'],
  },
  {
    id: 'atl-btl-activation',
    slug: 'atl-btl-activation',
    title: 'ATL & BTL Activation',
    shortDescription: 'Above- and below-the-line marketing campaigns.',
    description:
      'Integrated activations that connect broadcast reach with on-ground impact — designed for measurable engagement, memorable experiences and consistent brand storytelling.',
    category: 'branding-activations',
    icon: Target,
    image: img.atl,
    imageAlt: 'Brand activation event with audience engagement',
    featured: true,
    benefits: [
      'Unified ATL and BTL campaign planning',
      'High-impact experiential moments',
      'Vendor coordination and on-ground supervision',
    ],
    deliverables: [
      'Campaign concept and rollout plan',
      'Activation design and fabrication oversight',
      'Media and on-ground execution',
    ],
    relatedSlugs: ['branding', 'media-advertising', 'corporate-events'],
  },
  {
    id: 'corporate-events',
    slug: 'corporate-events',
    title: 'Corporate Events',
    shortDescription: 'Conferences, seminars, launches and more.',
    description:
      'End-to-end corporate event management — from intimate leadership offsites to large-scale conferences and product launches — with meticulous planning, premium production and seamless guest experiences.',
    category: 'corporate-mice',
    icon: Building2,
    image: img.corporate,
    imageAlt: 'Corporate conference with stage and audience seating',
    featured: true,
    benefits: [
      'Flawless logistics and timeline management',
      'Premium AV, staging and delegate experience',
      'Dedicated event manager from brief to wrap',
    ],
    deliverables: [
      'Venue sourcing and technical production',
      'Delegate management and hospitality',
      'Run-of-show and on-site coordination',
    ],
    relatedSlugs: ['branding', 'atl-btl-activation', 'film-production'],
  },
  {
    id: 'printing-media',
    slug: 'printing-media',
    title: 'Printing Media',
    shortDescription: 'Print and physical marketing collateral.',
    description:
      'High-quality print solutions for events and campaigns — brochures, signage, invitations, packaging and environmental graphics — produced with attention to material, finish and brand fidelity.',
    category: 'print-creative',
    icon: Printer,
    image: img.print,
    imageAlt: 'Premium printed marketing collateral stacked on a table',
    featured: false,
    benefits: [
      'Consistent brand reproduction across formats',
      'Premium paper, finish and colour management',
      'Timely production for event deadlines',
    ],
    deliverables: [
      'Print-ready artwork and proofing',
      'Signage, stationery and event kits',
      'Installation support where required',
    ],
    relatedSlugs: ['branding', 'corporate-events', 'birthday-marriage-reception'],
  },
  {
    id: 'film-production',
    slug: 'film-production',
    title: 'Film Production',
    shortDescription: 'End-to-end film production.',
    description:
      'Full-spectrum film production services — concept development, scripting, filming and post-production — for brand films, event highlights and long-form storytelling.',
    category: 'film-media',
    icon: Clapperboard,
    image: img.film,
    imageAlt: 'Film production crew on set with camera equipment',
    featured: true,
    benefits: [
      'Experienced production crew and equipment',
      'Creative direction aligned to brand goals',
      'Efficient workflows from pre to post',
    ],
    deliverables: [
      'Concept, script and storyboard',
      'Principal photography and sound',
      'Edit, grade and delivery masters',
    ],
    relatedSlugs: ['advertisement-films', 'documentary-films', 'corporate-events'],
  },
  {
    id: 'advertisement-films',
    slug: 'advertisement-films',
    title: 'Advertisement Films',
    shortDescription: 'Creative video advertising.',
    description:
      'Compelling advertisement films crafted to capture attention and drive action — from TVCs and digital spots to social-first cuts optimised for every platform.',
    category: 'film-media',
    icon: Megaphone,
    image: img.adFilm,
    imageAlt: 'Video advertisement shoot with lighting setup',
    featured: true,
    benefits: [
      'Concept-led creative for multi-channel use',
      'Production scaled to campaign budgets',
      'Platform-ready deliverables and versions',
    ],
    deliverables: [
      'Creative development and casting',
      'Shoot and post-production',
      'Master and platform-specific exports',
    ],
    relatedSlugs: ['film-production', 'media-advertising', 'branding'],
  },
  {
    id: 'documentary-films',
    slug: 'documentary-films',
    title: 'Documentary Films',
    shortDescription: 'Authentic documentary storytelling.',
    description:
      'Documentary films that honour real stories with journalistic integrity and cinematic craft — ideal for brand heritage, CSR narratives and long-form impact content.',
    category: 'film-media',
    icon: Film,
    image: img.documentary,
    imageAlt: 'Documentary interview setup with subject and camera',
    featured: false,
    benefits: [
      'Research-led narrative development',
      'Respectful, authentic storytelling',
      'Broadcast and digital-ready finishing',
    ],
    deliverables: [
      'Research and interview planning',
      'Filming and archival integration',
      'Edit, sound design and subtitles',
    ],
    relatedSlugs: ['film-production', 'advertisement-films', 'branding'],
  },
  {
    id: 'media-advertising',
    slug: 'media-advertising',
    title: 'Media Advertising',
    shortDescription: 'Media planning and advertising across channels.',
    description:
      'Strategic media planning and buying support to amplify your campaigns — aligning creative assets with the right channels, frequencies and audiences for efficient reach.',
    category: 'film-media',
    icon: Camera,
    image: img.media,
    imageAlt: 'Media planning analytics on a laptop screen',
    featured: false,
    benefits: [
      'Channel mix aligned to campaign objectives',
      'Transparent planning and reporting frameworks',
      'Coordination with creative and activation teams',
    ],
    deliverables: [
      'Media plan and budget allocation',
      'Placement coordination',
      'Campaign tracking and optimisation support',
    ],
    relatedSlugs: ['advertisement-films', 'radio-campaign', 'atl-btl-activation'],
  },
  {
    id: 'radio-campaign',
    slug: 'radio-campaign',
    title: 'Radio Campaign',
    shortDescription: 'Audio creative and radio advertising.',
    description:
      'Radio campaigns with distinctive audio identity — scripting, voice casting, production and station coordination — to build memorable sonic brand presence.',
    category: 'film-media',
    icon: Radio,
    image: img.radio,
    imageAlt: 'Radio microphone in a broadcast studio',
    featured: false,
    benefits: [
      'Script and sonic branding expertise',
      'Multi-language and regional adaptations',
      'Station liaison and scheduling support',
    ],
    deliverables: [
      'Script and audio production',
      'Voice talent coordination',
      'Airtime planning and rollout',
    ],
    relatedSlugs: ['media-advertising', 'advertisement-films', 'branding'],
  },
  {
    id: 'credit-control',
    slug: 'credit-control',
    title: 'Credit Control',
    shortDescription: 'Business credit control solutions.',
    description:
      'Professional credit control support to strengthen cash flow and receivables management — structured processes, courteous follow-ups and reporting tailored to your business context.',
    category: 'business-solutions',
    icon: CreditCard,
    image: img.credit,
    imageAlt: 'Business professional reviewing financial documents',
    featured: false,
    benefits: [
      'Structured receivables workflows',
      'Professional client communication',
      'Periodic reporting and escalation protocols',
    ],
    deliverables: [
      'Credit policy alignment',
      'Account follow-up and reconciliation support',
      'Management reporting',
    ],
    relatedSlugs: ['healthcare-consultancy'],
  },
  {
    id: 'birthday-marriage-reception',
    slug: 'birthday-marriage-reception',
    title: 'Birthday & Marriage / Reception Events',
    shortDescription: 'Personal celebrations and weddings.',
    description:
      'Bespoke planning for birthdays, weddings and receptions — blending tradition with contemporary design, curated vendors and thoughtful guest experiences from welcome to farewell.',
    category: 'social-wedding',
    icon: Heart,
    image: img.wedding,
    imageAlt: 'Elegant wedding reception table setting with florals',
    featured: true,
    benefits: [
      'Personalised concepts reflecting your story',
      'Curated décor, catering and entertainment',
      'Calm, detail-oriented coordination on the day',
    ],
    deliverables: [
      'Concept, décor and vendor curation',
      'Timeline and guest flow planning',
      'On-site event management',
    ],
    relatedSlugs: ['branding', 'printing-media', 'film-production'],
  },
  {
    id: 'healthcare-consultancy',
    slug: 'healthcare-consultancy',
    title: 'Healthcare Consultancy',
    shortDescription: 'Healthcare business consultancy.',
    description:
      'Consultancy support for healthcare organisations — operational guidance, patient experience initiatives and growth planning — delivered with discretion and domain awareness.',
    category: 'business-solutions',
    icon: Stethoscope,
    image: img.healthcare,
    imageAlt: 'Healthcare professionals in a consultation setting',
    featured: false,
    benefits: [
      'Practical, context-aware recommendations',
      'Confidential engagement models',
      'Alignment with regulatory considerations',
    ],
    deliverables: [
      'Discovery and assessment',
      'Action plans and implementation support',
      'Periodic review sessions',
    ],
    relatedSlugs: ['credit-control', 'corporate-events'],
  },
];

export const ORIGINAL_SERVICE_IDS = [
  'branding',
  'atl-btl-activation',
  'corporate-events',
  'printing-media',
  'film-production',
  'advertisement-films',
  'documentary-films',
  'media-advertising',
  'radio-campaign',
  'credit-control',
  'birthday-marriage-reception',
  'healthcare-consultancy',
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => Boolean(s));
}

