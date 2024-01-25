type Props={
    text:string;
}

export default function Description({text}:Props){
    return <p className="text-regular16 mt-[8px] w-[327px] text-left text-[#6B7180]">{text}</p>
}