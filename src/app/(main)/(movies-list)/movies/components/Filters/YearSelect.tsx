import { Select } from '@mantine/core';
import { memo } from 'react';

export type YearSelectProps = {
    years: string[];
    value: string | null;
    onChange: (year: string | null) => void;
};

function YearSelectComponent({ years, value, onChange }: YearSelectProps) {
    return <Select data={years} placeholder='Select release year' value={value} onChange={onChange} />;
}

export const YearSelect = memo(YearSelectComponent);
