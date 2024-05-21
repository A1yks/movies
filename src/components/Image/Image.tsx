'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = NextImageProps;

/**
 * This component will fallback to the original image if the optimized image fails to load
 *
 * Vercel free tier supports only 1000 free image optimizations,
 * once the limit is reached, images will fail to optimize and return a runtime error
 */
export function Image({ style, ...others }: ImageProps) {
    return (
        <NextImage
            style={{ display: 'block', textIndent: -10000, ...style }}
            {...others}
            onError={(e) => {
                const img = e.target as HTMLImageElement;

                img.srcset = others.src.toString();
            }}
        />
    );
}
