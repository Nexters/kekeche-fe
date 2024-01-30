import ActionIcon from '@/assets/icons/meatball_20x20.svg';

export default function Memo() {
    return (
        <div className="flex h-auto w-[327px] flex-col gap-[12px] rounded-[16px] bg-[#F8F8FB] p-[24px]">
            <div className="flex justify-between ">
                <span className="text-regular14 text-[#8E939E]">2023. 01. 26 12: 59 AM</span>
                <button>
                    <ActionIcon />
                </button>
            </div>
            <p className="text-regular16 leading-[24px] text-[#4B4F58]">
                오늘은 학교에서 안 졸고 딴짓도 안 하면서 교수님 강의록 열심히 봤다. #잘한일 근데 그러고 나니 너무
                피곤해서 여자휴게실에서 그냥 뻣어버렸다. #지쳤어요땡벌
            </p>
        </div>
    );
}
