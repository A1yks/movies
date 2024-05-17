import { cache } from 'react';
import { api } from '.';
import { GetGenresRes, GetMoviesReq, GetMoviesRes, MovieDetails } from './types';
import { getMoviesSchema } from './validation';
import { withErrorsHandler } from '@/utils';

export const getGenres = cache(
    withErrorsHandler(async () => {
        const genres = await api.get<GetGenresRes>('/genre/movie/list');
        const genresMap = new Map<number, string>();

        genres.data.genres.forEach((genre) => {
            genresMap.set(genre.id, genre.name);
        });

        return genresMap;
    })
);

const getMoviesCached = cache(
    withErrorsHandler(async (_page: string, _genres: string, _year: string, _ratingFrom: string, _ratingTo: string, _sortBy: string) => {
        const { page, genres, year, ratingFrom, ratingTo, sortBy } = await getMoviesSchema.parseAsync({
            page: _page,
            genres: _genres,
            year: _year,
            ratingFrom: _ratingFrom,
            ratingTo: _ratingTo,
            sortBy: _sortBy,
        });

        const movies = await api.get<GetMoviesRes>('/discover/movie', {
            params: {
                language: 'en-US',
                page,
                sort_by: sortBy,
                with_genres: genres?.join(','),
                primary_release_year: year,
                'vote_average.gte': ratingFrom,
                'vote_average.lte': ratingTo,
            },
        });

        return movies.data;
    })
);

export const getMovie = cache(
    withErrorsHandler(async (id: string) => {
        const movie = await api.get<MovieDetails>(`/movie/${id}`, { params: { append_to_response: 'videos' } });

        return movie.data;
    })
);

// A wrapper function that allows passing objects, as cache() compares objects only by references and not by their value
export async function getMovies({ page, genres, year, ratingFrom, ratingTo, sortBy }: Record<keyof GetMoviesReq, string>) {
    return await getMoviesCached(page, genres, year, ratingFrom, ratingTo, sortBy);
}
