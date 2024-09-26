'use client';

import { getQueryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: PropsWithChildren) {
    const queryClient = getQueryClient();

    return (
        <NextThemesProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </NextThemesProvider>
    );
}
