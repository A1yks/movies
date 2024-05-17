import { Flex, Group, Box, Container, rem } from '@mantine/core';
import { Navbar } from '@/components';

export default function MainLayout({ children }: React.PropsWithChildren) {
    return (
        <Flex mih='100vh' w='100%' justify='center'>
            <Group w='100%' gap={0} align='flex-start' wrap='nowrap'>
                <Box h='100vh' pos='sticky' top={0} visibleFrom='sm' style={{ width: 'clamp(15rem, 25vw, 17.5rem)' }}>
                    <Navbar />
                </Box>
                <Box flex={1} bg='grey.1' h='100%'>
                    <Container h='100%' size={rem(1044)} px={{ sm: rem(32), base: rem(24) }} py={{ sm: rem(40), base: rem(20) }}>
                        {children}
                    </Container>
                </Box>
            </Group>
        </Flex>
    );
}
