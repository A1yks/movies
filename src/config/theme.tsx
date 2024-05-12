'use client';

import { Box, Button, ComboboxOption, DEFAULT_THEME, Flex, NumberInput, ScrollArea, Select, colorsTuple, createTheme, rem } from '@mantine/core';
import Down from '@images/down.svg';

export const theme = createTheme({
    colors: {
        grey: ['#F5F5F6', '#F5F5F6', '#EAEBED', '#D5D6DC', '#D5D6DC', '#ACADB9', '#7B7C88', '#7B7C88', '#7B7C88', '#7B7C88'],
        purple: ['#F2EBF9', '#F2EBF9', '#E5D5FA', '#D1B4F8', '#BD93F7', '#9854F6', '#541F9D', '#541F9D', '#541F9D', '#541F9D'],
        yellow: colorsTuple('#FAB005'),
    },
    primaryShade: 5,
    primaryColor: 'purple',
    fontFamily: `Inter, ${DEFAULT_THEME.fontFamily}`,
    components: {
        Button: Button.extend({
            defaultProps: {
                py: rem(10),
                fz: rem(14),
                fw: 600,
            },
        }),
        Select: Select.extend({
            defaultProps: {
                rightSection: <Down className='dropdown-arrow' />,
                renderOption: ({ option }) => <>{option.label}</>,
            },
        }),
        NumberInput: NumberInput.extend({
            defaultProps: {
                styles: {
                    control: {
                        borderLeft: 0,
                    },
                    section: {
                        overflow: 'hidden',
                    },
                },
            },
        }),
        ScrollArea: ScrollArea.extend({
            defaultProps: {
                scrollbarSize: 4,
                mah: rem(180),
                styles: {
                    thumb: {
                        backgroundColor: 'grey.5',
                        borderRadius: rem(20),
                    },
                },
            },
        }),
        ComboboxOption: ComboboxOption.extend({
            defaultProps: {
                fz: rem(14),
                lh: rem(20),
                h: rem(36),
            },
        }),
    },
    defaultRadius: 'md',
});