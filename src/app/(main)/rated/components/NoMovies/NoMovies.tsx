import { Button, Stack, Text, rem } from '@mantine/core';
import noMoviesImg from '@images/no-rated-movies.svg?url';
import Image from 'next/image';
import Link from 'next/link';
import { SpecialPageContent } from '@/components';

export function NoMovies() {
    return (
        <SpecialPageContent
            image={<Image src={noMoviesImg} alt='' />}
            mainText='You haven&#39;t rated any films yet'
            button={
                <Button component={Link} href='/'>
                    Find movies
                </Button>
            }
        />
    );
}
