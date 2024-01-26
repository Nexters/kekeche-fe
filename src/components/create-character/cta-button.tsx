type Props = {
    text: string;
    className?: string;
    children?: React.ReactNode;
    onClick: () => void;
};

export default function CtaButton({ text, className, children, onClick }: Props) {
    return (
        <div className={`fixed bottom-0 flex h-[auto] w-[375px] flex-col items-center pt-[16px] ${className}`}>
            <button
                onClick={onClick}
                className=" h-[56px] w-[343px] rounded-[12px] bg-[#7d7d7d] text-semibold18 text-[#ffffff]"
            >
                {text}
            </button>
            {children}
        </div>
    );
}
