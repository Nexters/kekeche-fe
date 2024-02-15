'use client';

type Props = {
    onClick?: () => void;
    text: string | React.ReactNode;
    shadow?: boolean;
};

export default function CTAButton({ onClick, text, shadow = true }: Props) {
    return (
        <button
            className={`h-[56px] w-[343px] rounded-[16px] bg-primary-500 text-[18px] font-[600] text-white ${shadow && 'shadow-[0_0_4px_0_rgba(0,0,0,0.25)]'}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
