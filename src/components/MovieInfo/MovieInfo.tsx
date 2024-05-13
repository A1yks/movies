import { ProductionCompany } from '@/api/types';
import { Avatar, Card, Group, Stack, Text, rem } from '@mantine/core';
import { MovieInfoPiece } from './MovieInfoPiece';
import { TMDB_IMAGES_URL } from '@/constants/movies';
import clapperboardImg from '@images/clapperboard.svg?url';
import Image from 'next/image';

export type MovieInfoProps = {
    trailerKey?: string;
    description: string;
    companies: ProductionCompany[];
};

export function MovieInfo({ trailerKey, description, companies }: MovieInfoProps) {
    return (
        <Card>
            {trailerKey !== undefined && (
                <MovieInfoPiece title='Trailer' divider>
                    <iframe
                        id='ytplayer'
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        allowFullScreen
                        style={{
                            border: 0,
                            width: rem(500),
                            height: rem(281),
                            borderRadius: 8,
                            padding: 4,
                            background: 'var(--mantine-color-grey-1)',
                        }}
                    />
                </MovieInfoPiece>
            )}
            <MovieInfoPiece title='Description' divider>
                <Text lh='140%'>{description}</Text>
            </MovieInfoPiece>
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
                            <Text fz='1rem' lh='140%' fw={700}>
                                {company.name}
                            </Text>
                        </Group>
                    ))}
                </Stack>
            </MovieInfoPiece>
        </Card>
    );
}
