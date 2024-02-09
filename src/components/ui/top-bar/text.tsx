import { twMerge } from 'tailwind-merge';

type Props = {
    children?: React.ReactNode;
    className?: string;
};

export default function Text({ children, className }: Props) {
    return <h2 className={twMerge(`text-black text-H3`, className)}>{children}</h2>;
}
