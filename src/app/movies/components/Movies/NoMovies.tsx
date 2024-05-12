import Image from 'next/image';
import noMoviesImg from '@images/no-movies.svg?url';
import { Flex, Text, rem } from '@mantine/core';

export function NoMovies() {
    return (
        <Flex direction='column' w='100%' h='100%' align='center' gap='1rem'>
            <Image src={noMoviesImg} alt='' />
            <Text fz={rem(20)} lh={rem(24)} fw={600}>
                We don&#39;t have such movies, look for another one
            </Text>
        </Flex>
    );
}
