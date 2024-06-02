'use client';

import { checkIsLoggedIn } from '@/services/auth/getMember';
import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export async function AuthProvider() {
    async function handleAuth() {
        const { isLoggedIn } = await checkIsLoggedIn({ accessToken: `${getCookie('accessToken')}` });
        if (!isLoggedIn) redirect('/');
    }

    useLayoutEffect(() => {
        handleAuth();
    });

    return <></>;
}
