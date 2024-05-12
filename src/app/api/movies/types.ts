import { z } from 'zod';
import { getMoviesSchema } from './validation';

export type GetMoviesReq = z.infer<typeof getMoviesSchema>;

export type MovieInfo = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type GetMoviesRes = {
    page: number;
    results: MovieInfo[];
    total_pages: number;
    total_results: number;
};
