import { Group, Stack, Title, rem } from '@mantine/core';
import { Search } from './components';

export default function RatedMoviesLayout({ children }: React.PropsWithChildren) {
    return (
        <Stack gap={rem(40)} h='100%'>
            <Group justify='space-between' align='center'>
                <Title>Rated movies</Title>
                <Search />
            </Group>
            {children}
        </Stack>
    );
}
