'use client';

import CtaButton from '@/components/create-character/cta-button';
import FixedBottomArea from '@/components/create-character/fixed-bottom-area';
import Intro from '@/components/create-character/intro';
import { PageContainer } from '@/components/ui';
import { useToast } from '@/components/ui-shadcn/toast/use-toast';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';
import Modal from '@/components/ui/modal';
import { DialogClose } from '@radix-ui/react-dialog';
import Link from 'next/link';

export default function Home() {
    return (
        <PageContainer>
            <Intro title="자라나용~!" />
            {/**
             * TODO: 로고 추가
             */}
            <Modal
                triggerElement={<button>모달 ㄱ</button>}
                title="모달 테스트중.."
                description="모달이 잘 작동할까요"
                contents={<DialogClose>꺼</DialogClose>}
            />
            <FixedBottomArea className="mb-[31px] gap-[16px]">
                <KakaoLoginButton />
                <Link href="/create">
                    <CtaButton text="시작" />
                </Link>
            </FixedBottomArea>
        </PageContainer>
    );
}
