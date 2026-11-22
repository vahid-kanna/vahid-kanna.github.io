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
  const inner = (
    <div
      className={`product-plate overflow-hidden p-2 sm:p-2.5 ${
        href ? 'hover:border-white/25' : ''
      }`}
    >
      <div className="overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#161615]">
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
          className="block rounded-[14px]"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
      <figcaption className="mt-2.5 text-[13px] leading-[1.55] text-[var(--mut)]">
        {image.caption}
      </figcaption>
    </figure>
  );
};
