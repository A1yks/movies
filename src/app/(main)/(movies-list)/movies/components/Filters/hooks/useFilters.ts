import { useSetQueryParams } from '@/hooks';
import { deleteQueryParams } from '@/utils/deleteQueryParams';
import { availableFilters, useFiltersState } from './useFiltersState';
import { ComboboxItem } from '@mantine/core';
import { useMemo } from 'react';
import { useEvent } from '@/hooks';

const comboboxItemsToStr = (items: ComboboxItem[]) => items.map((item) => item.value).join(',');

export function useFilters(genres: ComboboxItem[]) {
    const genresMap = useMemo(() => new Map<number, string>(genres.map((genre) => [Number(genre.value), genre.label])), [genres]);

    const {
        filtersApplied,
        genresValue,
        yearValue,
        ratingFromValue,
        ratingToValue,
        minRatingTo,
        maxRatingFrom,
        setGenresValue,
        setYearValue,
        setRatingFromValue,
        setRatingToValue,
        setMinRatingTo,
        setMaxRatingFrom,
    } = useFiltersState(genresMap);

    const setQueryParams = useSetQueryParams({
        beforeChange: (qs: string) => deleteQueryParams(['page'], qs),
    });

    const handleGenreSelect = useEvent((genre: string, option: ComboboxItem) => {
        if (genresValue.find((item) => item.value === genre)) {
            const filtered = genresValue.filter((item) => item.value !== genre);

            setGenresValue(filtered);
            setQueryParams('genres', comboboxItemsToStr(filtered));
        } else {
            const concated = genresValue.concat(option);

            setGenresValue(concated);
            setQueryParams('genres', comboboxItemsToStr(concated));
        }
    });

    const handleYearChange = useEvent((year: string | null) => {
        setYearValue(year);
        setQueryParams('year', year ?? '');
    });

    function handleRatingFromChange(value: string | number) {
        if (value === '') {
            setRatingFromValue('');
            setMinRatingTo(1);
            setQueryParams('ratingFrom', '');

            return;
        }

        const ratingFrom = Number(value);

        setRatingFromValue(ratingFrom);
        setMinRatingTo(ratingFrom + 1);
        setQueryParams('ratingFrom', ratingFrom.toString());
    }

    function handleRatingToChange(value: string | number) {
        if (value === '') {
            setRatingToValue('');
            setMaxRatingFrom(10);
            setQueryParams('ratingTo', '');

            return;
        }

        const ratingTo = Number(value);

        setRatingToValue(ratingTo);
        setMaxRatingFrom(ratingTo - 1);
        setQueryParams('ratingTo', ratingTo.toString());
    }

    function handleResetFilters() {
        setGenresValue([]);
        setYearValue(null);
        setRatingFromValue('');
        setRatingToValue('');
        setMinRatingTo(1);
        setMaxRatingFrom(10);

        setQueryParams(deleteQueryParams(availableFilters));
    }

    return {
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
    };
}
