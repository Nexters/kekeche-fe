import { PropsWithChildren } from 'react';
import { CarouselItem } from '../ui-shadcn/carousel';

export default function StepContainer({ children }: PropsWithChildren) {
    return (
        <CarouselItem className="relative m-0 flex h-auto w-full flex-col items-center pl-0 pr-0 pt-0">
            {children}
        </CarouselItem>
    );
}
