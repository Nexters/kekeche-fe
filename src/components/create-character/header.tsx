import ArrowLeft from '@/assets/icons/arrow-left_24x24.svg';

type Props = {
    onGoBack?: () => void;
    withText?: boolean;
};

export default function Header({ onGoBack, withText = true }: Props) {
    return (
        <div className="fixed relative left-0 top-0 flex h-[48px] w-[327px] w-full items-center justify-center">
            {withText && <h2 className="text-gray-700 text-semibold18">캐릭터 생성</h2>}
            {onGoBack && (
                <button className="absolute left-[12px]" onClick={onGoBack}>
                    <ArrowLeft />
                </button>
            )}
        </div>
    );
}
