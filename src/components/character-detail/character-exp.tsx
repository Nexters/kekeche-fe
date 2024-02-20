'use client';

import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '../ui-shadcn/dialog';

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
        }
    }, [isAnimating, animate, expAnimating]);

    return (
        <>
            {!isAnimating && (
                <motion.div
                    layoutId="1"
                    transition={{ duration: 0.8 }}
                    className="mt-[20px] flex h-[56px] w-[327px] items-center justify-center gap-[20px] rounded-[16px] bg-white"
                >
                    <span className="text-[16px] font-bold text-primary-500">{`LV.${level}`}</span>
                    <div className="relative h-[24px] w-[233px] rounded-full bg-newGray-400">
                        <motion.div
                            style={{
                                width: animate
                                    ? expAnimating
                                        ? `${(currentExp / nextExp) * 100}%`
                                        : `${((currentExp - 1) / nextExp) * 100}%`
                                    : `${(currentExp / nextExp) * 100}%`,
                            }}
                            className={`absolute left-0 top-0 h-full rounded-full bg-primary-500 `}
                        />
                        <div className="absolute right-[14.4px] my-auto flex h-full items-center">
                            <span className="text-[12px] font-semibold text-white">{`${currentExp}/${nextExp}`}</span>
                        </div>
                    </div>
                </motion.div>
            )}
            <Dialog open={isAnimating}>
                <DialogOverlay className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
                    <DialogContent className="border-none bg-transparent">
                        <motion.div
                            layoutId="1"
                            className="z-[999]  flex h-[66px] w-[327px] items-center justify-center gap-[20px] rounded-[20px]  bg-white"
                        >
                            <span className="text-[16px] font-bold text-primary-500">{`LV.${level}`}</span>
                            <div className="rounded-l-0 relative h-[40px] w-[250px] rounded-[20px] bg-newGray-400">
                                <motion.div
                                    // { width: `${((currentExp - 1) / nextExp) * 100}%` },
                                    layout
                                    transition={{ duration: 2 }}
                                    style={{
                                        width: expAnimating
                                            ? `${(currentExp / nextExp) * 100}%`
                                            : `${((currentExp - 1) / nextExp) * 100}%`,
                                        borderRadius: '20px',
                                    }}
                                    className={`rounded-l-0 absolute left-0 top-0 h-full rounded-[20px] bg-primary-500 `}
                                />
                                <div className="absolute right-[14.4px] my-auto flex h-full items-center">
                                    <span className="text-[12px] font-semibold text-white">{`${currentExp}/${nextExp}`}</span>
                                </div>
                            </div>
                        </motion.div>
                    </DialogContent>
                </DialogOverlay>
            </Dialog>
        </>
    );
}