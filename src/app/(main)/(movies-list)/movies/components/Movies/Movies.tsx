import { Box, SimpleGrid, rem } from '@mantine/core';
import { MovieCard } from '@/components';
import { getGenres, getMovies } from '@/api/movies';
import { formatNumber } from '@/utils';
import { getSearchParams } from '@/utils/getSearchParams';
import { NoMovies } from './NoMovies';
import { getGenresAsString } from '@/utils/getGenresAsString';

export async function Movies() {
    const searchParams = getSearchParams();
    const [genres, moviesData] = await Promise.all([getGenres(), getMovies(searchParams)]);

    if (moviesData.total_results === 0) {
        return (
            <Box mt={rem(24)}>
                <NoMovies />
            </Box>
        );
    }

    return (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {moviesData.results.map((movie) => (
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    genres={getGenresAsString(genres, movie.genre_ids, 3)}
                    posterPath={movie.poster_path}
                    year={movie.release_date.split('-')[0]}
                    rating={Math.round(movie.vote_average * 10) / 10}
                    votes={formatNumber(movie.vote_count)}
                    id={movie.id}
                />
            ))}
        </SimpleGrid>
    );
}
