import { Suspense } from 'react';
import { Metadata } from 'next';
import { LinkPagination, MoviesSkeleton } from '@/components';
import { Flex, Stack, rem } from '@mantine/core';
import { getMovies } from '@/api/movies';
import { MAX_PAGES, MOVIES_PAGE_SIZE } from '@/constants/movies';
import { GetMoviesReq } from '@/api/types';
import { Movies } from './components';
import { createQueryString, validateSearchParams } from '@/utils';
import { RedirectType, redirect } from 'next/navigation';

type MoviesPageProps = {
    searchParams: Record<keyof GetMoviesReq, string>;
};

export const metadata: Metadata = {
    title: 'Movies',
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
    const { qs, data } = await validateSearchParams(searchParams);

    const moviesData = await getMovies(searchParams);

    if (data.page !== undefined && data.page > moviesData.total_pages) {
        redirect(`/movies?${createQueryString('page', moviesData.total_pages.toString(), qs)}`, RedirectType.replace);
    }

    const showPagination = moviesData.total_results > 0 && moviesData.total_pages > 1;

    return (
        <Stack h='100%' gap={rem(24)}>
            <Suspense key={qs} fallback={<MoviesSkeleton items={MOVIES_PAGE_SIZE} />}>
                <Movies />
            </Suspense>
            {showPagination && (
                <Flex justify={{ sm: 'flex-end', base: 'center' }} mt='auto'>
                    <LinkPagination total={Math.min(moviesData.total_pages, MAX_PAGES)} />
                </Flex>
            )}
        </Stack>
    );
}
