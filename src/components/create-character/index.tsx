'use client';
import { Carousel, CarouselApi, CarouselContent } from '@/components/ui-shadcn/carousel';
import CreateCharacterProvider from '@/context/create-character-provider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import StepContainer from './step-container';
import * as CreateCharacterSteps from './steps';
import { Steps } from './types/steps';
import StepperHeader from './stepper-header';

interface CarouselDispatch {
    handlePrevClick: () => void;
    handleNextClick: () => void;
}

export const CarouselDispatchContext = createContext<null | CarouselDispatch>(null);

const STEPS: readonly React.ReactNode[] = [
    <CreateCharacterSteps.Story key={Steps.Story} />,
    <CreateCharacterSteps.SetName key={Steps.SetName} />,
    <CreateCharacterSteps.SelectShape key={Steps.SelectShape} />,
    <CreateCharacterSteps.SelectColor key={Steps.SelectColor} />,
    <CreateCharacterSteps.SelectKeywords key={Steps.SelectKeywords} />,
    <CreateCharacterSteps.SelectItem key={Steps.SelectItem} />,
    <CreateCharacterSteps.ShowResult key={Steps.ShowResult} />,
    <CreateCharacterSteps.GuideToLogin key={Steps.GuideToLogin} />,
] as const;

export default function CreateCharacter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [api, setApi] = useState<CarouselApi>();

    /**
     * 로그인한 유저는 스토리(step=1)을 건너뛰도록 합니다.
     */
    const startIndex = useMemo(() => (searchParams.get('step') === '1' ? Steps.SetName : Steps.Story), []);

    const handlePrevClick = useCallback(() => {
        if (api?.selectedScrollSnap() === 1) {
            router.push('/');
            return;
        }
        api?.scrollPrev();
    }, [api, router]);
    const handleNextClick = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const memoizedCarouselDispatch = useMemo(
        () => ({ handlePrevClick, handleNextClick }),
        [handlePrevClick, handleNextClick],
    );

    useEffect(() => {
        if (!api) return;

        api.on('select', () => {
            router.push(pathname + `?step=${api.selectedScrollSnap()}`);
        });

        const step = searchParams.get('step') ? Number(searchParams.get('step')) : 0;

        if (step > api.selectedScrollSnap()) {
            // 앞선 과정을 뛰어넘는 것을 방지(ex. 새로고침)
            if (step === 1) {
                api.scrollTo(1, true);
                return;
            }
            router.push(pathname + `?step=${api.selectedScrollSnap()}`);
        }
        if (step < api.selectedScrollSnap()) {
            // 브라우저 상의 뒤로가기 처리
            api.scrollTo(step, true);
        }
    }, [api?.selectedScrollSnap, searchParams, pathname, router, api]);

    return (
        <>
            <CreateCharacterProvider>
                <CarouselDispatchContext.Provider value={memoizedCarouselDispatch}>
                    <Carousel
                        setApi={setApi}
                        opts={{
                            watchDrag: false,
                            dragFree: true,
                            startIndex,
                        }}
                    >
                        <StepperHeader />
                        <CarouselContent
                            style={{
                                height: '100dvh',
                                minHeight: searchParams.get('step') !== '6' ? '660px' : '720px',
                            }}
                            className="m-0 p-0"
                        >
                            {STEPS.map((step, idx) => (
                                <StepContainer key={idx}>{step}</StepContainer>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </CarouselDispatchContext.Provider>
            </CreateCharacterProvider>
        </>
    );
}
