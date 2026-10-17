import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { HomePage } from '@/pages/home-page';

const AboutPage = lazy(() =>
  import('@/pages/about-page').then((m) => ({ default: m.AboutPage })),
);
const ServicesPage = lazy(() =>
  import('@/pages/services-page').then((m) => ({ default: m.ServicesPage })),
);
const ServiceDetailPage = lazy(() =>
  import('@/pages/service-detail-page').then((m) => ({ default: m.ServiceDetailPage })),
);
const PortfolioPage = lazy(() =>
  import('@/pages/portfolio-page').then((m) => ({ default: m.PortfolioPage })),
);
const WhyAuraPage = lazy(() =>
  import('@/pages/why-aura-page').then((m) => ({ default: m.WhyAuraPage })),
);
const ContactPage = lazy(() =>
  import('@/pages/contact-page').then((m) => ({ default: m.ContactPage })),
);
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/legal-page').then((m) => ({ default: m.PrivacyPolicyPage })),
);
const TermsPage = lazy(() =>
  import('@/pages/legal-page').then((m) => ({ default: m.TermsPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
      <span className="text-sm text-slate">Loading…</span>
    </div>
  );
}

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <Lazy><AboutPage /></Lazy> },
      { path: 'services', element: <Lazy><ServicesPage /></Lazy> },
      { path: 'services/:slug', element: <Lazy><ServiceDetailPage /></Lazy> },
      { path: 'portfolio', element: <Lazy><PortfolioPage /></Lazy> },
      { path: 'why-aura', element: <Lazy><WhyAuraPage /></Lazy> },
      { path: 'contact', element: <Lazy><ContactPage /></Lazy> },
      { path: 'privacy-policy', element: <Lazy><PrivacyPolicyPage /></Lazy> },
      { path: 'terms', element: <Lazy><TermsPage /></Lazy> },
      { path: '*', element: <Lazy><NotFoundPage /></Lazy> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
