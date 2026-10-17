import { useState, type ImgHTMLAttributes } from 'react';
import type { Photo } from '@/data/images';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> {
  photo: Photo;
  /** Empty string marks the image as decorative */
  alt: string;
  priority?: boolean;
  sizes?: string;
  wrapperClassName?: string;
}

export function ResponsiveImage({
  photo,
  alt,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  wrapperClassName,
  ...props
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden', wrapperClassName)}
      style={{ backgroundColor: photo.placeholder }}
    >
      {failed ? null : (
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'size-full object-cover transition-opacity duration-700',
            loaded || priority ? 'opacity-100' : 'opacity-0',
            className,
          )}
          {...props}
        />
      )}
    </div>
  );
}
