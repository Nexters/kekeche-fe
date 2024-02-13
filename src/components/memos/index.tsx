import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Memos({ children, className }: Props) {
    return (
        <section className={twMerge('mx-auto w-full pb-11', className)}>
            <div className="flex w-full flex-col items-center gap-[16px] px-[24px] ">{children}</div>
        </section>
    );
}
