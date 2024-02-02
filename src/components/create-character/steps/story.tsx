'use client';

import React, { useState } from 'react';
import CtaButton from '../cta-button';
import FixedBottomArea from '../fixed-bottom-area';
import Link from 'next/link';
import StoryBox from '../story-box';
import Header from '../header';
import Image from 'next/image';
import HomeBg from '@/assets/images/homeBg.jpg';
import { useRouter } from 'next/navigation';
import useCarousel from '../hooks/useCarousel';

export default React.memo(function Story() {
    const router = useRouter();

    const { handleNextClick } = useCarousel();

    const [storyNum, setStoryNum] = useState<1 | 2>(1);

    return (
        <>
            <Image alt={'홈 배경'} src={HomeBg} fill />
            <Header
                onGoBack={() => {
                    router.push('/');
                }}
            />
            {storyNum === 1 ? (
                <FixedBottomArea className="mb-[31px] gap-[16px]">
                    <StoryBox text={'깊고 깊은 머릿속에 자리잡은 더미공원. \n 이곳에는 다양한 내가 살고 있어요.'} />
                    <CtaButton text="다음" onClick={() => setStoryNum(2)} />
                </FixedBottomArea>
            ) : (
                <FixedBottomArea className="mb-[31px] gap-[16px]">
                    <StoryBox text={'내 안의 다양한 공룡들을 키워서, \n 나의 공룡들과 함께 다같이 레벨업해요.'} />
                    <CtaButton text="다음" onClick={handleNextClick} />
                </FixedBottomArea>
            )}
        </>
    );
});
