'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui-shadcn/carousel';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Header from './header';
import Title from './title';
import CreateCharacterProvider from '@/context/create-character-provider';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import SelectShape from './steps/select-shape';

interface CarouselDispatch {
    handlePrevClick: () => void;
    handleNextClick: () => void;
}

export const CarouselDispatchContext = createContext<null | CarouselDispatch>(null);

export default function CreateCharacterFunnel() {
    const searchParams = useSearchParams();
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

    const memoizedCarouselDispatch = useMemo(
        () => ({ handlePrevClick, handleNextClick }),
        [handlePrevClick, handleNextClick],
    );

    useEffect(() => {
        if (!api) return;
        api.on('select', () => {
            setStep(api.selectedScrollSnap() + 1);
        });
        api.on('settle', () => {
            router.push(pathname + `?step=${api?.selectedScrollSnap()}`);
        });
    }, [api]);

    useEffect(() => {
        // 뒤로가기 처리
        api?.scrollTo(Number(searchParams.get('step')) ?? 0, true);
    }, [searchParams]);

    return (
        <>
            <CreateCharacterProvider>
                <CarouselDispatchContext.Provider value={memoizedCarouselDispatch}>
                    <Carousel setApi={setApi} opts={{ watchDrag: false, duration: 10 }}>
                        <CarouselContent>
                            <CarouselItem className="flex w-full flex-col items-center ">
                                <Header onGoBack={() => router.push('/')} />
                                <Title text="캐릭터의 모습을 고르세요" />
                                <SelectShape />
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col items-center">
                                <Header onGoBack={handlePrevClick} />
                                <Title text="캐릭터의 컬러를 고르세요" />
                                <div>1</div> <button onClick={handleNextClick}>다음</button>
                            </CarouselItem>
                            <CarouselItem className="flex w-full flex-col items-center">
                                <Header onGoBack={handlePrevClick} />
                                <Title text="캐릭터의 성격을 고르세요" />
                                <div>2</div> <button onClick={handleNextClick}>다음</button>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </CarouselDispatchContext.Provider>
            </CreateCharacterProvider>
        </>
    );
}
