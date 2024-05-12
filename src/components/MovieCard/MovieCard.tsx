import { Box, Card, Center, Group, Stack, Text, Tooltip, rem } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieCard.module.scss';
import { Poster } from './Poster';
import Star from '@images/star.svg';

export type MovieCardProps = {
    posterPath?: string;
    title: string;
    year: string;
    rating: number;
    genres: string[];
    votes: string;
    id: number;
};

export function MovieCard({ posterPath, title, year, rating, genres, votes, id }: MovieCardProps) {
    return (
        <Card fz='1rem' h={rem(218)} p={rem(24)}>
            <Group gap='0.5rem' align='flex-start' justify='space-between' wrap='nowrap'>
                <Group gap='1rem' wrap='nowrap' align='stretch'>
                    <Text component={Link} href={`/movies/${id}`}>
                        <Poster posterPath={posterPath} width={119} height={170} />
                    </Text>
                    <Stack gap={0} justify='space-between'>
                        <Stack gap='0.5rem' align='flex-start'>
                            <Text component={Link} href={`/movies/${id}`} c='purple' className={styles.title}>
                                {title}
                            </Text>
                            <Text fw={400} c='grey.6'>
                                {year}
                            </Text>
                            <Group gap='0.5rem'>
                                <Group gap={4}>
                                    <Star fill='var(--mantine-color-yellow-filled)' />
                                    <Text fw={600} c='black' lh='125%'>
                                        {rating}
                                    </Text>
                                </Group>
                                <Text c='grey.6' lh='125%'>
                                    ({votes})
                                </Text>
                            </Group>
                        </Stack>
                        <Group gap='0.5rem' mt='0.5rem' style={{ rowGap: 0 }}>
                            <Text c='grey.6'>Genres</Text>
                            <Text c='black' tt='capitalize'>
                                {genres.join(', ')}
                            </Text>
                        </Group>
                    </Stack>
                </Group>
                <Tooltip label='Rate movie'>
                    <Star cursor='pointer' className={styles.rateIcon} />
                </Tooltip>
            </Group>
        </Card>
    );
}
