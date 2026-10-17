import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFab } from '@/components/layout/whatsapp-fab';
import { OrganizationJsonLd } from '@/lib/seo';
import { AnalyticsLoader } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function MainLayout() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollRestoration />
      <OrganizationJsonLd />
      <AnalyticsLoader />
      <Header />
      <motion.main
        key={pathname}
        id="main-content"
        tabIndex={-1}
        className="flex-1 outline-none"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
