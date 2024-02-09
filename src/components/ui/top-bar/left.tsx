import { twMerge } from 'tailwind-merge';

type Props = {
    className?: string;
    children: React.ReactNode;
};

export default function Left({ className, children }: Props) {
    return <div className={twMerge('absolute left-[12px]', className)}>{children}</div>;
}
