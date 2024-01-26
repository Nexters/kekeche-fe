import CreateCharacter from '@/components/create-character';
import { PageContainer } from '@/components/ui';

// 로그인 이전에 캐릭터 생성하는 페이지
export default function Page() {
    return (
        <PageContainer>
            <CreateCharacter />
        </PageContainer>
    );
}
