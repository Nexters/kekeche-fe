import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // ✅ turns retries off
            retry: false,
        },
    },
});

export default async (component: any) => {
    const user = userEvent.setup();

    return {
        user,
        ...render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>),
    };
};
