'use client';

import { Button, Center, Stack, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export function ErrorBoundary({ error, reset }: ErrorProps) {
    const router = useRouter();

    return (
        <Center h='100%' w='100%'>
            <Stack align='center'>
                <Title>{error.message}</Title>
                <Button
                    onClick={() => {
                        router.refresh();
                        reset();
                    }}
                >
                    Try again
                </Button>
            </Stack>
        </Center>
    );
}
