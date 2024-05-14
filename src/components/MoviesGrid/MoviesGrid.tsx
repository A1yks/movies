import { SimpleGrid } from '@mantine/core';
import { MovieCard, MovieCompactCardProps } from '../MovieCard';

export type MovieData = Omit<MovieCompactCardProps, 'variant'>;

export type MoviesGridProps = {
    data: MovieData[];
};

export function MoviesGrid({ data }: MoviesGridProps) {
    return (
        <SimpleGrid w='100%' cols={{ base: 1, sm: 2 }}>
            {data.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
            ))}
        </SimpleGrid>
    );
}
