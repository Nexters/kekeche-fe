import { GetCharactersResponse } from '@/services/character/getCharacters';
import { LikeButtonWithTooltip, LikeButton } from './like-button';

type Props = {
    isMyPage: boolean;
} & Pick<GetCharactersResponse, 'memberNickname' | 'cheerCount'>;

export function Header({ isMyPage, memberNickname, cheerCount }: Props) {
    const headerText = `${memberNickname}의 도감 `;
    return (
        <header className="flex items-center justify-between py-5 pl-6 pr-7">
            <h1 className="text-bold24 text-[#494E59]">{headerText}</h1>
            {isMyPage ? (
                <LikeButton component="div" cheerCount={cheerCount} />
            ) : (
                <LikeButtonWithTooltip component="button" cheerCount={cheerCount ?? 0} />
            )}
        </header>
    );
}
