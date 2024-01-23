import CreateCharacterFunnel from '@/components/create-character/create-character-funnel';
import { PageContainer } from '@/components/ui';

// 로그인 이전에 캐릭터 생성하는 페이지
export default function Page() {
    return (
        <>
            <PageContainer>
                <CreateCharacterFunnel />
            </PageContainer>
        </>
    );
}
