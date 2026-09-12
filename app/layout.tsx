import React from 'react';
import './globals.css';
import { Providers } from './provider';

export const metadata = {
  title: 'VELORA — Modern Fashion & Everyday Luxury',
  description: 'Quiet luxury fashion, travel capsules, and architectural tailoring for Men, Women, and Junior.',
  keywords: 'luxury fashion, travel capsule, quiet luxury, atelier, bespoke clothing',
  openGraph: {
    title: 'VELORA — Modern Fashion & Everyday Luxury',
    description: 'Quiet luxury fashion, travel capsules, and architectural tailoring.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
