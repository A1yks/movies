import { Divider, Stack, Text, rem } from '@mantine/core';

export type MovieInfoPieceProps = {
    title: string;
    divider?: boolean;
    children: React.ReactNode;
};

export function MovieInfoPiece({ title, divider, children }: MovieInfoPieceProps) {
    return (
        <>
            <Stack gap='1rem'>
                <Text fz={20} fw={700} lh='100%'>
                    {title}
                </Text>
                {children}
            </Stack>
            {divider && <Divider my={rem(20)} />}
        </>
    );
}
