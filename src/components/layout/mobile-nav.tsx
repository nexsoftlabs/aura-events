import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { serviceCategories, getServicesByCategory } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-champagne lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-midnight/70 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden bg-midnight text-ivory shadow-2xl data-[state=open]:animate-fade-in"
        >
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <Logo />
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/20"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1">
              {mainNav
                .filter((i) => i.href !== '/services')
                .map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'block py-3 font-display text-[2rem] leading-none transition-colors',
                          isActive ? 'text-champagne' : 'text-ivory hover:text-champagne-light',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
            </ul>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="eyebrow text-champagne">Services</p>
                <Link to="/services" className="text-xs text-ivory/60 underline-offset-4 hover:underline">
                  View all
                </Link>
              </div>
              <Accordion.Root type="single" collapsible>
                {serviceCategories.map((cat) => (
                  <Accordion.Item key={cat.id} value={cat.id} className="border-b border-white/[0.07]">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex min-h-12 w-full items-center justify-between text-left text-[0.9375rem] text-ivory/85">
                        {cat.label}
                        <ChevronDown
                          aria-hidden
                          className="size-4 text-champagne transition-transform duration-300 group-data-[state=open]:rotate-180"
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <ul className="pb-3">
                        {getServicesByCategory(cat.id).map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className="block py-2 pl-3 text-sm text-ivory/60 hover:text-ivory"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </nav>

          <div className="border-t border-white/10 p-6">
            <Button asChild size="lg" className="w-full">
              <Link to="/contact">Plan Your Event</Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
