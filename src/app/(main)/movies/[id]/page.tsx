import { getMovie } from '@/api/movies';
import { formatNumber } from '@/utils';
import { formatDate, formatDuration, formatMoney } from '@/utils';
import { MovieInfoContent } from './components';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { TMDB_IMAGES_URL } from '@/constants/movies';

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

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
    const movie = await getMovie(params.id);

    return {
        title: movie.title,
        description: movie.overview,
        openGraph: {
            title: movie.title,
            description: movie.overview,
            url: headers().get('x-url') as string,
            siteName: process.env.NEXT_PUBLIC_SITE_NAME,
            images: [
                {
                    url: `${TMDB_IMAGES_URL}/w780/${movie.poster_path}`,
                    width: 780,
                    height: 520,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
    };
}
