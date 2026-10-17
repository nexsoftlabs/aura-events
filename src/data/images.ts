/**
 * Temporary demo photography (Unsplash License) stored locally in /public/images.
 * These do not depict Aura Events projects — replace with owned imagery before launch.
 * See public/images/CREDITS.md.
 */
export interface Photo {
  src: string;
  srcSet: string;
  /** Dominant tone shown while the image loads */
  placeholder: string;
}

function photo(name: string, large: number, small: number, placeholder = '#222936'): Photo {
  return {
    src: `/images/${name}.webp`,
    srcSet: `/images/${name}-${small}.webp ${small}w, /images/${name}.webp ${large}w`,
    placeholder,
  };
}

export const images = {
  hero: photo('hero', 2400, 1280, '#3a2a1c'),
  storyMain: photo('story-main', 1200, 640, '#c9b9a3'),
  storyDetail: photo('story-detail', 800, 480, '#d9cfc4'),
  interlude: photo('interlude', 2400, 1280, '#1b1d2a'),
  about: photo('about', 1600, 800, '#cfc5b5'),
  cta: photo('cta', 2000, 1000, '#2a1d14'),
  contact: photo('contact', 1600, 800, '#b8aa95'),
  services: {
    branding: photo('services/branding', 1200, 640, '#3b3b3b'),
    atl: photo('services/atl-btl', 1200, 640, '#1c1a24'),
    corporate: photo('services/corporate', 1200, 640, '#1a1f2e'),
    print: photo('services/print', 1200, 640, '#d8d2c8'),
    film: photo('services/film', 1200, 640, '#a69a86'),
    adFilm: photo('services/ad-film', 1200, 640, '#d9b531'),
    documentary: photo('services/documentary', 1200, 640, '#7d848c'),
    media: photo('services/media-ad', 1200, 640, '#131a24'),
    radio: photo('services/radio', 1200, 640, '#1d1d1f'),
    credit: photo('services/credit', 1200, 640, '#d8d4cc'),
    wedding: photo('services/wedding', 1200, 640, '#6b5440'),
    healthcare: photo('services/healthcare', 1200, 640, '#c9ced2'),
  },
  gallery: {
    stage: photo('gallery/stage', 1200, 640, '#151a26'),
    eveningWedding: photo('gallery/evening-wedding', 1200, 640, '#2a2420'),
    liveCrowd: photo('gallery/live-crowd', 1200, 640, '#2b1630'),
    projector: photo('gallery/projector', 1200, 640, '#1a1612'),
    balloons: photo('gallery/balloons', 1200, 640, '#3d6e78'),
    marquee: photo('gallery/marquee', 1200, 640, '#d6d9dc'),
    banquet: photo('gallery/banquet', 1200, 640, '#8a6a45'),
    sparklers: photo('gallery/sparklers', 1200, 640, '#1c1c22'),
    rings: photo('gallery/rings', 1200, 640, '#e6dcd4'),
    conferenceHall: photo('gallery/conference-hall', 1200, 640, '#b8b2a8'),
    toast: photo('gallery/toast', 1200, 640, '#5a4a38'),
    lights: photo('gallery/lights', 1200, 640, '#2a1840'),
  },
} as const;
