import { Metadata } from 'next';
import { LayoutContent } from './components';

export const metadata: Metadata = {
    title: 'Rated Movies',
};

export default function RatedMoviesLayout({ children }: React.PropsWithChildren) {
    return <LayoutContent>{children}</LayoutContent>;
}
