'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui-shadcn/carousel';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import CreateCharacterProvider from '@/context/create-character-provider';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SelectShape from './steps/select-shape';
import Start from './steps/start';
import SelectColor from './steps/select-color';
import SetName from './steps/set-name';
import SelectKeywords from './steps/select-keywords';
import SelectItem from './steps/select-item';
import ShowResult from './steps/show-result';
import GuideToLogin from './steps/guide-to-login';
import Login from './steps/login';
import Step from './item';

interface CarouselDispatch {
    handlePrevClick: () => void;
    handleNextClick: () => void;
}

export const CarouselDispatchContext = createContext<null | CarouselDispatch>(null);

export default function CreateCharacter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [api, setApi] = useState<CarouselApi>();

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
                    <Carousel setApi={setApi} opts={{ watchDrag: false, dragFree: true }}>
                        <CarouselContent style={{ minHeight: '100dvh' }}>
                            <Step>
                                <Start />
                            </Step>
                            <Step>
                                <SetName />
                            </Step>
                            <Step>
                                <SelectShape />
                            </Step>
                            <Step>
                                <SelectColor />
                            </Step>
                            <Step>
                                <SelectKeywords />
                            </Step>
                            <Step>
                                <SelectItem />
                            </Step>
                            <Step>
                                <ShowResult />
                            </Step>
                            <Step>
                                <GuideToLogin />
                            </Step>
                            <Step>
                                <Login />
                            </Step>
                        </CarouselContent>
                    </Carousel>
                </CarouselDispatchContext.Provider>
            </CreateCharacterProvider>
        </>
    );
}
