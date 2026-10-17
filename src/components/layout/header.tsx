import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { serviceCategories, getServicesByCategory } from '@/data/services';
import { images } from '@/data/images';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/layout/logo';
import { MobileNav } from '@/components/layout/mobile-nav';
import { cn } from '@/lib/utils';

const navLinkClass =
  'relative inline-flex h-10 items-center gap-1 px-1 text-[0.8125rem] font-medium tracking-wide text-ivory/80 transition-colors hover:text-ivory data-[active=true]:text-champagne-light';

function ServicesMenu() {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className={cn(navLinkClass, 'group')}>
        Services
        <ChevronDown
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="absolute left-1/2 top-full w-[min(1040px,92vw)] -translate-x-1/2 pt-5 data-[state=open]:animate-fade-in">
        <div className="grid grid-cols-[1fr_280px] overflow-hidden rounded-2xl border border-white/10 bg-midnight/97 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-x-8 gap-y-8 p-9">
            {serviceCategories.map((cat) => (
              <div key={cat.id}>
                <p
                  className={cn(
                    'eyebrow mb-3',
                    cat.primary ? 'text-champagne' : 'text-ivory/45',
                  )}
                >
                  {cat.label}
                </p>
                <ul className="space-y-1.5">
                  {getServicesByCategory(cat.id).map((s) => (
                    <li key={s.slug}>
                      <NavigationMenu.Link asChild>
                        <Link
                          to={`/services/${s.slug}`}
                          className="block py-0.5 text-sm text-ivory/75 transition-colors hover:text-ivory"
                        >
                          {s.title}
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <NavigationMenu.Link asChild>
            <Link to="/services" className="group/feat relative isolate flex flex-col justify-end overflow-hidden p-7">
              <img
                src={images.services.wedding.src}
                alt=""
                className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-1000 group-hover/feat:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/10" />
              <span className="eyebrow text-champagne">All 12 services</span>
              <span className="mt-2 font-display text-2xl leading-tight text-ivory">
                Explore the full Aura catalogue
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ivory/80">
                View services <ArrowUpRight aria-hidden className="size-4" />
              </span>
            </Link>
          </NavigationMenu.Link>
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ease-(--ease-luxe)',
        scrolled
          ? 'border-b border-white/[0.07] bg-midnight/90 py-3 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-midnight/60 to-transparent py-5',
      )}
    >
      <a
        href="#main-content"
        className="sr-only rounded-full bg-ivory px-5 py-2.5 text-sm font-medium text-midnight focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <Container className="flex items-center justify-between gap-6">
        <Logo />

        <NavigationMenu.Root
          aria-label="Main"
          className="relative hidden lg:block"
          delayDuration={80}
        >
          <NavigationMenu.List className="flex items-center gap-8">
            {mainNav.map((item) =>
              item.href === '/services' ? (
                <ServicesMenu key={item.href} />
              ) : (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link asChild active={pathname.startsWith(item.href)}>
                    <NavLink to={item.href} className={navLinkClass}>
                      {item.label}
                    </NavLink>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ),
            )}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">Plan Your Event</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
