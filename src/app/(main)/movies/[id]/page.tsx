import { getMovie } from '@/api/movies';
import { formatNumber } from '@/utils';
import { formatDate } from '@/utils/formatDate';
import { formatDuration } from '@/utils/formatDuration';
import { formatMoney } from '@/utils/formatMoney';
import { MovieInfoContent } from './components';

type MoviePageProps = {
    params: {
        id: string;
    };
};

export default async function MoviePage({ params }: MoviePageProps) {
    const movie = await getMovie(params.id);
    const hasBudget = movie.budget > 0;
    const hasGross = movie.revenue > 0;

    return (
        <MovieInfoContent
            id={movie.id}
            title={movie.title}
            genres={movie.genres.map((genre) => genre.name)}
            posterPath={movie.poster_path}
            year={movie.release_date.split('-')[0]}
            rating={Math.round(movie.vote_average * 10) / 10}
            votes={formatNumber(movie.vote_count)}
            budget={hasBudget ? formatMoney(movie.budget) : 'unknown'}
            gross={hasGross ? formatMoney(movie.revenue) : 'unknown'}
            duration={formatDuration(movie.runtime)}
            premiereDate={formatDate(movie.release_date)}
            trailerKey={movie.videos.results[0]?.key}
            description={movie.overview}
            companies={movie.production_companies}
        />
    );
}
