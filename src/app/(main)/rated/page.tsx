'use client';

import { useRatedMovies } from '@/hooks';
import { NoMovies } from './components';
import { EmptySearchResult, LinkPagination, MovieData, MoviesGrid, MoviesSkeleton, PageLoader } from '@/components';
import { Stack, rem } from '@mantine/core';
import { redirect, useSearchParams } from 'next/navigation';
import { createQueryString } from '@/utils/createQueryString';
import { useMemo } from 'react';
import { RATED_MOVIES_PAGE_SIZE } from '@/constants/movies';

export default function RatedMovies() {
    const { isLoading, data } = useRatedMovies();
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1);
    const search = searchParams.get('search') || '';

    const ratedMovies = Object.values(data || {}) as MovieData[];

    const filteredMovies = useMemo(
        () => ratedMovies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase())),
        [ratedMovies, search]
    );

    const totalPages = Math.ceil(filteredMovies.length / RATED_MOVIES_PAGE_SIZE);

    if (isLoading) {
        return <MoviesSkeleton items={RATED_MOVIES_PAGE_SIZE} />;
    }

    if (ratedMovies.length === 0) {
        return <NoMovies />;
    }

    if (filteredMovies.length === 0) {
        return <EmptySearchResult text="You don't have any movies with this title" />;
    }

    if (page > totalPages) {
        redirect(`/rated?${createQueryString('page', totalPages.toString(), searchParams.toString())}`);
    }

    const slicedData = filteredMovies.slice((page - 1) * RATED_MOVIES_PAGE_SIZE, page * RATED_MOVIES_PAGE_SIZE);

    return (
        <Stack align='center' gap={rem(24)}>
            <MoviesGrid data={slicedData} />
            {totalPages > 1 && <LinkPagination total={totalPages} pathname='/rated' />}
        </Stack>
    );
}
