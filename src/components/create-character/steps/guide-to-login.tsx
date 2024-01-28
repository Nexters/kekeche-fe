import React from 'react';
import Header from '../header';
import useCarousel from '../hooks/useCarousel';
import Intro from '../intro';
import CtaButton from '../cta-button';
import FixedBottomArea from '../fixed-bottom-area';

export default React.memo(function GuideToLogin() {
    const { handlePrevClick, handleNextClick } = useCarousel();

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro
                title={'앗, 캐릭터에 기록을 남기려면 \n 로그인 해야 해요'}
                description="저희가 기록을 안전하게 보관해 드릴게요"
            />
            <FixedBottomArea className="mb-[31px]">
                <CtaButton text="다음" onClick={handleNextClick} />
            </FixedBottomArea>
        </>
    );
});
