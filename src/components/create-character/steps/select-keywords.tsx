import Header from '../header';
import Intro from '../intro';
import React from 'react';
import CtaButton from '../cta-button';
import useCarousel from '../hooks/useCarousel';
import FixedBottomArea from '../fixed-bottom-area';

export default React.memo(function SelectKeywords() {
    const { handlePrevClick, handleNextClick } = useCarousel();

    return (
        <>
            <Header onGoBack={handlePrevClick} />
            <Intro title="캐릭터의 성격을 고르세요" />
            <FixedBottomArea className="mb-[31px]">
                <CtaButton text="다음" onClick={handleNextClick} />
            </FixedBottomArea>
        </>
    );
});
