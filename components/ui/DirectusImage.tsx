import Image from 'next/image';
import { env } from '@/lib/env';

interface DirectusImageProps {
  uuid: string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function DirectusImage({ uuid, alt, width, height, fill, className, priority, sizes }: DirectusImageProps) {
  if (!uuid) return <div className={`bg-gray-200 ${className}`} />;

  const src = `${env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${uuid}`;

  return (
    <Image
      src={src}
      alt={alt}
      width={!fill ? width || 800 : undefined}
      height={!fill ? height || 600 : undefined}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes}
      style={{ objectFit: fill ? 'cover' : undefined }}
    />
  );
}
