'use server';

import { cache } from 'react';
import { api } from '.';
import { GetGenresRes, GetMoviesReq, GetMoviesRes } from './types';
import { getMoviesSchema } from './validation';

export const getGenres = cache(async () => {
    const genres = await api.get<GetGenresRes>('/genre/movie/list');
    const genresMap = new Map<number, string>();

    genres.data.genres.forEach((genre) => {
        genresMap.set(genre.id, genre.name);
    });

    return genresMap;
});

const getMoviesCached = cache(
    async (
        _page: GetMoviesReq['page'],
        _genres: GetMoviesReq['genres'],
        _year: GetMoviesReq['year'],
        _ratingFrom: GetMoviesReq['ratingFrom'],
        _ratingTo: GetMoviesReq['ratingTo'],
        _sortBy: GetMoviesReq['sortBy']
    ) => {
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
    }
);

export const getMovies = async ({ page, genres, year, ratingFrom, ratingTo, sortBy }: GetMoviesReq) => {
    return await getMoviesCached(page, genres, year, ratingFrom, ratingTo, sortBy);
};
