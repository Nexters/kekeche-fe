type Props = {
    title: string;
    description?:string;
};

export default function Intro({ title,description }: Props) {
    return (
        <div className="w-[375px] p-[24px]">
            <h3 className="font-bold text-[24px]">{title}</h3>
            {description && <p className="text-regular16 mt-[8px] w-[327px] text-left text-[#6B7180]">{description}</p>}
        </div>
    );
}
