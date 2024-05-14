import { SimpleGrid, SimpleGridProps, Skeleton, rem } from '@mantine/core';

export type MoviesSkeletonProps = { items: number } & SimpleGridProps;

export function MoviesSkeleton({ items, ...others }: MoviesSkeletonProps) {
    return (
        <SimpleGrid w='100%' cols={{ base: 1, sm: 2 }} {...others}>
            {Array.from({ length: items }).map((_, index) => (
                <Skeleton key={index} height={rem(218)} />
            ))}
        </SimpleGrid>
    );
}
