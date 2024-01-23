import ArrowLeft from '@/assets/icons/arrow-left_24x24.svg';

type Props = {
    onGoBack?: () => void;
};

export default function Header({ onGoBack }: Props) {
    return (
        <div className="h-[48px] flex justify-center items-center relative w-[327px]">
            <h2 className="text-[16px] font-semibold">캐릭터 생성</h2>
            {onGoBack && (
                <button className="absolute left-0" onClick={onGoBack}>
                    <ArrowLeft />
                </button>
            )}
        </div>
    );
}