'use client';

import { FilterTitle } from '@/components';
import { Select, Stack } from '@mantine/core';
import { options, useSort } from './hooks/useSort';

export function Sort() {
    const { selectedOption, handleChange } = useSort();

    return (
        <Stack gap='0.5rem' align='flex-start'>
            <FilterTitle htmlFor='sort'>Sort by</FilterTitle>
            <Select id='sort' w='100%' data={options} value={selectedOption.value} onChange={handleChange} />
        </Stack>
    );
}
