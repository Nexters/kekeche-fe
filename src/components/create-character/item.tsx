import { CarouselItem } from '../ui-shadcn/carousel';

type Props = {
    children: React.ReactNode;
};

export default function Step({ children }: Props) {
    return <CarouselItem className="flex w-full flex-col items-center">{children}</CarouselItem>;
}
