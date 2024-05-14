import { Box, rem } from '@mantine/core';
import { getGenres, getMovies } from '@/api/movies';
import { formatNumber, getSearchParams, getGenresAsString } from '@/utils';
import { MoviesDisplayController } from './MoviesDisplayController';
import { EmptySearchResult, MovieData } from '@/components';

export async function Movies() {
    const searchParams = getSearchParams();
    const [genres, moviesData] = await Promise.all([getGenres(), getMovies(searchParams)]);

    if (moviesData.total_results === 0) {
        return (
            <Box mt={rem(24)}>
                <EmptySearchResult />
            </Box>
        );
    }

    const data = moviesData.results.map<MovieData>((movie) => ({
        id: movie.id,
        title: movie.title,
        genres: getGenresAsString(genres, movie.genre_ids, 3),
        posterPath: movie.poster_path,
        year: movie.release_date.split('-')[0],
        rating: Math.round(movie.vote_average * 10) / 10,
        votes: formatNumber(movie.vote_count),
    }));

    return <MoviesDisplayController data={data} />;
}
