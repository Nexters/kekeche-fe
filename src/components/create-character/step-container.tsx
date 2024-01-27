import { CarouselItem } from '../ui-shadcn/carousel';

type Props = {
    children: React.ReactNode;
};

export default function StepContainer({ children }: Props) {
    return <CarouselItem className="relative flex w-full flex-col items-center">{children}</CarouselItem>;
}
