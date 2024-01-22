type Props = {
    colorId: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ShapeButton({ colorId, onClick }: Props) {
    return (
        <button className="bg-[#F7F8F9] w-[327px] h-[129px] rounded-[16px]" onClick={onClick}>
            {colorId}
        </button>
    );
}
