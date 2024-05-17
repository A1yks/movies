import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@/styles/global.scss';
import '@/styles/media.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/config/theme';
import { Inter, Poppins } from 'next/font/google';
import { Metadata } from 'next';

const poppins = Poppins({ weight: ['600'], subsets: ['latin'], variable: '--font-poppins' });
const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang='en' className={`${poppins.variable} ${inter.variable}`}>
            <head>
                <ColorSchemeScript />
                <link rel='shortcut icon' href='/favicon.svg' />
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no' />
            </head>
            <body className={inter.className}>
                <MantineProvider theme={theme}>
                    <Notifications />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}

const description = 'Movies and TV shows database';

export const metadata: Metadata = {
    title: {
        template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        default: process.env.NEXT_PUBLIC_SITE_NAME,
    },
    description,
    openGraph: {
        title: process.env.NEXT_PUBLIC_SITE_NAME,
        description,
        type: 'website',
    },
};
