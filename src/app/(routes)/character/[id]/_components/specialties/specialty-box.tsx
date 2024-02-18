import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function SpecialtyBox({ children, className }: Props) {
    return (
        <div
            className={twMerge(
                'h-[48px] w-[296px] rounded-[12px] border border-newGray-200 bg-newGray-100 px-[16px] py-[12px]',
                className,
            )}
        >
            {children}
        </div>
    );
}
