import ActionIcon from '@/assets/icons/meatball_20x20.svg';

export default function Memo() {
    return (
        <div className="h-[296px] w-[327px] rounded-[16px] bg-[#F8F8FB] p-[24px]">
            <div className="flex justify-between">
                <span className="text-regular14 text-[#8E939E]">2023. 01. 26 12: 59 AM</span>
                <div>
                    <ActionIcon />
                </div>
            </div>
        </div>
    );
}
