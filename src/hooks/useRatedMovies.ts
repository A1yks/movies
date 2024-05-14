import { MovieCompactCardProps } from '@/components';
import { useLocalStorage } from '@mantine/hooks';
import { useLayoutEffect, useState } from 'react';

export type RatedMovies = Record<number, Omit<MovieCompactCardProps, 'variant'>>;

const KEY = 'rated-movies';

export function useRatedMovies() {
    const [isLoading, setIsLoading] = useState(true);

    if (typeof localStorage !== 'undefined' && !localStorage.getItem(KEY)) {
        localStorage.setItem(KEY, '{}');
    }

    const [data, setValue, removeValue] = useLocalStorage<Partial<RatedMovies>>({
        key: KEY,
        defaultValue: undefined,
        getInitialValueInEffect: false,
    });

    useLayoutEffect(() => {
        if (data !== undefined) {
            setIsLoading(false);
        }
    }, [data]);

    return { isLoading, data, setValue, removeValue };
}
