import Badge from '@/assets/images/badgeSm.png';
import Image from 'next/image';

type Props = {
    text: string;
};

export default function StoryBox({ text }: Props) {
    return (
        <div className="relative">
            <div className="h-auto w-[343px] whitespace-pre-line rounded-[16px] bg-[#3C3A43] p-[24px] text-regular16 text-gray-100 opacity-80">
                {text}
            </div>
            <Image
                quality={100}
                alt="배지"
                src={Badge}
                width={66.5}
                height={66.5}
                className="absolute right-0 top-[-49px]"
            />
        </div>
    );
}
