import { MAX_PAGES } from '@/constants/movies';
import { getReleaseYears } from '@/utils/getReleaseYears';
import { splitQueryParam } from '@/utils/splitQueryParam';
import { z } from 'zod';

const years = getReleaseYears();
const minYear = Number(years.at(-1));
const maxYear = Number(years[0]);

export const getMoviesSchema = z
    .object({
        page: z.coerce.number().int().min(1).max(MAX_PAGES).default(1).optional(),
        genres: z
            .string()
            .transform((value) => splitQueryParam(value, ',').map(Number))
            .pipe(z.number().array())
            .optional(),
        year: z.coerce.number().int().min(minYear).max(maxYear).optional(),
        sortBy: z
            .enum(['popularity.desc', 'popularity.asc', 'vote_average.desc', 'vote_average.asc', 'vote_count.desc', 'vote_count.asc'])
            .optional()
            .default('popularity.desc'),
        ratingFrom: z.coerce.number().int().min(0).max(9).optional().default(0),
        ratingTo: z.coerce.number().int().min(1).max(10).optional().default(10),
    })
    .refine(
        (schema) => {
            if (schema.ratingFrom !== undefined && schema.ratingTo !== undefined && schema.ratingFrom >= schema.ratingTo) {
                return false;
            }

            return true;
        },
        { message: 'Rating from must be less than rating to and both must be between 0 and 10', path: ['ratingFrom', 'ratingTo'] }
    );

export const getMovieSchema = z.object({
    id: z.coerce.number().int().min(1),
});
