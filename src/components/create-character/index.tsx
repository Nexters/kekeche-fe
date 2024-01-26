'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui-shadcn/carousel';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import CreateCharacterProvider from '@/context/create-character-provider';
import { useRouter, usePathname } from 'next/navigation';
import SelectShape from './steps/select-shape';
import Start from './steps/start';
import SelectColor from './steps/select-color';
import SetName from './steps/set-name';
import SelectKeywords from './steps/select-keywords';
import SelectItem from './steps/select-item';
import ShowResult from './steps/show-result';
import GuideToLogin from './steps/guide-to-login';

interface CarouselDispatch {
    handlePrevClick: () => void;
    handleNextClick: () => void;
    restart: () => void;
}

export const CarouselDispatchContext = createContext<null | CarouselDispatch>(null);

export default function CreateCharacterFunnel() {
    const router = useRouter();
    const pathname = usePathname();

    const [api, setApi] = useState<CarouselApi>();

    const [step, setStep] = useState(0);

    const handlePrevClick = useCallback(() => {
        api?.scrollPrev();
    }, [api]);
    const handleNextClick = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const restart = useCallback(() => {
        api?.scrollTo(0);
    }, [api]);

    const memoizedCarouselDispatch = useMemo(
        () => ({ handlePrevClick, handleNextClick, restart }),
        [handlePrevClick, handleNextClick, restart],
    );

    useEffect(() => {
        if (!api) return;
        // api.on('select', () => {
        //     setStep(api.selectedScrollSnap() + 1);
        // });
        api.on('scroll', () => {
            router.push(pathname + `?step=${api?.selectedScrollSnap()}`);
        });
    }, [api?.selectedScrollSnap()]);

    // useEffect(() => {
    //     // 뒤로가기 처리
    //     api?.scrollTo(Number(searchParams.get('step')) ?? 0);
    // }, [searchParams]);

    return (
        <>
            <CreateCharacterProvider>
                <CarouselDispatchContext.Provider value={memoizedCarouselDispatch}>
                    <Carousel setApi={setApi} opts={{ watchDrag: false }}>
                        <CarouselContent style={{ minHeight: '100dvh' }}>
                            <CarouselItem className="relative flex w-full flex-col items-center">
                                <Start />
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col ">
                                <SetName />
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col items-center ">
                                <SelectShape />
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col items-center">
                                <SelectColor />
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col items-center">
                                <SelectKeywords />
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col items-center">
                                <SelectItem />
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col items-center">
                                <ShowResult />
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col items-center">
                                <GuideToLogin />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </CarouselDispatchContext.Provider>
            </CreateCharacterProvider>
        </>
    );
}
