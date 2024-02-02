import ArrowLeft from '@/assets/icons/arrow-left_24x24.svg';

type Props = {
    onGoBack?: () => void;
};

export default function Header({ onGoBack }: Props) {
    return (
        <div className="fixed relative left-0 top-0 flex h-[48px] w-[327px] w-full items-center justify-center">
            <h2 className="text-[16px] font-semibold">캐릭터 생성</h2>
            {onGoBack && (
                <button className="absolute left-[12px]" onClick={onGoBack}>
                    <ArrowLeft />
                </button>
            )}
        </div>
    );
}
