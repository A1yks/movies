'use client';

import {
    NumberInputProps as MantineNumberInputProps,
    NumberInput as MantineNumberInput,
    createPolymorphicComponent,
    Stack,
    Center,
    NumberInputHandlers,
} from '@mantine/core';
import Image from 'next/image';
import { forwardRef, useRef } from 'react';

export type NumberInputProps = MantineNumberInputProps;

const NumberInputComponent = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
    const handersRef = useRef<NumberInputHandlers>(null);

    return (
        <MantineNumberInput
            ref={ref}
            handlersRef={handersRef}
            rightSection={
                <Stack gap={2}>
                    <Center w={12} h={12} style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handersRef.current?.increment()}>
                        <Image src='/images/down-secondary.svg' alt='' width={10} height={6} style={{ transform: 'rotate(180deg)' }} />
                    </Center>
                    <Center w={12} h={12} style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handersRef.current?.decrement()}>
                        <Image src='/images/down-secondary.svg' alt='' width={10} height={6} />
                    </Center>
                </Stack>
            }
            {...props}
        />
    );
});

NumberInputComponent.displayName = 'NumberInput';

export const NumberInput = createPolymorphicComponent<'input', NumberInputProps>(NumberInputComponent);
