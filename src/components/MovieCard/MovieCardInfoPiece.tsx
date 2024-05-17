import { Group, Text } from '@mantine/core';
import { MovieCardProps } from './MovieCard';

export type MovieCardInfoPieceProps = {
    title: string;
    value: string;
    titleWidth?: number | string;
    variant: MovieCardProps['variant'];
};

export function MovieCardInfoPiece({ variant, title, value, titleWidth }: MovieCardInfoPieceProps) {
    const isBig = variant === 'big';

    return (
        <Group gap='0.5rem' align='flex-start' style={{ rowGap: 0 }} wrap={isBig ? 'nowrap' : undefined}>
            <Text c='grey.6' lh='125%' style={{ width: `clamp(5rem, 10vw, ${titleWidth})` }}>
                {title}
            </Text>
            <Text c='black' tt='capitalize' lh='125%' flex={isBig ? 1 : undefined}>
                {value}
            </Text>
        </Group>
    );
}
