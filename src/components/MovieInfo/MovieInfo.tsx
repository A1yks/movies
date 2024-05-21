import { Image } from '../Image';
import { ProductionCompany } from '@/api/types';
import { Avatar, Card, Group, Stack, Text, rem } from '@mantine/core';
import { MovieInfoPiece } from './MovieInfoPiece';
import { TMDB_IMAGES_URL } from '@/constants/movies';
import clapperboardImg from '@images/clapperboard.svg?url';

export type MovieInfoProps = {
    trailerKey?: string;
    description: string;
    companies: ProductionCompany[];
};

export function MovieInfo({ trailerKey, description, companies }: MovieInfoProps) {
    const hasTrailer = trailerKey !== undefined;
    const hasCompanies = companies.length > 0;
    const hasDescription = description.length > 0;
    const hasContent = hasTrailer || hasCompanies || hasDescription;

    if (!hasContent) return null;

    return (
        <Card>
            {hasTrailer && (
                <MovieInfoPiece title='Trailer' divider>
                    <iframe
                        id='ytplayer'
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        allowFullScreen
                        style={{
                            border: 0,
                            width: rem(500),
                            maxWidth: '100%',
                            aspectRatio: '16 / 9',
                            borderRadius: 8,
                            padding: 4,
                            background: 'var(--mantine-color-grey-1)',
                        }}
                    />
                </MovieInfoPiece>
            )}
            {hasDescription && (
                <MovieInfoPiece title='Description' divider={hasCompanies}>
                    <Text lh='140%'>{description}</Text>
                </MovieInfoPiece>
            )}
            {hasCompanies && (
                <MovieInfoPiece title='Production'>
                    <Stack gap={rem(12)}>
                        {companies.map((company) => (
                            <Group key={company.id}>
                                <Avatar
                                    src={company.logo_path ? `${TMDB_IMAGES_URL}/w45/${company.logo_path}` : null}
                                    alt={company.name}
                                    size={rem(40)}
                                    styles={{ image: { objectFit: 'contain', padding: 4 } }}
                                >
                                    <Image src={clapperboardImg} alt='' />
                                </Avatar>
                                <Text
                                    lh='140%'
                                    fw={700}
                                    style={{
                                        fontSize: 'clamp(0.8rem, 4vw, 1rem)',
                                    }}
                                >
                                    {company.name}
                                </Text>
                            </Group>
                        ))}
                    </Stack>
                </MovieInfoPiece>
            )}
        </Card>
    );
}
