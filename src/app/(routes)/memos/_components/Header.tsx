type Props = {
    text: string;
};

export function Header({ text }: Props) {
    return (
        <section className="w-full px-[24px] py-[8px] text-[24px] font-[700] leading-[32px] text-[#2E2E36]">
            {text}
        </section>
    );
}
