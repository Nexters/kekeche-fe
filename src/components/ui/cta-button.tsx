'use client';

type Props = {
    text?: string;
    children?: React.ReactNode;
    shadow?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CTAButton({ children, text, shadow = true, disabled, ...props }: Props) {
    return (
        <button
            {...props}
            className={`h-[56px] w-[343px] rounded-[16px] text-[18px] font-[600] text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] ${disabled ? 'bg-[#7D7D7D]' : ' bg-primary-500'}`}
        >
            {text}
            {children}
        </button>
    );
}
