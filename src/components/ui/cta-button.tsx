'use client';

type Props = {
    text?: string;
    children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CTAButton({ children, text, disabled, ...props }: Props) {
    return (
        <button
            {...props}
            className={`h-[56px] w-[343px] rounded-[16px] text-[18px] font-[600] text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)]  ${disabled ? 'bg-[#7D7D7D] shadow-none active:shadow-none ' : ' bg-primary-500 active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]'}`}
        >
            {text}
            {children}
        </button>
    );
}
