import { Box, Card, Group, Stack, Text, Tooltip, rem } from '@mantine/core';
import Link from 'next/link';
import styles from './MovieCard.module.scss';
import { Poster } from './Poster';
import Star from '@images/star.svg';
import c from 'clsx';
import { MovieCardInfoPiece } from './MovieCardInfoPiece';
import { RateMovieButton } from '../RateMovieButton';
import { memo } from 'react';

export type MovieCardBaseProps = {
    posterPath?: string;
    title: string;
    year: string;
    rating: number;
    genres: string[];
    votes: string;
    id: number;
    userRating?: number;
};

export type MovieCompactCardProps = {
    variant?: 'compact';
} & MovieCardBaseProps;

export type MovieBigCardProps = {
    variant: 'big';
    duration: string;
    premiereDate: string;
    budget?: string;
    gross?: string;
} & MovieCardBaseProps;

export type MovieCardProps = MovieCompactCardProps | MovieBigCardProps;

export function MovieCardComponent(props: MovieCardProps) {
    const { posterPath, title, year, rating, genres, votes, id, userRating } = props;

    const isBig = props.variant === 'big';
    const isCompact = !isBig;
    const infoTitleWidth = rem(140);

    return (
        <Card pos='relative'>
            <Group gap='1rem' wrap='nowrap' align='stretch' maw={isCompact ? rem(375) : undefined}>
                <Box component={isBig ? undefined : Link} href={`/movies/${id}`} lh={0} td='none'>
                    <Poster posterPath={posterPath} width={isBig ? 250 : 119} height={isBig ? 352 : 170} />
                </Box>
                <Stack gap={0} justify='space-between'>
                    <Stack gap='0.5rem' align='flex-start' maw={isCompact ? rem(250) : undefined}>
                        <Group align='flex-start' w='100%'>
                            <Text
                                component={isBig ? undefined : Link}
                                href={`/movies/${id}`}
                                c='purple'
                                fw={600}
                                lh={rem(24)}
                                className={c({ [styles.hoverableTitle]: !isBig })}
                            >
                                {title}
                            </Text>
                            <Box ml='auto' pos='absolute' right={rem(24)} top={rem(24)}>
                                <RateMovieButton
                                    movie={{
                                        id,
                                        title,
                                        genres,
                                        posterPath,
                                        year,
                                        rating,
                                        votes,
                                        userRating,
                                    }}
                                />
                            </Box>
                        </Group>
                        <Text fw={400} c='grey.6'>
                            {year}
                        </Text>
                        <Group gap='0.5rem'>
                            <Group gap={4}>
                                <Star fill='var(--mantine-color-yellow-filled)' />
                                <Text fw={600} c='black' lh='125%'>
                                    {rating}
                                </Text>
                            </Group>
                            <Text c='grey.6' lh='125%'>
                                ({votes})
                            </Text>
                        </Group>
                    </Stack>
                    <Stack gap={rem(12)} mt='0.5rem'>
                        {isBig && (
                            <>
                                <MovieCardInfoPiece variant='big' title='Duration' value={props.duration} titleWidth={infoTitleWidth} />
                                <MovieCardInfoPiece variant='big' title='Premiere date' value={props.premiereDate} titleWidth={infoTitleWidth} />
                                {props.budget && <MovieCardInfoPiece variant='big' title='Budget' value={props.budget} titleWidth={infoTitleWidth} />}
                                {props.gross && <MovieCardInfoPiece variant='big' title='Gross' value={props.gross} titleWidth={infoTitleWidth} />}
                            </>
                        )}
                        {genres.length > 0 && (
                            <MovieCardInfoPiece
                                variant={props.variant}
                                title='Genres'
                                value={genres.join(', ')}
                                titleWidth={isBig ? infoTitleWidth : undefined}
                            />
                        )}
                    </Stack>
                </Stack>
            </Group>
        </Card>
    );
}

export const MovieCard = memo(MovieCardComponent);
