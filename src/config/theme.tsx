'use client';

import {
    Anchor,
    Avatar,
    Button,
    Card,
    ComboboxOption,
    DEFAULT_THEME,
    NumberInput,
    ScrollArea,
    Select,
    Title,
    colorsTuple,
    createTheme,
    rem,
} from '@mantine/core';
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
                fz: rem(14),
                fw: 600,
                variant: 'filled',
            },
            classNames(theme, props) {
                return {
                    root: `${props.variant || 'filled'}-button`,
                };
            },
        }),
        Select: Select.extend({
            defaultProps: {
                rightSection: <Down className='dropdown-arrow' />,
                renderOption: ({ option }) => <>{option.label}</>,
            },
            styles: {
                input: {
                    height: rem(42),
                },
                section: {
                    width: rem(24),
                    marginRight: rem(12),
                },
            },
            classNames: {
                input: 'select-input',
            },
        }),
        NumberInput: NumberInput.extend({
            styles: {
                control: {
                    borderLeft: 0,
                },
                section: {
                    overflow: 'hidden',
                    width: rem(12),
                    marginRight: rem(12),
                },
                input: {
                    height: rem(42),
                },
            },
            classNames: {
                input: 'select-input',
            },
        }),
        ScrollArea: ScrollArea.extend({
            defaultProps: {
                scrollbarSize: 4,
                mah: rem(180),
                styles: {
                    thumb: {
                        backgroundColor: 'var(--mantine-color-grey-5)',
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
        Anchor: Anchor.extend({
            defaultProps: {
                c: 'purple',
            },
        }),
        Card: Card.extend({
            defaultProps: {
                padding: rem(24),
            },
        }),
        Avatar: Avatar.extend({
            defaultProps: {
                variant: 'white',
            },
            styles: {
                root: {
                    border: '1px solid var(--mantine-color-grey-2)',
                },
            },
        }),
        Title: Title.extend({
            styles: {
                root: {
                    fontSize: rem(32),
                    wordBreak: 'break-word',
                },
            },
        }),
    },
    defaultRadius: 'md',
});
