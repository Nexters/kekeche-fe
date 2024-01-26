type Props = {
    title: string;
    description?: string;
};

export default function Intro({ title, description }: Props) {
    return (
        <div className="w-[375px] p-[24px]">
            <h3 className="text-[24px] font-bold">{title}</h3>
            {description && <p className="mt-[8px] w-[327px] text-left text-regular16 text-[#6B7180]">{description}</p>}
        </div>
    );
}
