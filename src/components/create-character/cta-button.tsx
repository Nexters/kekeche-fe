type Props = {
    text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CtaButton({ text, ...props }: Props) {
    return (
        <button {...props} className=" h-[56px] w-[343px] rounded-[90px] bg-[#606FD8] text-semibold18 text-[#ffffff]">
            {text}
        </button>
    );
}
