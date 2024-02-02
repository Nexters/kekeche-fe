import React from 'react';
import Header from '../header';
import useCarousel from '../hooks/useCarousel';
import Intro from '../intro';
import FixedBottomArea from '../fixed-bottom-area';
import Image from 'next/image';
import HomeBg from '@/assets/images/homeBg.jpg';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';

export default React.memo(function GuideToLogin() {
    const { handlePrevClick } = useCarousel();

    return (
        <>
            <Image alt="배경" src={HomeBg} fill className="opacity-50" />
            <Header onGoBack={handlePrevClick} withText={false} />
            <Intro title={'캐릭터에 기록을 남기러 가보아요.'} description="저희가 기록을 안전하게 보관해 드릴게요." />
            <FixedBottomArea className="mb-[31px]">
                <KakaoLoginButton callbackUrl={process.env.NEXT_PUBLIC_REDIRECT_FROM_CREATE_CHARACTER_URL as string} />
            </FixedBottomArea>
        </>
    );
});
