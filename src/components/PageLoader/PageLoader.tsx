'use client';

import { Center, CenterProps, Loader } from '@mantine/core';

export type PageLoaderProps = CenterProps;

export function PageLoader(props: CenterProps) {
    return (
        <>
            <title>Loading...</title>
            <Center h='100%' w='100%' {...props}>
                <Loader />
            </Center>
        </>
    );
}
