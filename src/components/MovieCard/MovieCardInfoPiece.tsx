import { Group, Text } from '@mantine/core';

export type MovieCardInfoPieceProps = {
    title: string;
    value: string;
    titleWidth?: number | string;
};

export function MovieCardInfoPiece({ title, value, titleWidth }: MovieCardInfoPieceProps) {
    return (
        <Group gap='0.5rem' style={{ rowGap: 0, whiteSpace: 'nowrap' }}>
            <Text c='grey.6' w={titleWidth} lh='125%'>
                {title}
            </Text>
            <Text c='black' tt='capitalize' lh='125%'>
                {value}
            </Text>
        </Group>
    );
}
