import { PageContainer } from '@/components/ui';
import CookieManager from '@/lib/utils-cookie';
import getMember from '@/services/auth/getMember';
import getCharacters from '@/services/character/getCharacters';
import { redirect } from 'next/navigation';
import CreateMemoProvider from './create-memo-context';

export default async function MemoCreate() {
    const accessToken = CookieManager.getServerAccessToken();
    const member = await getMember({ accessToken });

    if (!member) {
        redirect('/');
    }

    const characters = await getCharacters({ memberId: Number(member.memberId), accessToken });

    return (
        <PageContainer>
            <CreateMemoProvider>form</CreateMemoProvider>
        </PageContainer>
    );
}
