import '@mantine/core/styles.layer.css';
import '@/styles/global.scss';
import '@/styles/media.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/config/theme';
import { Inter, Poppins } from 'next/font/google';
import { Metadata } from 'next';
import { SITE_NAME } from '@/constants/movies';

const poppins = Poppins({ weight: ['600'], subsets: ['latin'], variable: '--font-poppins' });
const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang='en' className={`${poppins.variable} ${inter.variable}`}>
            <head>
                <ColorSchemeScript />
                <link rel='shortcut icon' href='/favicon.svg' />
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width' />
            </head>
            <body className={inter.className}>
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </body>
        </html>
    );
}

const description = 'Movies and TV shows database';

export const metadata: Metadata = {
    title: {
        template: `%s | ${SITE_NAME}`,
        default: SITE_NAME,
    },
    description,
    openGraph: {
        title: SITE_NAME,
        description,
        type: 'website',
    },
};
