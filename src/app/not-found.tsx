import { Logo, SpecialPageContent, Image } from '@/components';
import notFoundImg from '@images/not-found.svg?url';
import { Box, Button, Center, Stack, rem } from '@mantine/core';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Not found',
};

export default function NotFound() {
    return (
        <Stack h='100vh' w='100%' gap={0} bg='grey.1'>
            <Box p={rem(24)}>
                <Logo />
            </Box>
            <Center flex={1} mt={rem(-24)} px={rem(24)}>
                <SpecialPageContent
                    image={
                        <Image
                            priority
                            src={notFoundImg}
                            alt=''
                            style={{ width: '100%', maxWidth: notFoundImg.width, height: 'auto', marginBottom: '2rem' }}
                        />
                    }
                    mainText='We can’t find the page you are looking for'
                    button={
                        <Button component={Link} href='/movies'>
                            Go home
                        </Button>
                    }
                />
            </Center>
        </Stack>
    );
}
