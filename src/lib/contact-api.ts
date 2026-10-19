import { env } from '@/lib/env';

export function getContactApiBase(): string {
  const configured = env.VITE_CONTACT_API_URL?.replace(/\/$/, '');
  if (configured) return configured;
  return '';
}

export function contactHealthUrl(): string {
  const base = getContactApiBase();
  return base ? `${base}/health` : '/api/health';
}

export function contactSubmitUrl(): string {
  const base = getContactApiBase();
  return base ? `${base}/contact` : '/api/contact';
}
