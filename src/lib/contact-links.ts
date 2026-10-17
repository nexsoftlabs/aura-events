import { env, isWhatsAppConfigured } from '@/lib/env';
import { siteConfig } from '@/data/siteConfig';

export function getContactEmail(): string | undefined {
  return siteConfig.contact.email || env.VITE_CONTACT_EMAIL_DISPLAY || undefined;
}

export function getWhatsAppLink(message: string): string | null {
  if (!isWhatsAppConfigured()) return null;
  return `https://wa.me/${env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
