export const dynamic = 'force-dynamic';

import CreateCharacter from '@/components/create-character';
import PageContainerV2 from '@/components/page-container-v2/page-container-v2';

// 로그인 이전에 캐릭터 생성하는 페이지
export default async function Page() {
    return (
        <PageContainerV2>
            <CreateCharacter />
        </PageContainerV2>
    );
}
