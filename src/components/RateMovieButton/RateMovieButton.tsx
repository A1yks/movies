'use client';

import { Tooltip, Group, Text, rem } from '@mantine/core';
import Star from '@images/star.svg';
import c from 'clsx';
import styles from './RateMovieButton.module.scss';
import { useDisclosure } from '@mantine/hooks';
import { RatingModal, RatingModalProps } from '../RatingModal';

export type RateMovieButtonProps = {
    movie: RatingModalProps['movie'];
};

export function RateMovieButton({ movie }: RateMovieButtonProps) {
    const [opened, { open, close }] = useDisclosure();
    const hasRating = movie.userRating !== undefined && movie.userRating > 0;

    return (
        <>
            <Tooltip label={hasRating ? 'Change rating' : 'Rate movie'}>
                <Group wrap='nowrap' gap={rem(4)} style={{ cursor: 'pointer' }} onClick={open}>
                    <Star className={c(styles.rateIcon, { [styles.rated]: hasRating })} />
                    {hasRating && (
                        <Text fz={rem(16)} lh='125%' fw={600}>
                            {movie.userRating}
                        </Text>
                    )}
                </Group>
            </Tooltip>
            <RatingModal movie={movie} opened={opened} onClose={close} />
        </>
    );
}
