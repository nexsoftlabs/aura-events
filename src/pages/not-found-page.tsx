import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageSeoHead } from '@/lib/seo';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <>
      <PageSeoHead title="Page not found" path="/404" noIndex />
      <PageHero
        size="lg"
        eyebrow="Error 404"
        title={
          <>
            This page has <em className="text-champagne-light">left the venue.</em>
          </>
        }
        description="The link may be outdated or mistyped. Let us guide you back to planning something memorable."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/">
              Return home
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <Link to="/services">Browse services</Link>
          </Button>
        </div>
      </PageHero>
    </>
  );
}
