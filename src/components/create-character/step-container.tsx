import { PropsWithChildren } from 'react';
import { CarouselItem } from '../ui-shadcn/carousel';

export default function StepContainer({ children }: PropsWithChildren) {
    return <CarouselItem className="relative m-0 flex w-full flex-col items-center p-0">{children}</CarouselItem>;
}
