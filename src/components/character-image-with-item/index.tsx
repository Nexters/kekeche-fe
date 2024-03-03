import { cn } from '@/lib/utils-shadcn';
import { CharacterImageProps } from '@/types/character';
import Image from 'next/image';

export default function CharacterImageWithItem({ characterImage, itemImage, className, size }: CharacterImageProps) {
    const sizeVariants: Record<CharacterImageProps['size'], any> = {
        small: { className: 'w-[100px] h-[100px]', width: 100, height: 100 },
        large: { className: 'w-[328px] h-[299px]', width: 328, height: 299 },
    };

    return (
        <div className={cn(`relative`, sizeVariants[size].className, className)}>
            <Image
                priority
                alt="캐릭터 이미지"
                src={characterImage}
                width={sizeVariants[size].width}
                height={sizeVariants[size].height}
                className="absolute left-0 top-0 "
            />
            {itemImage && (
                <Image
                    priority
                    alt="아이템 이미지"
                    src={itemImage}
                    width={sizeVariants[size].width}
                    height={sizeVariants[size].height}
                    className="absolute left-0 top-0"
                />
            )}
        </div>
    );
}
