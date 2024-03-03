import { BubbleTexts } from '@/constants/bubble-texts';
import { useState } from 'react';

type BubbleTextId = (typeof BubbleTexts)[number]['id'];

const getRandomBubbleTextId = () => {
    return Math.floor(Math.random() * BubbleTexts.length) as BubbleTextId;
};

export default function useBubbleText() {
    const [bubbleId, setBubbleId] = useState<BubbleTextId>(getRandomBubbleTextId());
    const [disabled, setDisabled] = useState(false);

    const handleSetNewBubble = () => {
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

    return { bubbleId, handleSetNewBubble };
}
