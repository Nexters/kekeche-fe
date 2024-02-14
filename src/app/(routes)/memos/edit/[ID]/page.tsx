import { PageContainer } from '@/components/ui';
import CookieManager from '@/lib/utils-cookie';
import getMember from '@/services/auth/getMember';
import getCharactersThumbnail from '@/services/character/getCharactersThumbnail';
import { redirect } from 'next/navigation';
import CreateMemoProvider from './create-memo-context';
import Header from './header';
import KeywordForm from './keyword-form';
import MemoForm from './memo-form';

export default async function MemoEdit({ params: { ID } }: { params: { ID: number } }) {
    const accessToken = CookieManager.getServerAccessToken();
    const member = await getMember({ accessToken });

    if (!member) {
        throw new Error('네트워크 통신이 원활하지 않습니다.');
    }
    if (!accessToken) {
        redirect('/');
    }

    const charactersThumbnailResponse = await getCharactersThumbnail({ accessToken });

    return (
        <PageContainer>
            <CreateMemoProvider>
                <Header />
                <MemoForm characters={charactersThumbnailResponse ?? []} />
                <div className="mt-2 h-[12px] bg-[#F7F8F9]" />
                <KeywordForm />
            </CreateMemoProvider>
        </PageContainer>
    );
}
