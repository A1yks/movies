'use client';

import { useRatedMovies } from '@/hooks';
import { Button, Group, Modal, Rating, Stack, Text, rem } from '@mantine/core';
import { useLayoutEffect, useState } from 'react';
import { MovieCompactCardProps } from '../MovieCard';
import Star from '@images/star.svg';

export type RatingModalProps = {
    opened: boolean;
    onClose: () => void;
    movie: Omit<MovieCompactCardProps, 'variant'>;
};

export function RatingModal({ movie, opened, onClose }: RatingModalProps) {
    const { setValue } = useRatedMovies();
    const [ratingValue, setRatingValue] = useState<number>(movie.userRating || 0);

    useLayoutEffect(() => {
        setRatingValue(movie.userRating || 0);
    }, [movie.userRating]);

    function removeRating() {
        setTimeout(() => setRatingValue(0), 300);
        setValue((prevState) => {
            const newState = { ...prevState };
            delete newState[movie.id];
            return newState;
        });
    }

    function saveRating() {
        setValue((prevState) => ({ ...prevState, [movie.id]: { ...movie, userRating: ratingValue } }));
    }

    function handleSave() {
        if (ratingValue === 0) {
            removeRating();
        } else {
            saveRating();
        }

        onClose();
    }

    function handleRemove() {
        removeRating();
        onClose();
    }

    return (
        <Modal
            title='Your rating'
            centered
            opened={opened}
            onClose={onClose}
            size={rem(380)}
            styles={{
                header: {
                    borderBottom: '1px solid var(--mantine-color-grey-2)',
                },
            }}
        >
            <Stack pt='1rem' gap='1rem'>
                <Text fz='1rem' fw={700} lh='140%'>
                    {movie.title}
                </Text>
                <Rating
                    value={ratingValue}
                    count={10}
                    size={rem(28)}
                    onChange={setRatingValue}
                    emptySymbol={<Star width={28} height={28} fill='var(--mantine-color-grey-3)' />}
                    styles={{ root: { gap: rem(7.5) }, symbolBody: { lineHeight: 0 } }}
                />
                <Group gap='1rem'>
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant='transparent' onClick={handleRemove} px={0} py={0}>
                        Remove rating
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
