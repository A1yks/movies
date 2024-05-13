import { ClientPagination, Movies } from './components';
import { Suspense } from 'react';
import { PageLoader } from '@/components';
import { getUrlInfo } from '@/utils/getUrlInfo';
import { Flex, Stack, rem } from '@mantine/core';
import { getMovies } from '@/api/movies';
import { MAX_PAGES } from '@/constants/movies';
import { GetMoviesReq } from '@/api/types';

type MoviesPageProps = {
    searchParams: GetMoviesReq;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
    const { qs } = getUrlInfo();
    const moviesData = await getMovies(searchParams);
    const showPagination = moviesData.total_results > 0 && moviesData.total_pages > 1;

    return (
        <Stack h='100%' gap={rem(24)}>
            <Suspense key={qs} fallback={<PageLoader flex={1} />}>
                <Movies />
            </Suspense>
            {showPagination && (
                <Flex justify='flex-end' mt='auto'>
                    <ClientPagination totalPages={Math.min(moviesData.total_pages, MAX_PAGES)} />
                </Flex>
            )}
        </Stack>
    );
}
