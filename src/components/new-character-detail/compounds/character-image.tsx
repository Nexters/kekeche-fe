import CharacterImageWithItem from '@/components/character-image-with-item';
import { CharacterImageProps } from '@/types/character';
import BubbleText from '../bubble-text';
import { useBubble } from '@/components/character-detail/useBubble';

type Props = Omit<CharacterImageProps, 'size'> & {
    /**
     * 캐릭터 머리 위 말풍선 존재 유무
     */
    hasBubble?: boolean;
};

export default function CharacterImage({ hasBubble: withBubble = false, ...props }: Props) {
    const { onBubbleChange, bubbleText, bubbleId } = useBubble();

    return (
        <>
            {withBubble ? (
                <div onClick={onBubbleChange} className="flex h-auto w-full cursor-pointer flex-col items-center">
                    <BubbleText bubbleId={bubbleId} bubbleText={bubbleText} />
                    <CharacterImageWithItem size="large" {...props} />
                </div>
            ) : (
                <CharacterImageWithItem size="large" {...props} />
            )}
        </>
    );
}
