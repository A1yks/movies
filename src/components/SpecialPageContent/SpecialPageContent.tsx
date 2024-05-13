import { Stack, Text, rem } from '@mantine/core';

export type SpecialPageContentProps = {
    image: React.ReactNode;
    mainText: string;
    button?: React.ReactNode;
};

export function SpecialPageContent({ image, mainText, button }: SpecialPageContentProps) {
    return (
        <Stack align='center' justify='center' w='100%' h='100%' gap='1rem' style={{ boxSizing: 'border-box' }}>
            {image}
            <Stack align='center' gap='1rem'>
                <Text fz={rem(20)} lh={rem(24)} fw={600} ta='center'>
                    {mainText}
                </Text>
                {button}
            </Stack>
        </Stack>
    );
}
