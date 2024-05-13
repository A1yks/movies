'use client';

import { FilterTitle } from '@/components';
import { Select, Stack } from '@mantine/core';
import { options, useSort } from './hooks/useSort';

export function Sort() {
    const { selectedOption, handleChange } = useSort();

    return (
        <Stack>
            <FilterTitle>Sort by</FilterTitle>
            <Select data={options} value={selectedOption.value} onChange={handleChange} />
        </Stack>
    );
}
