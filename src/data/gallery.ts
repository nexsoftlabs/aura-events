import { images, type Photo } from '@/data/images';

export type GalleryCategory = 'Corporate' | 'Wedding' | 'Celebrations' | 'Branding' | 'Film & Media';

export interface GalleryItem {
  id: string;
  photo: Photo;
  alt: string;
  category: GalleryCategory;
  aspect: 'portrait' | 'landscape' | 'square';
}

/**
 * Visual inspiration only — licensed stock imagery, NOT Aura Events projects.
 * Replace with verified case studies (and set siteConfig.featureFlags.portfolioHasProjects).
 */
export const inspirationGallery: GalleryItem[] = [
  { id: 'banquet', photo: images.gallery.banquet, alt: 'Banquet hall set for a reception with chandeliers', category: 'Wedding', aspect: 'portrait' },
  { id: 'stage', photo: images.gallery.stage, alt: 'Presenter on stage in front of a large audience', category: 'Corporate', aspect: 'landscape' },
  { id: 'sparklers', photo: images.gallery.sparklers, alt: 'Guests holding sparklers at an evening celebration', category: 'Celebrations', aspect: 'square' },
  { id: 'live-crowd', photo: images.gallery.liveCrowd, alt: 'Audience with raised phones at a live stage show', category: 'Branding', aspect: 'portrait' },
  { id: 'rings', photo: images.gallery.rings, alt: 'Wedding rings resting on soft pink roses', category: 'Wedding', aspect: 'square' },
  { id: 'projector', photo: images.gallery.projector, alt: 'Vintage film projector casting a beam of light', category: 'Film & Media', aspect: 'landscape' },
  { id: 'conference-hall', photo: images.gallery.conferenceHall, alt: 'Conference hall arranged with tables and projection screens', category: 'Corporate', aspect: 'landscape' },
  { id: 'evening-wedding', photo: images.gallery.eveningWedding, alt: 'Couple embracing at an evening wedding', category: 'Wedding', aspect: 'portrait' },
  { id: 'balloons', photo: images.gallery.balloons, alt: 'Colourful balloons for a birthday celebration', category: 'Celebrations', aspect: 'square' },
  { id: 'lights', photo: images.gallery.lights, alt: 'Vivid stage lighting over a concert crowd', category: 'Branding', aspect: 'landscape' },
  { id: 'marquee', photo: images.gallery.marquee, alt: 'White marquee dressed for a daytime reception', category: 'Wedding', aspect: 'landscape' },
  { id: 'toast', photo: images.gallery.toast, alt: 'Guests raising glasses for a toast', category: 'Celebrations', aspect: 'portrait' },
];

export const galleryCategories: GalleryCategory[] = ['Corporate', 'Wedding', 'Celebrations', 'Branding', 'Film & Media'];
