import { Logo, SpecialPageContent } from '@/components';
import notFoundImg from '@images/not-found.svg?url';
import { Box, Button, Center, Stack, rem } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Stack h='100vh' w='100%' gap={0} bg='grey.1'>
            <Box p={rem(24)}>
                <Logo />
            </Box>
            <Center flex={1} mt={rem(-24)} px={rem(24)}>
                <SpecialPageContent
                    image={
                        <Box pos='relative' maw={rem(656)} mah={rem(196)} w='100%' h='100%' mb='2rem'>
                            <Image src={notFoundImg} alt='' fill />
                        </Box>
                    }
                    mainText='We can’t find the page you are looking for'
                    button={
                        <Button component={Link} href='/'>
                            Go home
                        </Button>
                    }
                />
            </Center>
        </Stack>
    );
}
