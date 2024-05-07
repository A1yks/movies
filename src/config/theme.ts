'use client';

import { Button, Container, colorsTuple, createTheme } from '@mantine/core';

export const theme = createTheme({
    colors: {
        grey: ['#F5F5F6', '#F5F5F6', '#EAEBED', '#D5D6DC', '#D5D6DC', '#ACADB9', '#7B7C88', '#7B7C88', '#7B7C88', '#7B7C88'],
        purple: ['#F2EBF9', '#F2EBF9', '#E5D5FA', '#D1B4F8', '#BD93F7', '#9854F6', '#541F9D', '#541F9D', '#541F9D', '#541F9D'],
        yellow: colorsTuple('#FAB005'),
    },
    primaryShade: 5,
    primaryColor: 'purple',
    fontFamily: 'Poppins, sans-serif',
    components: {
        Button: Button.extend({
            defaultProps: {
                radius: 'md',
                py: 10,
                fz: 14,
                fw: 600,
            },
        }),
    },
});
