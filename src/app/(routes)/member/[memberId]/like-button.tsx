'use client';

import HeartFilled from '@/assets/icons/heart_filled_20x20.svg';
import HeartLottie from '@/assets/lottie/heart.json';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui-shadcn/tooltip';
import IncreaseCheerCount from '@/services/member/increaseCheerCount';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
interface Props {
    cheerCount: number;
    component: 'div' | 'button';
}

export function LikeButtonWithTooltip({ cheerCount, component }: Props) {
    return (
        <TooltipProvider>
            <Tooltip defaultOpen>
                <TooltipTrigger asChild>
                    <div>
                        <LikeButton component={component} cheerCount={cheerCount} />
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

export function LikeButton({ cheerCount, component = 'div' }: Props) {
    const [count, setCount] = useState(cheerCount);
    const { memberId } = useParams();
    const [lottieStart, setLottieStart] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (lottieStart) {
            timeoutId = setTimeout(() => {
                setLottieStart(false);
            }, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [lottieStart]);

    const countNumberMinWidth = () => {
        const baseWidth = 20;
        const perDigitIncrement = 10;
        const digitCount = count.toString().length;

        return `${baseWidth + perDigitIncrement * (digitCount - 1)}px`;
    };

    const handleLikeClick = async () => {
        setCount((prev) => prev + 1);
        setLottieStart(true);
        await IncreaseCheerCount({ accessToken: `${getCookie('accessToken')}`, memberId: +memberId });
    };

    const layoutClassNames = 'flex h-[35px]  min-w-[35px] items-center gap-1 rounded-full bg-[#DBE0EA] px-[10px]';

    const content = (
        <>
            <HeartFilled />
            <span
                style={{
                    minWidth: countNumberMinWidth(),
                }}
                className="flex-1 text-semibold18 text-[#2777EA]"
            >
                {count}
            </span>
            <Lottie
                options={{
                    loop: false,
                    autoplay: false,
                    animationData: HeartLottie,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                    },
                }}
                height={'auto'}
                width={'auto'}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 10000,
                }}
                isStopped={lottieStart}
            />
        </>
    );

    if (component === 'button') {
        return (
            <>
                <button onClick={handleLikeClick} aria-label="좋아요 버튼" className={layoutClassNames}>
                    {content}
                </button>
            </>
        );
    }
    return (
        <div aria-label="좋아요 버튼" className={layoutClassNames}>
            {content}
        </div>
    );
}
