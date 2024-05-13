import { Stack, Title, Box, rem } from '@mantine/core';
import { Filters, Sort } from './components';
import { getReleaseYears, getUrlInfo, deleteQueryParams } from '@/utils';
import { getGenres } from '@/api/movies';
import { redirect } from 'next/navigation';
import { getSearchParams } from '@/utils/getSearchParams';
import { getMoviesSchema } from '@/api/validation';

export default async function MoviesLayout({ children }: React.PropsWithChildren) {
    const searchParams = getSearchParams();
    const years = getReleaseYears();
    const genres = await getGenres();
    const genreValues = Array.from(genres.entries(), ([value, label]) => ({ value: value.toString(), label }));
    const { pathname, qs } = getUrlInfo();

    const { success } = await getMoviesSchema.safeParseAsync({
        ratingFrom: searchParams.ratingFrom,
        ratingTo: searchParams.ratingTo,
    });

    if (!success) {
        redirect(`${pathname}?${deleteQueryParams(['ratingFrom', 'ratingTo'], qs)}`);
    }

    return (
        <Stack gap={0} h='100%'>
            <Title fz={32}>Movies</Title>
            <Box pos='sticky' top={-10} bg='grey.1' pt={rem(24)} pb={18} style={{ zIndex: 100 }}>
                <Filters years={years} genres={genreValues} />
            </Box>
            <Box mt={rem(6)} style={{ alignSelf: 'flex-end' }}>
                <Sort />
            </Box>
            <Box mt={rem(24)} flex={1}>
                {children}
            </Box>
        </Stack>
    );
}
