import { z } from 'zod';

const serviceSlugs = [
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

const phoneRegex =
  /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\s.-]{7,15}$/;

export const enquiryBodySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .refine((v) => phoneRegex.test(v)),
  service: z.enum(serviceSlugs),
  eventDate: z.string().optional(),
  city: z.string().trim().min(2).max(80),
  budget: z.string().optional(),
  guestCount: z.string().optional(),
  message: z.string().trim().min(20).max(5000),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
});

export type EnquiryBody = z.infer<typeof enquiryBodySchema>;
