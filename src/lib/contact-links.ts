import { env, isWhatsAppConfigured } from '@/lib/env';
import { siteConfig } from '@/data/siteConfig';

export function getContactEmail(): string | undefined {
  return env.VITE_CONTACT_EMAIL_DISPLAY || siteConfig.contact.email || undefined;
}

export function getContactPhone(): string | undefined {
  return siteConfig.contact.phone;
}

export function getOfficeAddress(): string | undefined {
  return siteConfig.contact.address;
}

export function getTelHref(phone: string): string {
  const normalized = phone.replace(/\s/g, '');
  return normalized.startsWith('tel:') ? normalized : `tel:${normalized}`;
}

export function getMapsSearchUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function getWhatsAppLink(message: string): string | null {
  if (!isWhatsAppConfigured()) return null;
  return `https://wa.me/${env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
