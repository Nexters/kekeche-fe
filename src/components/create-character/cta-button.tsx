type Props = {
    text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CtaButton({ text, disabled, ...props }: Props) {
    return (
        <button
            {...props}
            className={`h-[56px] w-[343px] rounded-[90px] text-semibold18 text-[#ffffff] ${disabled ? 'bg-[#7D7D7D]' : 'bg-[#606FD8]'}`}
        >
            {text}
        </button>
    );
}
