import { PageSeoHead } from '@/lib/seo';
import { siteConfig } from '@/data/siteConfig';
import { HeroSection } from '@/components/sections/hero';
import { ServiceMarquee } from '@/components/sections/marquee';
import { IntroStorySection } from '@/components/sections/intro-story';
import { SignatureServicesSection } from '@/components/sections/signature-services';
import { ExpertiseSection } from '@/components/sections/expertise';
import { SelectedWorkSection } from '@/components/sections/selected-work';
import { WhyAuraSection } from '@/components/sections/why-aura';
import { ProcessSection } from '@/components/sections/process';
import { InterludeSection } from '@/components/sections/interlude';
import { FaqSection } from '@/components/sections/faq';
import { CtaBannerSection } from '@/components/sections/cta-banner';

export function HomePage() {
  return (
    <>
      <PageSeoHead title={siteConfig.seo.defaultTitle} description={siteConfig.seo.defaultDescription} path="/" />
      <HeroSection />
      <ServiceMarquee />
      <IntroStorySection />
      <SignatureServicesSection />
      <ExpertiseSection />
      <SelectedWorkSection />
      <InterludeSection />
      <WhyAuraSection />
      <ProcessSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  );
}
