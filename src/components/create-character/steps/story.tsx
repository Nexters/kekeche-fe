'use client';

import HomeBg from '@/assets/images/homeBg.jpg';
import CtaButton from '@/components/ui/cta-button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import FixedBottomArea from '../../fixed-bottom-area/fixed-bottom-area';
import Header from '../header';
import Badge from '@/assets/images/badgeSm.png';
import Story1 from '@/assets/images/story-1.webp';
import Story2 from '@/assets/images/story-2.webp';
import Story3 from '@/assets/images/story-3.webp';
import Link from 'next/link';

export function Story() {
    const router = useRouter();

    const [storyNum, setStoryNum] = useState<1 | 2 | 3>(1);

    return (
        <>
            <Image quality={100} alt={'홈 배경'} src={HomeBg} fill />
            <Header
                onGoBack={() => {
                    router.push('/');
                }}
                withText={false}
            />
            {storyNum === 1 ? (
                <>
                    <FixedBottomArea className="mb-[31px] gap-[16px]">
                        <Image height={400} width={280} priority alt={'1'} src={Story1} className="z-[2] mt-[10px]" />
                        <StoryBox text={'내 안의 다양한 공룡들을 키워서, 나의 공룡들과\n함께 다같이 레벨업해요'} />
                        <CtaButton text="다음" onClick={() => setStoryNum(2)} />
                    </FixedBottomArea>
                </>
            ) : storyNum === 2 ? (
                <>
                    <FixedBottomArea className="mb-[31px] gap-[16px]">
                        <Image height={400} width={280} priority alt={'2'} src={Story2} className="z-[2] mt-[10px]" />
                        <StoryBox text={'키우고 싶은 능력을 주특기로 설정해요'} />
                        <CtaButton text="다음" onClick={() => setStoryNum(3)} />
                    </FixedBottomArea>
                </>
            ) : (
                storyNum === 3 && (
                    <>
                        <FixedBottomArea className="mb-[31px] gap-[16px]">
                            <Image
                                height={400}
                                width={193}
                                priority
                                alt={'3'}
                                src={Story3}
                                className="z-[2] mt-[10px]"
                            />
                            <StoryBox
                                text={
                                    '캐릭터에게 그 날의 일기 메모를 먹이로 줄 수 있어요. 메모는 하루에 3개까지 쓸 수 있어요.'
                                }
                            />
                            <CtaButton as={Link} text="다음" href="/create?step=1" />
                        </FixedBottomArea>
                    </>
                )
            )}
        </>
    );
}

type Props = {
    text: string;
};

export default function StoryBox({ text }: Props) {
    return (
        <div className="relative">
            <div className="h-auto w-[343px] whitespace-pre-line rounded-[16px] bg-[#3C3A43] p-[24px] text-regular16 text-gray-100 opacity-80">
                {text}
            </div>
            <Image
                quality={100}
                alt="배지"
                src={Badge}
                width={66.5}
                height={66.5}
                className="absolute right-0 top-[-49px]"
            />
        </div>
    );
}
