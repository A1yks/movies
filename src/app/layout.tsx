import '@mantine/core/styles.css';
import '@/styles/global.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../config/theme';
import { MainLayout } from './MainLayout';
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['600'], subsets: ['latin'], variable: '--font-poppins' });
const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
    title: 'Mantine Next.js template',
    description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang='en' className={`${poppins.variable} ${inter.variable}`}>
            <head>
                <ColorSchemeScript />
                <link rel='shortcut icon' href='/favicon.svg' />
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no' />
            </head>
            <body className='inter'>
                <MantineProvider theme={theme}>
                    <MainLayout>{children}</MainLayout>
                </MantineProvider>
            </body>
        </html>
    );
}
