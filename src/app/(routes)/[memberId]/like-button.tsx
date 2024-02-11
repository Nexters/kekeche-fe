'use client';

import HeartFilled from '@/assets/icons/heart_filled_20x20.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui-shadcn/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { useState } from 'react';

export function LikeButtonWithTooltip() {
    return (
        <TooltipProvider>
            <Tooltip defaultOpen>
                <TooltipTrigger asChild>
                    <div>
                        <LikeButton />
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    alignOffset={-10}
                    sideOffset={4}
                    align="end"
                    className="rounded-none bg-transparent p-0"
                >
                    <p className="rounded-2xl bg-[#2777ea] px-4 py-2 text-semibold14 text-white">
                        하트를 눌러 응원해주세요!
                    </p>
                    <TooltipArrow width={12} height={10} fill="#2777ea" />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function LikeButton() {
    const [count, setCount] = useState(0);

    const countNumberMinWidth = () => {
        const baseWidth = 20;
        const perDigitIncrement = 10;
        const digitCount = count.toString().length;

        return `${baseWidth + perDigitIncrement * (digitCount - 1)}px`;
    };

    const handleLikeClick = () => {
        setCount((prev) => prev + 1);
    };

    return (
        <button
            onClick={handleLikeClick}
            aria-label="좋아요 버튼"
            className="flex h-[35px]  min-w-[35px] items-center gap-1 rounded-full bg-[#DBE0EA] px-[10px]"
        >
            <HeartFilled />
            <span
                style={{
                    minWidth: countNumberMinWidth(),
                }}
                className="flex-1 text-semibold18 text-[#2777EA]"
            >
                {count}
            </span>
        </button>
    );
}
