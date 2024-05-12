import { NextRequest, NextResponse } from 'next/server';
import { api } from './config';
import { GetMoviesRes } from './types';
import { getMoviesSchema } from './validation';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const params = Object.fromEntries(searchParams.entries());
    const { page = 1, sortBy = 'popularity.desc', genres, year, ratingFrom, ratingTo } = await getMoviesSchema.parseAsync(params);

    console.log('GET MOVIES API CALL');

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

    return NextResponse.json(movies.data);
}
