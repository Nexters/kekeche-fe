import CharacterImageWithItem from '@/components/character-image-with-item';
import { CharacterImageProps } from '@/types/character';
import useBubbleText from '../hooks/useBubbleText';
import BubbleText from '../bubble-text';

type Props = Omit<CharacterImageProps, 'size'> & {
    /**
     * 캐릭터 머리 위 말풍선 존재 유무
     */
    hasBubble?: boolean;
};

export default function CharacterImage({ hasBubble: withBubble = false, ...props }: Props) {
    const { handleSetNewBubble, bubbleId } = useBubbleText();

    return (
        <>
            {withBubble ? (
                <div onClick={handleSetNewBubble} className="flex h-auto w-full cursor-pointer flex-col items-center">
                    <BubbleText bubbleId={bubbleId} />
                    <CharacterImageWithItem size="large" {...props} />
                </div>
            ) : (
                <CharacterImageWithItem size="large" {...props} />
            )}
        </>
    );
}
