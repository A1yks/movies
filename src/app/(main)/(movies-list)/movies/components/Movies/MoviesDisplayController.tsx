'use client';

import { MovieData, MoviesGrid, MoviesSkeleton, PageLoader } from '@/components';
import { useRatedMovies } from '@/hooks';
import { useLayoutEffect, useState } from 'react';

export type MoviesDisplayControllerProps = {
    data: MovieData[];
};

export function MoviesDisplayController({ data }: MoviesDisplayControllerProps) {
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
        return <MoviesSkeleton items={20} />;
    }

    return <MoviesGrid data={moviesData} />;
}
