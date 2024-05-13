import { getMovie } from '@/api/movies';
import { MovieCard, MovieInfo } from '@/components';
import { formatNumber } from '@/utils';
import { formatDate } from '@/utils/formatDate';
import { formatDuration } from '@/utils/formatDuration';
import { formatMoney } from '@/utils/formatMoney';
import { Anchor, Breadcrumbs, Stack, rem } from '@mantine/core';
import Link from 'next/link';

type MoviePageProps = {
    params: {
        id: string;
    };
};

export default async function MoviePage({ params }: MoviePageProps) {
    const movie = await getMovie(params.id);

    return (
        <Stack gap={rem(20)}>
            <Breadcrumbs>
                <Anchor component={Link} href='/movies' lh='143%' fz={rem(14)}>
                    Movies
                </Anchor>
                <Anchor component={Link} href={`/movies/${params.id}`} lh='143%' fz={rem(14)}>
                    {movie.title}
                </Anchor>
            </Breadcrumbs>
            <MovieCard
                variant='big'
                id={movie.id}
                title={movie.title}
                genres={movie.genres.map((genre) => genre.name)}
                posterPath={movie.poster_path}
                year={movie.release_date.split('-')[0]}
                rating={Math.round(movie.vote_average * 10) / 10}
                votes={formatNumber(movie.vote_count)}
                budget={formatMoney(movie.budget)}
                duration={formatDuration(movie.runtime)}
                gross={formatMoney(movie.revenue)}
                premiereDate={formatDate(movie.release_date)}
            />
            <MovieInfo trailerKey={movie.videos.results[0]?.key} description={movie.overview} companies={movie.production_companies} />
        </Stack>
    );
}
