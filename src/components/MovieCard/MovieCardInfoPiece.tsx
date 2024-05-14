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
        <Group gap='0.5rem' align='flex-start' style={{ rowGap: 0, whiteSpace: isBig ? undefined : 'nowrap' }} wrap={isBig ? 'nowrap' : undefined}>
            <Text c='grey.6' w={titleWidth} lh='125%'>
                {title}
            </Text>
            <Text c='black' tt='capitalize' lh='125%' flex={1}>
                {value}
            </Text>
        </Group>
    );
}
