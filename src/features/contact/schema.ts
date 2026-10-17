import { z } from 'zod';
import { services } from '@/data/services';

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

const phoneRegex =
  /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\s.-]{7,15}$/;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(120, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .min(8, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long')
    .refine((v) => phoneRegex.test(v), 'Please enter a valid phone number'),
  service: z.enum(serviceSlugs, {
    errorMap: () => ({ message: 'Please select an event type or service' }),
  }),
  eventDate: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v) return true;
        const d = new Date(v);
        if (Number.isNaN(d.getTime())) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return d >= today;
      },
      { message: 'Event date must be today or in the future' },
    ),
  city: z
    .string()
    .trim()
    .min(2, 'Please enter your event city')
    .max(80, 'City name is too long'),
  budget: z.string().optional(),
  guestCount: z
    .string()
    .optional()
    .refine(
      (v) => !v || (/^\d+$/.test(v) && Number(v) > 0 && Number(v) <= 100000),
      'Enter a valid guest count',
    ),
  message: z
    .string()
    .trim()
    .min(20, 'Please share a few more details (at least 20 characters)')
    .max(5000, 'Message is too long'),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: 'You must agree to the privacy policy to submit',
    }),
  website: z.string().max(0, 'Invalid submission').optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
  fullName: '',
  email: '',
  phone: '',
  service: 'corporate-events',
  eventDate: '',
  city: '',
  budget: '',
  guestCount: '',
  message: '',
  consent: false,
  website: '',
};
