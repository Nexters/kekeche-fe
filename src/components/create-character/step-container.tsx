import { CarouselItem } from '../ui-shadcn/carousel';

type Props = {
    children: React.ReactNode;
};

export default function StepContainer({ children }: Props) {
    return <CarouselItem className="relative m-0 flex w-full flex-col items-center p-0">{children}</CarouselItem>;
}
