'use client';

import { ProductionCompany } from '@/api/types';
import { MovieBigCardProps, MovieCard, MovieInfo, PageLoader } from '@/components';
import { useRatedMovies } from '@/hooks';
import { Stack, rem, Breadcrumbs, Anchor } from '@mantine/core';
import Link from 'next/link';

export type MovieInfoContentProps = Omit<MovieBigCardProps, 'variant'> & {
    trailerKey?: string;
    description: string;
    companies: ProductionCompany[];
};

export function MovieInfoContent({ trailerKey, description, companies, ...movieCardProps }: MovieInfoContentProps) {
    const { isLoading, data } = useRatedMovies();

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <Stack gap={rem(20)}>
            <Breadcrumbs>
                <Anchor component={Link} href='/movies' lh='143%' fz={rem(14)}>
                    Movies
                </Anchor>
                <Anchor component={Link} href={`/movies/${movieCardProps.id}`} lh='143%' fz={rem(14)}>
                    {movieCardProps.title}
                </Anchor>
            </Breadcrumbs>
            <MovieCard variant='big' {...movieCardProps} userRating={data[movieCardProps.id]?.userRating} />
            <MovieInfo trailerKey={trailerKey} description={description} companies={companies} />
        </Stack>
    );
}
