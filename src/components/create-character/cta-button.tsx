type Props = {
    text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CtaButton({ text, ...props }: Props) {
    return (
        <button {...props} className=" h-[56px] w-[343px] rounded-[12px] bg-[#7d7d7d] text-semibold18 text-[#ffffff]">
            {text}
        </button>
    );
}
