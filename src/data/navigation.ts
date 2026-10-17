export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Why Aura', href: '/why-aura' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  company: [
    { label: 'About Aura', href: '/about' },
    { label: 'Why Aura', href: '/why-aura' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Plan Your Event', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};
