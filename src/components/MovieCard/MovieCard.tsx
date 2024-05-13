import { Box, Card, Group, Stack, Text, Tooltip, rem } from '@mantine/core';
import Link from 'next/link';
import styles from './MovieCard.module.scss';
import { Poster } from './Poster';
import Star from '@images/star.svg';
import c from 'clsx';
import { MovieCardInfoPiece } from './MovieCardInfoPiece';

type MovieCardBaseProps = {
    posterPath?: string;
    title: string;
    year: string;
    rating: number;
    genres: string[];
    votes: string;
    id: number;
    userRating?: number;
};

type MovieCardCompactProps = {
    variant?: 'compact';
} & MovieCardBaseProps;

type MovieCardBigProps = {
    variant: 'big';
    duration: string;
    premiereDate: string;
    budget: string;
    gross: string;
} & MovieCardBaseProps;

export type MovieCardProps = MovieCardCompactProps | MovieCardBigProps;

export function MovieCard(props: MovieCardProps) {
    const { posterPath, title, year, rating, genres, votes, id, userRating } = props;

    const hasRating = userRating !== undefined;
    const isBig = props.variant === 'big';
    const infoTitleWidth = rem(140);

    return (
        <Card>
            <Group gap='0.5rem' align='flex-start' justify='space-between' wrap='nowrap'>
                <Group gap='1rem' wrap='nowrap' align='stretch'>
                    <Box component={isBig ? undefined : Link} href={`/movies/${id}`} lh={0} td='none'>
                        <Poster posterPath={posterPath} width={isBig ? 250 : 119} height={isBig ? 352 : 170} />
                    </Box>
                    <Stack gap={0} justify='space-between'>
                        <Stack gap='0.5rem' align='flex-start'>
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
                                    <MovieCardInfoPiece title='Duration' value={props.duration} titleWidth={infoTitleWidth} />
                                    <MovieCardInfoPiece title='Premiere date' value={props.premiereDate} titleWidth={infoTitleWidth} />
                                    <MovieCardInfoPiece title='Budget' value={props.budget} titleWidth={infoTitleWidth} />
                                    <MovieCardInfoPiece title='Gross worldwide' value={props.gross} titleWidth={infoTitleWidth} />
                                </>
                            )}
                            <MovieCardInfoPiece title='Genres' value={genres.join(', ')} titleWidth={isBig ? infoTitleWidth : undefined} />
                        </Stack>
                    </Stack>
                </Group>
                <Tooltip label={hasRating ? 'Change rating' : 'Rate movie'}>
                    <Group wrap='nowrap' gap={rem(4)} style={{ cursor: 'pointer' }}>
                        <Star className={c(styles.rateIcon, { [styles.rated]: hasRating })} />
                        {hasRating && (
                            <Text fz={rem(16)} lh='125%' fw={600}>
                                {userRating}
                            </Text>
                        )}
                    </Group>
                </Tooltip>
            </Group>
        </Card>
    );
}
