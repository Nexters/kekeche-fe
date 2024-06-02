import { useState } from 'react';
import { useSyncedState } from '@/hooks/useSyncedState';

const BubbleTexts = [
    { id: 0, text: '오늘은 어떤 일이 있었나요?' },
    { id: 1, text: '어제보다 나은 오늘의 나!' },
    { id: 2, text: '매일매일 성장하는 나!' },
    { id: 3, text: '오늘도 조금씩 성장해요.' },
    { id: 4, text: '오늘도 수고 많아요!' },
] as const;

type BubbleTextId = (typeof BubbleTexts)[number]['id'];

const getRandomBubbleTextId = () => {
    return Math.floor(Math.random() * BubbleTexts.length) as BubbleTextId;
};

export function useBubble() {
    const [bubbleId, setBubbleId] = useSyncedState<BubbleTextId>(getRandomBubbleTextId, 'initialBubbleId');
    const [disabled, setDisabled] = useState(false);

    const onBubbleChange = () => {
        if (disabled) return;

        setDisabled(true);
        setBubbleId((prev) => {
            let newId = getRandomBubbleTextId();
            while (prev === newId) {
                newId = getRandomBubbleTextId();
            }
            return newId;
        });
        setTimeout(() => {
            setDisabled(false);
        }, 700);
    };

    const bubbleText = BubbleTexts[bubbleId].text;

    return { bubbleText, onBubbleChange, bubbleId };
}
