import { useRouter } from 'next/navigation';
import CtaButton from '../cta-button';
import Header from '../header';
import Intro from '../intro';
import { useContext } from 'react';
import { CarouselDispatchContext } from '..';
import React from 'react';

export default React.memo(function Start() {
    const router = useRouter();

    const carouselDispatch = useContext(CarouselDispatchContext);

    return (
        <>
            <Header
                onGoBack={() => {
                    router.push('/');
                }}
            />
            <Intro title="캐릭터 만들기 시작할 거임" />
            <CtaButton
                text="시작"
                onClick={() => {
                    carouselDispatch?.handleNextClick();
                }}
                className="mb-[31px]"
            />
        </>
    );
});
