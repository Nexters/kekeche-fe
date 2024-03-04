import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    focused?: boolean;
    children: React.ReactNode;
    className?: string;
};

export default function SpecialtyBox({ children, className, focused }: Props) {
    return (
        <div
            className={twMerge(
                `h-[48px] w-[296px] rounded-[12px] border border-newGray-200 bg-newGray-100 px-[16px] py-[12px] ${focused && 'outline outline-primary-500'}`,
                className,
            )}
        >
            {children}
        </div>
    );
}
