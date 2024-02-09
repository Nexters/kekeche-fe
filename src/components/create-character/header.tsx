import TopBar from '../ui/top-bar';
import ArrowLeft from '@/assets/icons/arrow-left_24x24.svg';

type Props = {
    onGoBack?: () => void;
    withText?: boolean;
};

export default function Header({ onGoBack, withText = true }: Props) {
    return (
        <TopBar>
            <TopBar.Left>
                {onGoBack && (
                    <button className="flex h-full w-[16px] items-center " onClick={onGoBack}>
                        <ArrowLeft />
                    </button>
                )}
            </TopBar.Left>
            <TopBar.Text>{withText && '캐릭터 생성'}</TopBar.Text>
        </TopBar>
    );
}
