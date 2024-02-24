import { BubbleTexts } from '@/constants/bubble-texts';
import { Character } from '@/types/character';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Polygon from '@/assets/icons/polygon.svg';
import { AnimatePresence, AnimationProps, motion } from 'framer-motion';

interface Props extends Pick<Character, 'characterImage' | 'itemImage'> {
    hasBubble?: boolean;
}

type BubbleTextId = (typeof BubbleTexts)[number]['id'];

const animationProps: AnimationProps = {
    initial: { y: 50, scale: 0.2 },
    animate: { y: 0, scale: 1 },
    exit: { y: -30, z: -50, opacity: 0.2, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
};

const getRandomBubbleTextId = () => {
    return Math.floor(Math.random() * BubbleTexts.length) as BubbleTextId;
};

export default function CharacterImage({ characterImage, itemImage, hasBubble = false }: Props) {
    const [bubbleId, setBubbleId] = useState<BubbleTextId>(getRandomBubbleTextId());
    const [disabled, setDisabled] = useState(false);

    const handleSetNewBubble = () => {
        if (disabled) return;

        setDisabled(true);
        setBubbleId((prev) => {
            let newId = getRandomBubbleTextId();
            while (prev === newId) {
                newId = getRandomBubbleTextId();
            }
            return newId;
        });
        setTimeout(() => {
            setDisabled(false);
        }, 700);
    };

    return (
        <div className="flex h-auto w-full flex-col items-center">
            <AnimatePresence initial={false} mode="wait">
                {hasBubble && (
                    <motion.div
                        {...animationProps}
                        key={bubbleId}
                        className="mb-[-10px] mt-[12px] flex flex h-[73px] w-full flex-col items-center justify-center p-[8px] "
                    >
                        <div className=" w-auto rounded-[8px] bg-primary-500 px-[16px] py-[10px] text-[14px] font-[600] text-white">
                            {BubbleTexts[bubbleId].text}
                        </div>
                        <Polygon />
                    </motion.div>
                )}
            </AnimatePresence>
            <div onClick={handleSetNewBubble} className="relative h-[299px] w-[328px] cursor-pointer">
                <Image
                    quality={100}
                    priority
                    alt="캐릭터 이미지"
                    src={characterImage}
                    width={328}
                    height={299}
                    className="absolute left-0 top-0 "
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
            </div>
        </div>
    );
}
