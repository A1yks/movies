import { Box, Center, CenterProps, Stack, Text, rem } from '@mantine/core';
import Image from 'next/image';
import { MovieCardProps } from './MovieCard';
import { TMDB_IMAGES_URL } from '@/constants/movies';

type PosterProps = {
    posterPath: MovieCardProps['posterPath'];
    width: number;
    height: number;
} & CenterProps;

export function Poster({ posterPath, width, height, ...others }: PosterProps) {
    if (posterPath) {
        return (
            <Image
                src={`${TMDB_IMAGES_URL}/w342/${posterPath}`}
                width={width}
                height={height}
                alt='poster'
                priority
                style={{ flexShrink: 0, objectFit: 'cover' }}
            />
        );
    }

    return (
        <Center bg='grey.2' w={width} h={height} style={{ border: '1px solid var(--mantine-color-grey-1)' }} {...others}>
            <Stack gap={4} align='center'>
                <Box component={Image} src='/images/no-image.svg' width={24} height={24} alt='' />
                <Text c='grey.5' fz={rem(12)} fw={500} lh={rem(16)}>
                    No Poster
                </Text>
            </Stack>
        </Center>
    );
}
