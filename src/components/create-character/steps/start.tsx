import { useRouter } from 'next/navigation';
import CtaButton from '../cta-button';
import Header from '../header';
import Intro from '../intro';
import React from 'react';
import useCarousel from '../hooks/useCarousel';
import FixedBottomArea from '../fixed-bottom-area';

export default React.memo(function Start() {
    const { handleNextClick, handlePrevClick } = useCarousel();

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title="캐릭터 만들기 시작할 거임" />
            <FixedBottomArea className="mb-[31px]">
                <CtaButton text="가자" onClick={handleNextClick} />
            </FixedBottomArea>
        </>
    );
});
