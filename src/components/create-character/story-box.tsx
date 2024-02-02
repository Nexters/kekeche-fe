import Badge from '@/assets/images/badgeSm.png';
import Image from 'next/image';

type Props = {
    text: string;
};

export default function StoryBox({ text }: Props) {
    return (
        <div className="relative">
            <Image alt="배지" src={Badge} width={66.5} height={66.5} className="absolute right-0 top-[-49px]" />
            <div className="h-auto w-[343px] rounded-[16px] bg-[#3C3A43] p-[24px] text-regular16 text-gray-100">
                {text}
            </div>
        </div>
    );
}