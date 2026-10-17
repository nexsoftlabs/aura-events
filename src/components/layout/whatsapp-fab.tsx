import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/contact-links';

export function WhatsAppFab() {
  const { pathname } = useLocation();
  const href = getWhatsAppLink('Hello Aura Events, I would like to discuss an upcoming event.');

  // The contact page already offers WhatsApp beside the submit button.
  if (!href || pathname === '/contact') return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#1f9e55] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] ring-4 ring-white/10 transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6"
      aria-label="Chat with Aura Events on WhatsApp (opens in a new tab)"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
