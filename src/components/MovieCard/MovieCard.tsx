import { Box, BoxProps, Card, Flex, Group, Stack, Text, rem } from '@mantine/core';
import Link from 'next/link';
import { MovieCardPoster } from './MovieCardPoster';
import Star from '@images/star.svg';
import { MovieCardInfoPiece } from './MovieCardInfoPiece';
import { RateMovieButton } from '../RateMovieButton';
import { useMediaQuery } from '@mantine/hooks';

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

type PosterWrapperProps = React.PropsWithChildren<Pick<MovieCardProps, 'variant' | 'id'> & Pick<BoxProps, 'visibleFrom' | 'hiddenFrom'>>;

const PosterWrapper = ({ children, variant, id, visibleFrom, hiddenFrom }: PosterWrapperProps) => (
    <Box
        component={variant === 'big' ? undefined : Link}
        href={`/movies/${id}`}
        lh={0}
        td='none'
        display='block'
        style={{ aspectRatio: 2 / 3 }}
        tabIndex={-1}
        visibleFrom={visibleFrom}
        hiddenFrom={hiddenFrom}
    >
        {children}
    </Box>
);

export function MovieCard(props: MovieCardProps) {
    const { posterPath, title, year, rating, genres, votes, id, userRating } = props;

    const isBig = props.variant === 'big';
    const infoTitleWidth = '8.75rem';

    const showFullSizePoster = useMediaQuery('(max-width: 36em), (min-width: 62em) and (max-width: 75em)');

    const basicInfo = (
        <Stack gap='0.5rem' align='flex-start'>
            <Text component={isBig ? undefined : Link} href={`/movies/${id}`} c='purple' fw={600} lh={rem(24)}>
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
    );

    const extendedInfo = (
        <Stack gap={rem(12)} mt='1.5rem'>
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
    );

    return (
        <Card>
            <Stack h='100%'>
                {(showFullSizePoster || isBig) && (
                    <Card.Section pos='relative' hiddenFrom={isBig ? 'xs' : undefined}>
                        <PosterWrapper variant={props.variant} id={id}>
                            <MovieCardPoster
                                h='100%'
                                size='w780'
                                posterPath={posterPath}
                                imageProps={{
                                    fill: true,
                                    sizes: '(max-width: 576px) 100vw',
                                }}
                            />
                        </PosterWrapper>
                    </Card.Section>
                )}

                <Group gap='0.5rem' align='flex-start' justify='space-between' wrap='nowrap' h='100%' w='100%'>
                    <Flex w='100%' mih='100%' gap='1rem' wrap='nowrap' align='stretch' direction={{ xs: 'row', base: 'column' }}>
                        {(!showFullSizePoster || isBig) && (
                            <PosterWrapper variant={props.variant} id={id} visibleFrom='xs'>
                                <MovieCardPoster
                                    posterPath={posterPath}
                                    imageProps={{
                                        width: isBig ? 250 : 119,
                                        height: isBig ? 352 : 170,
                                        style: {
                                            height: '100%',
                                        },
                                    }}
                                />
                            </PosterWrapper>
                        )}

                        <Stack gap={0} justify='space-between' w='100%'>
                            <Group wrap='nowrap' align='flex-start' justify='space-between'>
                                {basicInfo}
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
                            </Group>
                            {extendedInfo}
                        </Stack>
                    </Flex>
                </Group>
            </Stack>
        </Card>
    );
}
