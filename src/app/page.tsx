import { PageContainer } from '@/components/ui';
import Link from 'next/link';

export default function Home() {
    return (
        <PageContainer hasNavigator>
            <div className="grid flex-1 place-items-center">
                <h1>캐릭캐릭 다이어리🧚‍♀️</h1>
                {/**
                 * pwa용 임시 버튼
                 */}
                <Link href="/create">
                    <button>캐릭터 생성하기</button>
                </Link>
            </div>
        </PageContainer>
    );
}
