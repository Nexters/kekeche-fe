'use client';
import { Carousel, CarouselApi, CarouselContent } from '@/components/ui-shadcn/carousel';
import CreateCharacterProvider from '@/context/create-character-provider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import StepContainer from './step-container';
import GuideToLogin from './steps/guide-to-login';
import SelectColor from './steps/select-color';
import SelectItem from './steps/select-item';
import SelectKeywords from './steps/select-keywords';
import SelectShape from './steps/select-shape';
import SetName from './steps/set-name';
import ShowResult from './steps/show-result';
import Story from './steps/story';
import { Steps } from './types/steps';

interface CarouselDispatch {
    handlePrevClick: () => void;
    handleNextClick: () => void;
}

export const CarouselDispatchContext = createContext<null | CarouselDispatch>(null);

const STEPS: React.ReactNode[] = [
    <Story key={Steps.Story} />,
    <SetName key={Steps.SetName} />,
    <SelectShape key={Steps.SelectShape} />,
    <SelectColor key={Steps.SelectColor} />,
    <SelectKeywords key={Steps.SelectKeywords} />,
    <SelectItem key={Steps.SelectItem} />,
    <ShowResult key={Steps.ShowResult} />,
    <GuideToLogin key={Steps.GuideToLogin} />,
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
        api?.scrollPrev();
    }, [api]);
    const handleNextClick = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const memoizedCarouselDispatch = useMemo(
        () => ({ handlePrevClick, handleNextClick }),
        [handlePrevClick, handleNextClick],
    );

    useEffect(() => {
        if (!api) return;

        //     setStep(api.selectedScrollSnap() + 1);
        // });
        api.on('select', () => {
            router.push(pathname + `?step=${api.selectedScrollSnap()}`);
        });

        const step = searchParams.get('step') ? Number(searchParams.get('step')) : 0;

        if (step > api.selectedScrollSnap()) {
            // 앞선 과정을 뛰어넘는 것을 방지(ex. 새로고침)

            router.push(pathname + `?step=${api.selectedScrollSnap()}`);
        }
        if (step < api.selectedScrollSnap()) {
            // 브라우저 상의 뒤로가기 처리
            api.scrollTo(step, true);
        }
    }, [api?.selectedScrollSnap(), searchParams, pathname, router, api]);

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
                        <CarouselContent style={{ minHeight: '100dvh' }}>
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
