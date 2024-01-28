import CtaButton from '@/components/create-character/cta-button';
import FixedBottomArea from '@/components/create-character/fixed-bottom-area';
import Intro from '@/components/create-character/intro';
import { PageContainer } from '@/components/ui';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';
import Link from 'next/link';

export default function Home() {
    return (
        <PageContainer>
            <Intro title="자라나용~!" />
            {/**
             * TODO: 로고 추가
             */}
            <FixedBottomArea className="mb-[31px] gap-[16px]">
                <KakaoLoginButton />
                <Link href="/create">
                    <CtaButton text="시작" />
                </Link>
            </FixedBottomArea>
        </PageContainer>
    );
}
