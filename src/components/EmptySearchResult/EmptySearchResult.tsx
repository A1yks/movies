import { SpecialPageContent } from '../SpecialPageContent';
import noMoviesImg from '@images/no-movies.svg?url';
import Image from 'next/image';

export type EmptySearchResultProps = {
    text?: string;
};

export function EmptySearchResult({ text = "We don't have such movies, look for another one" }: EmptySearchResultProps) {
    return <SpecialPageContent image={<Image src={noMoviesImg} alt='' />} mainText={text} />;
}
