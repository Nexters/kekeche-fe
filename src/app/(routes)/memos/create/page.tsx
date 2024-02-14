import { PageContainer } from '@/components/ui';
import CookieManager from '@/lib/utils-cookie';
import getMember from '@/services/auth/getMember';
import getCharactersThumbnail from '@/services/character/getCharactersThumbnail';
import CreateMemoProvider from './create-memo-context';
import Header from './header';
import KeywordForm from './keyword-form';
import MemoForm from './memo-form';
import NoCharacter from './no-character';
import NoCharacterHeader from './no-character-header';

export default async function MemoCreate() {
    const accessToken = CookieManager.getServerAccessToken();
    const member = await getMember({ accessToken });

    if (!member) {
        throw new Error('네트워크 통신이 원활하지 않습니다.');
    }

    const charactersThumbnailResponse = await getCharactersThumbnail({ accessToken });

    if (charactersThumbnailResponse?.length === 0) {
        return (
            <PageContainer>
                <NoCharacterHeader />
                <NoCharacter />
            </PageContainer>
        );
    }

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
