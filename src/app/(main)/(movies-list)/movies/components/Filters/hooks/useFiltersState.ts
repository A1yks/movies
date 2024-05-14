import { splitQueryString } from '@/utils/splitQueryString';
import { ComboboxItem } from '@mantine/core';
import { usePrevious } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function getRatingValue(rating: string | null) {
    if (rating === null) return '';

    const num = Number(rating);

    return !Number.isNaN(num) ? num : '';
}

export function useFiltersState(genresMap: Map<number, string>) {
    const searchParams = useSearchParams();

    const rawSelectedGenres = searchParams.get('genres');

    const selectedGenres = splitQueryString(rawSelectedGenres, ',');
    const selectedYear = searchParams.get('year');
    const selectedRatingFrom = getRatingValue(searchParams.get('ratingFrom'));
    const selectedRatingTo = getRatingValue(searchParams.get('ratingTo'));

    const currQueryString = searchParams.toString();
    const prevQueryString = usePrevious(searchParams.toString());

    const getGenresFromArr = useCallback(
        (genres: string[]) => genres.map((genre) => ({ value: genre, label: genresMap.get(Number(genre)) as string })),
        [genresMap]
    );

    // Current value is controlled by state to remove navigation delay if it were controlled by the search params
    const [genresValue, setGenresValue] = useState<ComboboxItem[]>(() => getGenresFromArr(selectedGenres));
    const [yearValue, setYearValue] = useState(selectedYear);
    const [ratingFromValue, setRatingFromValue] = useState(selectedRatingFrom);
    const [ratingToValue, setRatingToValue] = useState(selectedRatingTo);
    const [minRatingTo, setMinRatingTo] = useState(typeof ratingFromValue === 'number' ? ratingFromValue + 1 : 0);
    const [maxRatingFrom, setMaxRatingFrom] = useState(typeof ratingToValue === 'number' ? ratingToValue - 1 : 10);

    useEffect(() => {
        // If user navigates forward/backward current values will be updated with the value from the search params
        if (currQueryString !== prevQueryString) {
            setGenresValue(getGenresFromArr(splitQueryString(rawSelectedGenres, ',')));
            setYearValue(selectedYear);
            setRatingFromValue(selectedRatingFrom);
            setRatingToValue(selectedRatingTo);
            setMinRatingTo(typeof selectedRatingFrom === 'number' ? selectedRatingFrom + 1 : 0);
            setMaxRatingFrom(typeof selectedRatingTo === 'number' ? selectedRatingTo - 1 : 10);
        }
    }, [currQueryString, getGenresFromArr, prevQueryString, rawSelectedGenres, selectedRatingFrom, selectedRatingTo, selectedYear]);

    return {
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
    };
}