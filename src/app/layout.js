'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import ThemeProvider from '../providers/ThemeProvider';
import { AppProvider } from '../store/AppContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <title>Outreach App</title>
        <meta name="description" content="Aplikacja do linkbuildingu i outreach" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}