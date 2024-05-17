import { Box, rem } from '@mantine/core';
import { getGenres, getMovies } from '@/api/movies';
import { formatNumber, getSearchParams, getGenresAsString } from '@/utils';
import { MoviesDisplayController } from './MoviesDisplayController';
import { EmptySearchResult, MovieData } from '@/components';
import { GetMoviesReq } from '@/api/types';

export async function Movies() {
    const searchParams = getSearchParams() as Record<keyof GetMoviesReq, string>;
    const [genres, moviesData] = await Promise.all([getGenres(), getMovies(searchParams)]);

    if (moviesData.total_results === 0) {
        return (
            <Box mt={{ sm: rem(24) }}>
                <EmptySearchResult />
            </Box>
        );
    }

    const data = moviesData.results.map<MovieData>((movie) => ({
        id: movie.id,
        title: movie.title,
        genres: getGenresAsString(genres, movie.genre_ids || [], 3),
        posterPath: movie.poster_path,
        year: movie.release_date?.split('-')[0],
        rating: Math.round((movie.vote_average || 0) * 10) / 10,
        votes: formatNumber(movie.vote_count || 0),
    }));

    return <MoviesDisplayController data={data} />;
}
