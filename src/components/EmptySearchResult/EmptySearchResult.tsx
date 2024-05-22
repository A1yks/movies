import { Image } from '../Image';
import { SpecialPageContent } from '../SpecialPageContent';
import noMoviesImg from '@images/no-movies.svg?url';

export type EmptySearchResultProps = {
    text?: string;
};

export function EmptySearchResult({ text = "We don't have such movies, look for another one" }: EmptySearchResultProps) {
    return (
        <SpecialPageContent
            image={<Image priority src={noMoviesImg} alt='' style={{ width: '100%', maxWidth: noMoviesImg.width, height: 'auto' }} />}
            mainText={text}
        />
    );
}
