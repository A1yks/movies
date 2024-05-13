import Image from 'next/image';
import noMoviesImg from '@images/no-movies.svg?url';
import { SpecialPageContent } from '@/components';

export function NoMovies() {
    return <SpecialPageContent image={<Image src={noMoviesImg} alt='' />} mainText='We don&#39;t have such movies, look for another one' />;
}
