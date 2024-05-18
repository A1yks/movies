import { getGenres } from '@/api/movies';
import { Stack, Box, rem } from '@mantine/core';
import { PageTitle } from '@/components';
import { getReleaseYears } from '@/utils';
import { Filters, Sort } from './components';

export default async function MoviesLayout({ children }: React.PropsWithChildren) {
    const years = getReleaseYears();
    const genres = await getGenres();
    const genreValues = Array.from(genres.entries(), ([value, label]) => ({ value: value.toString(), label }));

    return (
        <Stack gap={0} h='100%'>
            <PageTitle mb={{ md: rem(16) }}>Movies</PageTitle>
            <Box pos={{ md: 'sticky' }} top={-10} bg='grey.1' pt={rem(24)} pb={{ md: 18, base: 0 }} style={{ zIndex: 100 }}>
                <Filters years={years} genres={genreValues} />
            </Box>
            <Box mt={{ md: rem(6), base: 0 }} w={{ md: 'auto', base: '100%' }} style={{ alignSelf: 'flex-end' }}>
                <Sort />
            </Box>
            <Box mt={rem(24)} flex={1}>
                {children}
            </Box>
        </Stack>
    );
}
