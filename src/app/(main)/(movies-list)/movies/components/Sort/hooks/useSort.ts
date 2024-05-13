import { GetMoviesReq } from '@/api/types';
import { useSetQueryParams } from '@/hooks';
import { ComboboxItem } from '@mantine/core';
import { usePrevious } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Option = {
    label: string;
    value: NonNullable<GetMoviesReq['sortBy']>;
};

export const options: Option[] = [
    { label: 'Most popular', value: 'popularity.desc' },
    { label: 'Least popular', value: 'popularity.asc' },
    { label: 'Most rated', value: 'vote_average.desc' },
    { label: 'Least rated', value: 'vote_average.asc' },
    { label: 'Most voted', value: 'vote_count.desc' },
    { label: 'Least voted', value: 'vote_count.asc' },
];

export function useSort() {
    const searchParams = useSearchParams();
    const setQueryParams = useSetQueryParams({ debounce: false });
    const prevSortBy = usePrevious(searchParams.get('sortBy'));

    const [selectedOption, setSelectedOption] = useState<Option>(() => {
        const sortBy = searchParams.get('sortBy') as GetMoviesReq['sortBy'];

        return options.find((option) => option.value === sortBy) ?? options[0];
    });

    useEffect(() => {
        if (prevSortBy !== searchParams.get('sortBy')) {
            const sortBy = searchParams.get('sortBy') as GetMoviesReq['sortBy'];

            setSelectedOption(options.find((option) => option.value === sortBy) ?? options[0]);
        }
    }, [prevSortBy, searchParams]);

    function handleChange(value: string | null, option: ComboboxItem) {
        setSelectedOption(option as Option);
        setQueryParams('sortBy', value ?? '');
    }

    return { selectedOption, handleChange };
}
