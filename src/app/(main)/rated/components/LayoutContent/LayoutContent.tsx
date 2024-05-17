'use client';

import { Group, Skeleton, Stack, rem } from '@mantine/core';
import { useRatedMovies } from '@/hooks';
import { MovieData, MoviesSkeleton, PageTitle } from '@/components';
import { RATED_MOVIES_PAGE_SIZE } from '@/constants/movies';
import { Search } from '../Search';

export function LayoutContent({ children }: React.PropsWithChildren) {
    const { data, isLoading } = useRatedMovies();

    const ratedMovies = Object.values(data || {}) as MovieData[];

    return (
        <Stack gap={rem(40)} h='100%'>
            {isLoading ? (
                <>
                    <Group justify='space-between' align='center'>
                        <Skeleton w='100%' maw={rem(210)} h={rem(42)} />
                        <Skeleton w='100%' maw={rem(490)} h={rem(42)} />
                    </Group>
                    <MoviesSkeleton items={RATED_MOVIES_PAGE_SIZE} />
                </>
            ) : (
                <>
                    {ratedMovies.length > 0 && (
                        <Group justify='space-between' align='center'>
                            <PageTitle>Rated Movies</PageTitle>
                            <Search />
                        </Group>
                    )}
                    {children}
                </>
            )}
        </Stack>
    );
}
