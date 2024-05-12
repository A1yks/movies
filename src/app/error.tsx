'use client';

import { Button, Center, Stack, Title } from '@mantine/core';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
    return (
        <Center h='100%' w='100%'>
            <Stack align='center'>
                <Title>An error occured: {error.message}</Title>
                <Button onClick={reset}>Try again</Button>
            </Stack>
        </Center>
    );
}
