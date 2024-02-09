import { twMerge } from 'tailwind-merge';

type Props = {
    className?: string;
    children: React.ReactNode;
};

export default function Right({ className, children }: Props) {
    return <div className={twMerge('absolute right-[12px]', className)}>{children}</div>;
}
