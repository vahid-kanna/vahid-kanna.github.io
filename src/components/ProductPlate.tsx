import React from 'react';
import { ProjectImage } from '../data/work';
import { Link } from './Link';

interface ProductPlateProps {
  image: ProjectImage;
  priority?: boolean;
  href?: string;
  linkLabel?: string;
  onNavigate?: (path: string) => void;
}

export const ProductPlate: React.FC<ProductPlateProps> = ({
  image,
  priority = false,
  href,
  linkLabel,
  onNavigate,
}) => {
  const plateInner = (
    <div
      className={`product-plate overflow-hidden p-2 sm:p-2.5 ${
        href ? 'transition-[border-color,box-shadow] duration-150 hover:border-[var(--border-strong)] hover:shadow-[0_4px_14px_rgba(20,20,19,0.06)]' : ''
      }`}
    >
      <div className="overflow-hidden rounded-[6px] border border-[var(--border)] bg-[var(--surface-subtle)]">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          className="block aspect-[16/10] w-full object-cover object-top"
        />
      </div>
    </div>
  );

  return (
    <figure className="m-0">
      {href ? (
        <Link
          to={href}
          onNavigate={onNavigate}
          aria-label={linkLabel ?? image.alt}
          className="block rounded-[10px]"
        >
          {plateInner}
        </Link>
      ) : (
        plateInner
      )}
      <figcaption className="mt-2.5 text-[13px] leading-[1.5] text-[var(--ink-muted)]">
        {image.caption}
      </figcaption>
    </figure>
  );
};
