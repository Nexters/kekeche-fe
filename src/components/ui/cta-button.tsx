'use client';

type Props = {
    onClick?: () => void;
    text: string;
};

export default function CTAButton({ onClick, text }: Props) {
    return (
        <div className="fixed bottom-0 left-0 flex w-full justify-center pb-[34px] pt-[16px]">
            <button
                className="h-[56px] w-[343px] rounded-[16px] bg-primary-500 text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)]"
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
