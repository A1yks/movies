'use client';

import { MultiSelect, NumberInput, FilterTitle } from '@/components';
import { Box, Button, ComboboxItem, Flex, Group, Select, Stack, rem } from '@mantine/core';
import { useFilters } from './hooks/useFilters';
import { YearSelect } from './YearSelect';

export type FiltersProps = {
    years: string[];
    genres: ComboboxItem[];
};

export function Filters({ years, genres }: FiltersProps) {
    const {
        filtersApplied,
        genresValue,
        yearValue,
        ratingFromValue,
        ratingToValue,
        minRatingTo,
        maxRatingFrom,
        handleGenreSelect,
        handleYearChange,
        handleRatingFromChange,
        handleRatingToChange,
        handleResetFilters,
    } = useFilters(genres);

    return (
        <Flex gap={rem(16)} direction={{ md: 'row', base: 'column' }}>
            <Stack flex={1} gap={rem(8)}>
                <FilterTitle>Genres</FilterTitle>
                <MultiSelect
                    data={genres}
                    selectedValues={genresValue}
                    maxDisplayedValues={3}
                    placeholder='Select genre'
                    searchPlaceholder='Type genre'
                    onSelect={handleGenreSelect}
                />
            </Stack>
            <Stack flex={1} gap={rem(8)}>
                <FilterTitle>Release year</FilterTitle>
                <YearSelect years={years} value={yearValue} onChange={handleYearChange} />
            </Stack>
            <Stack flex={1} gap={rem(8)}>
                <FilterTitle>Ratings</FilterTitle>
                <Group>
                    <NumberInput
                        placeholder='From'
                        min={0}
                        max={maxRatingFrom}
                        clampBehavior='strict'
                        flex={1}
                        value={ratingFromValue}
                        onChange={handleRatingFromChange}
                    />
                    <NumberInput
                        placeholder='To'
                        min={minRatingTo}
                        max={10}
                        clampBehavior='strict'
                        flex={1}
                        value={ratingToValue}
                        onChange={handleRatingToChange}
                    />
                </Group>
            </Stack>
            <Stack gap={rem(8)} align='center'>
                {/* 
                    An empty element with the same height as FilterTitle 
                    to make reset button centered even if genres select component 
                    grows in height 
                */}
                <Box h='1.4rem' visibleFrom='md' />
                <Button variant='transparent' w='fit-content' px={0} onClick={handleResetFilters} disabled={!filtersApplied}>
                    Reset filters
                </Button>
            </Stack>
        </Flex>
    );
}
