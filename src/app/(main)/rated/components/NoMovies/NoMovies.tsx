import { SpecialPageContent, Image } from '@/components';
import { Button } from '@mantine/core';
import Link from 'next/link';
import noMoviesImg from '@images/no-rated-movies.svg?url';

export function NoMovies() {
    return (
        <SpecialPageContent
            image={<Image priority src={noMoviesImg} alt='' style={{ width: '100%', maxWidth: noMoviesImg.width, height: 'auto' }} />}
            mainText='You haven&#39;t rated any films yet'
            button={
                <Button component={Link} href='/movies'>
                    Find movies
                </Button>
            }
        />
    );
}
