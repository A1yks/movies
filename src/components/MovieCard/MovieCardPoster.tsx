import { Image, ImageProps } from '@/components';
import { Box, BoxProps, Center, Stack, Text, rem } from '@mantine/core';
import { TMDB_IMAGES_URL } from '@/constants/movies';
import { MovieCardProps } from './MovieCard';

type Sizes = 'w342' | 'w500' | 'w780' | 'original';

type PosterProps = {
    posterPath: MovieCardProps['posterPath'];
    size?: Sizes;
    imageProps?: Omit<ImageProps, 'src' | 'alt'>;
} & BoxProps;

export function MovieCardPoster({ posterPath, size = 'w342', imageProps = {}, ...others }: PosterProps) {
    const { style: imgStyle, ...otherImgProps } = imageProps;

    if (posterPath) {
        return (
            <Box pos='relative' h='100%' {...others}>
                <Image
                    src={`${TMDB_IMAGES_URL}/${size}/${posterPath}`}
                    alt=''
                    style={{ flexShrink: 0, objectFit: 'cover', objectPosition: 'top', ...imgStyle }}
                    {...otherImgProps}
                />
            </Box>
        );
    }

    return (
        <Center bg='grey.2' w={imageProps.width} h='100%' style={{ border: '1px solid var(--mantine-color-grey-1)' }} {...others}>
            <Stack gap={4} align='center'>
                <Box component={Image} src='/images/no-image.svg' width={24} height={24} alt='' />
                <Text c='grey.5' fz={rem(12)} fw={500} lh={rem(16)} ta='center'>
                    No Poster
                </Text>
            </Stack>
        </Center>
    );
}
