import { twMerge } from 'tailwind-merge';

type Props = {
    className?: string;
    children: string;
};

export default function Name({ className, children }: Props) {
    return <h3 className={twMerge(' text-black', 'text-H1 ', className)}>{children}</h3>;
}
