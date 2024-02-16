import { checkIsLoggedIn } from '@/services/auth/getMember';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function MemosLayout({ children }: PropsWithChildren) {
    const { isLoggedIn } = await checkIsLoggedIn({ accessToken: `${cookies().get('accessToken')?.value}` });
    if (!isLoggedIn) redirect('/');

    return <>{children}</>;
}
