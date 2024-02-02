import React from 'react';
import useCarousel from './hooks/useCarousel';

type Props = {
    title: React.ReactNode;
    description?: string;
};

export default function Intro({ title, description }: Props) {
    return (
        <>
            <div className="z-[2] w-[375px]  whitespace-pre-line p-[24px]">
                <h3 className="text-gray-700 text-[24px] font-bold">{title}</h3>
                {description && (
                    <p className="mt-[8px] w-[327px] text-left text-regular16 text-[#6B7180]">{description}</p>
                )}
            </div>
        </>
    );
}
