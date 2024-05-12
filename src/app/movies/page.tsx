import { ClientPagination, Movies } from './components';
import { Suspense } from 'react';
import { PageLoader } from '@/components';
import { GetMoviesReq } from '../api/movies/types';
import { getUrlInfo } from '@/utils/getUrlInfo';
import { Flex, Stack, rem } from '@mantine/core';
import { getMovies } from '@/api/movies';
import { MAX_PAGES } from '@/constants/movies';

type MoviesPageProps = {
    searchParams: GetMoviesReq;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
    const { qs } = getUrlInfo();
    const moviesData = await getMovies(searchParams);

    return (
        <Stack h='100%' gap={rem(24)}>
            <Suspense key={qs} fallback={<PageLoader flex={1} />}>
                <Movies />
            </Suspense>
            {moviesData.total_results > 0 && (
                <Flex justify='flex-end' mt='auto'>
                    <ClientPagination totalPages={Math.min(moviesData.total_pages, MAX_PAGES)} />
                </Flex>
            )}
        </Stack>
    );
}
