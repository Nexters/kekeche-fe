'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui-shadcn/carousel';
import { useEffect, useLayoutEffect, useState } from 'react';
import Header from './header';
import Title from './title';
import CreateCharacterProvider from '@/context/create-character-provider';
import SelectShape from './select-shape/select-shape';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function CreateCharacterFunnel() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [api, setApi] = useState<CarouselApi>();

    const [step, setStep] = useState(0);

    const handlePrevClick = () => {
        api?.scrollPrev();
    };
    const handleNextClick = () => {
        api?.scrollNext();
    };

    useEffect(() => {
        if (!api) return;
        api.on('select', () => {
            setStep(api.selectedScrollSnap() + 1);
        });
        api.on('settle', () => {
            router.push(pathname + `?step=${api?.selectedScrollSnap()}`);
        });
    }, [api]);

    console.log(api?.scrollProgress());

    useEffect(() => {}, [api?.selectedScrollSnap()]);

    useEffect(() => {
        // 뒤로가기 처리
        api?.scrollTo(Number(searchParams.get('step')) ?? 0, true);
    }, [searchParams]);

    // console.log(pathname);
    // 문제: 뒤로가기 클릭 시,

    return (
        <>
            <CreateCharacterProvider>
                <Carousel setApi={setApi} opts={{ watchDrag: false, duration: 10 }}>
                    <CarouselContent>
                        <CarouselItem className="w-full flex flex-col items-center ">
                            <Header onGoBack={() => router.push('/')} />
                            <Title text="캐릭터의 모습을 고르세요" />
                            <SelectShape />
                            <button onClick={handleNextClick}>다음</button>
                        </CarouselItem>
                        <CarouselItem className="w-full flex flex-col items-center">
                            <Header onGoBack={handlePrevClick} />
                            <Title text="캐릭터의 컬러를 고르세요" />
                            <div>1</div> <button onClick={handleNextClick}>다음</button>
                        </CarouselItem>
                        <CarouselItem className="w-full flex flex-col items-center">
                            <Header onGoBack={handlePrevClick} />
                            <Title text="캐릭터의 성격을 고르세요" />
                            <div>2</div> <button onClick={handleNextClick}>다음</button>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </CreateCharacterProvider>
        </>
    );
}
