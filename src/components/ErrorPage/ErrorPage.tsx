'use client';

import { Button, Center, Stack, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

type ErrorProps = {
    error: string | (Error & { digest?: string });
    reset?: () => void;
};

export function ErrorPage({ error, reset }: ErrorProps) {
    console.log(error);

    const router = useRouter();
    const message = typeof error === 'string' ? error : error.message;

    return (
        <Center h='100%' w='100%'>
            <Stack align='center'>
                <Title>{message}</Title>
                <Button
                    onClick={() => {
                        router.refresh();
                        reset?.();
                    }}
                >
                    Try again
                </Button>
            </Stack>
        </Center>
    );
}
