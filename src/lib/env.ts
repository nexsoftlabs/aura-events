import { z } from 'zod';

const envSchema = z.object({
  VITE_EMAILJS_PUBLIC_KEY: z.string().optional(),
  VITE_EMAILJS_SERVICE_ID: z.string().optional(),
  VITE_EMAILJS_TEMPLATE_ID: z.string().optional(),
  VITE_CONTACT_EMAIL_DISPLAY: z.string().email().optional().or(z.literal('')),
  VITE_WHATSAPP_NUMBER: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{10,15}$/.test(v), {
      message: 'WhatsApp number must be digits only',
    }),
  VITE_SITE_URL: z.string().url().optional().or(z.literal('')),
  VITE_GA_MEASUREMENT_ID: z.string().optional(),
  VITE_ENABLE_ANALYTICS: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => v === 'true'),
});

export type AppEnv = z.infer<typeof envSchema>;

function parseEnv(): AppEnv {
  const result = envSchema.safeParse(import.meta.env);
  if (!result.success) {
    console.warn('Environment validation warnings:', result.error.flatten());
    return envSchema.parse({});
  }
  return result.data;
}

export const env = parseEnv();

export function isEmailJsConfigured(): boolean {
  return Boolean(
    env.VITE_EMAILJS_PUBLIC_KEY &&
      env.VITE_EMAILJS_SERVICE_ID &&
      env.VITE_EMAILJS_TEMPLATE_ID,
  );
}

export function isWhatsAppConfigured(): boolean {
  return Boolean(env.VITE_WHATSAPP_NUMBER && /^\d{10,15}$/.test(env.VITE_WHATSAPP_NUMBER));
}

export function getSiteUrl(): string {
  if (env.VITE_SITE_URL) return env.VITE_SITE_URL.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return 'https://auraevents.in';
}
