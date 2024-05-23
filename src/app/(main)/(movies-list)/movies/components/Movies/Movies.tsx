import { getGenres, getMovies } from '@/api/movies';
import { formatNumber, getSearchParams, getGenresAsString, withErrorCatch } from '@/utils';
import { ClientMovies } from './ClientMovies';
import { EmptySearchResult, MovieData } from '@/components';
import { GetMoviesReq } from '@/api/types';

async function MoviesComponent() {
    const searchParams = getSearchParams() as Record<keyof GetMoviesReq, string>;
    const [genres, moviesData] = await Promise.all([getGenres(), getMovies(searchParams)]);

    if (moviesData.total_results === 0) {
        return (
            <div>
                <EmptySearchResult />
            </div>
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

    return <ClientMovies data={data} />;
}

export const Movies = withErrorCatch(MoviesComponent);
