type Props = {
    text: string;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CtaButton({ text, className, ...props }: Props) {
    return (
        <div className={`absolute bottom-0 flex h-[56px] w-screen flex-col items-center ${className}`}>
            <button
                className="text-semibold18 fixed h-[56px] w-[343px] rounded-[12px] bg-[#7d7d7d] text-[#ffffff]"
                {...props}
            >
                {text}
            </button>
        </div>
    );
}
