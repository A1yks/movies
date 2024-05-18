import { Select } from '@mantine/core';
import { memo } from 'react';

export type YearSelectProps = {
    id?: string;
    years: string[];
    value: string | null;
    onChange: (year: string | null) => void;
};

function YearSelectComponent({ years, value, onChange, id }: YearSelectProps) {
    return <Select id={id} w='100%' data={years} placeholder='Select release year' value={value} onChange={onChange} />;
}

export const YearSelect = memo(YearSelectComponent);
