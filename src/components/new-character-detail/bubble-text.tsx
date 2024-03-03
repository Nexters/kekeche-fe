import Polygon from '@/assets/icons/polygon.svg';
import { BubbleTexts } from '@/constants/bubble-texts';
import { AnimationProps, AnimatePresence, motion } from 'framer-motion';

const animationProps: AnimationProps = {
    initial: { y: 50, scale: 0.2 },
    animate: { y: 0, scale: 1 },
    exit: { y: -30, z: -50, opacity: 0.2, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
};

type Props = {
    bubbleId: number;
};

export default function BubbleText({ bubbleId }: Props) {
    return (
        <>
            <AnimatePresence initial={true} mode="wait">
                <motion.div
                    {...animationProps}
                    key={bubbleId}
                    className="mb-[-10px] mt-[12px] flex flex h-[73px] w-full flex-col items-center justify-center p-[8px]"
                >
                    <div className="w-auto rounded-[8px] bg-primary-500 px-[16px] py-[10px] text-[14px] font-[600] text-white">
                        {BubbleTexts[bubbleId].text}
                    </div>
                    <Polygon />
                </motion.div>
            </AnimatePresence>
        </>
    );
}
