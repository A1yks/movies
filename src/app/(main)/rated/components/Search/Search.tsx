'use client';

import { SearchInput } from '@/components';
import { useSetQueryParams } from '@/hooks';
import { deleteQueryParams } from '@/utils/deleteQueryParams';
import { rem } from '@mantine/core';
import { useState } from 'react';

export function Search() {
    const [search, setSearch] = useState('');

    const setQueryParams = useSetQueryParams({ debounce: false, beforeChange: (qs) => deleteQueryParams(['page'], qs) });

    function handleSearch() {
        if (search === '') {
            setQueryParams(deleteQueryParams(['search']));
        } else {
            setQueryParams('search', search);
        }
    }

    return <SearchInput placeholder='Search movie title' maw={rem(490)} onSearch={handleSearch} onChange={(e) => setSearch(e.target.value)} />;
}
