'use client';

import { MovieData, MoviesGrid, MoviesSkeleton } from '@/components';
import { MOVIES_PAGE_SIZE } from '@/constants/movies';
import { useRatedMovies } from '@/hooks';
import { useLayoutEffect, useState } from 'react';

export type MoviesDisplayControllerProps = {
    data: MovieData[];
};

export function ClientMovies({ data }: MoviesDisplayControllerProps) {
    const [moviesData, setMoviesData] = useState<MovieData[]>([]);
    const { isLoading, data: ratedMovies } = useRatedMovies();

    useLayoutEffect(() => {
        setMoviesData(
            data.map((movie) => ({
                ...movie,
                userRating: ratedMovies[movie.id]?.userRating,
            }))
        );
    }, [data, ratedMovies]);

    if (isLoading) {
        return <MoviesSkeleton items={MOVIES_PAGE_SIZE} />;
    }

    return <MoviesGrid data={moviesData} />;
}
