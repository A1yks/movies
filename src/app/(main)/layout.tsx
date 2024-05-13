import { Flex, Group, Box, Container, rem } from '@mantine/core';
import { Navbar } from './components';

export default function MainLayout({ children }: React.PropsWithChildren) {
    return (
        <Flex mih='100vh' w='100%' justify='center'>
            <Group maw={1440} w='100%' gap={0} align='flex-start'>
                <Box w={rem(280)} h='100vh' pos='sticky' top={0}>
                    <Navbar />
                </Box>
                <Box flex={1} bg='grey.1' h='100%'>
                    <Container h='100%' size={rem(1044)} px={rem(32)} py={rem(40)}>
                        {children}
                    </Container>
                </Box>
            </Group>
        </Flex>
    );
}
