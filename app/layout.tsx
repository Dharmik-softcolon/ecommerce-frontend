// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: {
        default: 'LUXE - Premium Clothing',
        template: '%s | LUXE',
    },
    description: 'Discover premium clothing for the modern individual. Crafted with care, designed for life.',
    keywords: ['clothing', 'fashion', 'premium', 'luxury', 'menswear', 'womenswear'],
    authors: [{ name: 'LUXE' }],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://luxe.com',
        siteName: 'LUXE',
        images: [
            {
                url: '/images/og-default.jpg',
                width: 1200,
                height: 630,
                alt: 'LUXE - Premium Clothing',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@luxe',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <body className="font-body antialiased">
        <Providers>
            <Header />
            {children}
            <Footer />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        border: '1px solid hsl(var(--border))',
                    },
                }}
            />
        </Providers>
        </body>
        </html>
    );
}
