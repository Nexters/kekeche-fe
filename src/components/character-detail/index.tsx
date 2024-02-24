import { Keywords } from '@/constants/character-info';
import { Character } from '@/types/character';
import Image from 'next/image';
import { forwardRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CharacterExp from './character-exp';
import CharacterImage from './character-image';

type Props = {
    className?: string;
    character: Character;
    hasBubble?: boolean;
};

const CharacterDetail = forwardRef<HTMLDivElement, Props>(({ character, className, hasBubble = false }, ref) => {
    const { name, keywords, characterImage, currentExp, nextExp, level, itemImage } = character;
    const isExpUP = useSearchParams().get('exp') === 'true';
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isExpUP) {
            router.replace(pathname.split('?')[0]);
        }
    }, [isExpUP, router, pathname]);

    return (
        <div ref={ref} className={twMerge('flex h-auto w-full flex-col items-center', className)}>
            <h3 className="text-H1 text-black">{name}</h3>
            <ul className="mt-[6px] flex gap-[4px]">
                {keywords.map((keywordIdx) => (
                    <li
                        className={twMerge(
                            'rounded-[8px] px-[12px] py-[4px] text-[12px] font-[500]',
                            Keywords[keywordIdx].colorClassname,
                        )}
                        key={keywordIdx}
                    >
                        {Keywords[keywordIdx].name}
                    </li>
                ))}
            </ul>
            <CharacterImage itemImage={itemImage} characterImage={characterImage} hasBubble={hasBubble} />
            {/* <div className="relative h-[299px] w-[328px]">
                <Image
                    quality={100}
                    priority
                    alt="캐릭터 이미지"
                    src={characterImage}
                    width={328}
                    height={299}
                    className="absolute left-0 top-0"
                />
                {itemImage && (
                    <Image
                        quality={100}
                        priority
                        alt="아이템 이미지"
                        src={itemImage}
                        width={328}
                        height={299}
                        className="absolute left-0 top-0"
                    />
                )}
            </div> */}
            <CharacterExp
                animate={isExpUP && currentExp !== 0}
                currentExp={currentExp}
                nextExp={nextExp}
                level={level}
            />
        </div>
    );
});
CharacterDetail.displayName = 'CharacterDetail';

export default CharacterDetail;
