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
    const label = hasRating ? 'Change rating' : 'Rate movie';

    return (
        <>
            <Tooltip label={label}>
                <Group
                    component='button'
                    wrap='nowrap'
                    gap={rem(4)}
                    onClick={open}
                    style={{ padding: 0, flexShrink: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                    aria-label={label}
                >
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
