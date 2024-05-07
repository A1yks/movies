'use client';

import { Box, Container, Group, rem } from '@mantine/core';
import { Navbar } from '../Navbar';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <Box display='flex' h='100%' w='100%' style={{ justifyContent: 'center' }}>
            <Group maw={1440} w='100%' gap={0}>
                <Box w={280} h='100%'>
                    <Navbar />
                </Box>
                <Box flex={1} bg='grey.1' h='100%'>
                    <Container mx={rem(74)} size={rem(980)} px='md' py={rem(40)} style={{ boxSizing: 'content-box' }}>
                        {children}
                    </Container>
                </Box>
            </Group>
        </Box>
    );
};
