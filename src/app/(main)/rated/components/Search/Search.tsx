'use client';

import { useLayoutEffect, useState } from 'react';
import { SearchInput } from '@/components';
import { useSetQueryParams } from '@/hooks';
import { deleteQueryParams } from '@/utils/deleteQueryParams';
import { TextInputProps } from '@mantine/core';
import { useSearchParams } from 'next/navigation';

export function Search(props: TextInputProps) {
    const searchParams = useSearchParams();
    const searchValue = searchParams.get('search') || '';
    const [search, setSearch] = useState(searchValue);
    const [searchBtnText, setSearchBtnText] = useState<'Search' | 'Clear'>('Search');

    const setQueryParams = useSetQueryParams({ debounce: false, beforeChange: (qs) => deleteQueryParams(['page'], qs) });

    useLayoutEffect(() => {
        if (searchValue === '') {
            setSearchBtnText('Search');
        } else {
            setSearchBtnText('Clear');
        }

        setSearch(searchValue);
    }, [searchValue]);

    function clear() {
        setQueryParams(deleteQueryParams(['search']));
    }

    function toggleClear() {
        if (search === '') return;

        if (searchBtnText === 'Search') {
            setSearchBtnText('Clear');
        } else {
            setSearchBtnText('Search');
            setSearch('');
            clear();
        }
    }

    function handleSearch() {
        setQueryParams('search', search);
        toggleClear();
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);

        if (searchBtnText === 'Clear') {
            setSearchBtnText('Search');
        }
    }

    return (
        <SearchInput
            placeholder='Search movie title'
            value={search}
            onSearch={handleSearch}
            onChange={handleChange}
            searchBtnText={searchBtnText}
            {...props}
        />
    );
}
