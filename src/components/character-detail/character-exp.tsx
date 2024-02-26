'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '../ui-shadcn/dialog';
import { DialogPortal } from '@radix-ui/react-dialog';

type Props = {
    animate?: boolean;
    currentExp: number;
    nextExp: number;
    level: number;
};

export default function CharacterExp({ animate = false, currentExp, nextExp, level }: Props) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [expAnimating, setExpAnimating] = useState(false);

    useEffect(() => {
        if (animate) {
            setTimeout(() => setIsAnimating(true), 800);

            setTimeout(() => setExpAnimating(true), 1500);
            setTimeout(() => setIsAnimating(false), 4000);
            setExpAnimating(false);
        }
    }, [isAnimating, animate, expAnimating, currentExp]);

    if (isAnimating) {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
    } else {
        document.body.style.overflow = 'auto';
    }

    return (
        <>
            {!isAnimating ? (
                <motion.div
                    layoutId="exp"
                    layout
                    className="mt-[20px] flex h-[56px] w-[327px] items-center justify-center gap-[20px] rounded-[16px] bg-white"
                >
                    <span className="text-[16px] font-bold text-primary-500">{`LV.${level}`}</span>
                    <div className="relative h-[24px] w-[233px] overflow-hidden rounded-full bg-newGray-400">
                        <motion.div
                            layout
                            transition={{ delay: 1.5 }}
                            style={{
                                width: animate
                                    ? expAnimating
                                        ? `${(currentExp / nextExp) * 100}%`
                                        : `${((currentExp - 1) / nextExp) * 100}%`
                                    : `${(currentExp / nextExp) * 100}%`,
                            }}
                            className={` left-0 top-0 h-full rounded-full bg-primary-500 `}
                        />
                        <div className="absolute right-[14.4px] top-0 flex h-full items-center">
                            <span className="text-[12px] font-semibold text-white">{`${currentExp}/${nextExp}`}</span>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className="fixed inset-0 left-0 top-0 z-50 h-screen w-screen bg-black/80  ">
                    <div className="mx-auto flex h-full w-auto min-w-[350px] items-center justify-center border-none bg-transparent lg:w-[400px]">
                        <motion.div
                            layoutId="exp"
                            layout
                            className="z-[999] flex h-[66px] w-[327px] items-center justify-center gap-[20px] rounded-[20px]  bg-white"
                        >
                            <span className="text-[16px] font-bold text-primary-500">{`LV.${level}`}</span>
                            <div className="rounded-l-0 relative h-[40px] w-[250px] overflow-hidden rounded-[20px] bg-newGray-400">
                                <motion.div
                                    layout
                                    transition={{ duration: 2, delay: 0.5 }}
                                    style={{
                                        width: expAnimating
                                            ? `${(currentExp / nextExp) * 100}%`
                                            : `${((currentExp - 1) / nextExp) * 100}%`,
                                    }}
                                    className={`rounded-l-0 h-full rounded-[20px] bg-primary-500 `}
                                />
                                <div className="absolute right-[14.4px] top-0 my-auto flex h-full items-center">
                                    <span className="text-[12px] font-semibold text-white">{`${currentExp}/${nextExp}`}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </>
    );
}
