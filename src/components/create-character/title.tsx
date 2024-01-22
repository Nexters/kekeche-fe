type Props = {
    text: string;
};

export default function Title({ text }: Props) {
    return (
        <div className="w-[375px] p-[24px]">
            <h3 className="font-bold text-[24px]">{text}</h3>
        </div>
    );
}
