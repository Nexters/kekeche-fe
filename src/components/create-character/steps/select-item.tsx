import Intro from '../intro';
import React, { useState } from 'react';
import useCarousel from '../hooks/useCarousel';
import FixedBottomArea from '../../fixed-bottom-area/fixed-bottom-area';
import { Items, NO_ITEM_IDX } from '@/constants/character-info';
import CtaButton from '@/components/ui/cta-button';
import { useCreateCharacterContext } from '@/context/create-character-provider';

type ItemId = (typeof Items)[number]['id'];

export function SelectItem() {
    const [selected, setSelected] = useState<null | ItemId>(null);
    const { setValue } = useCreateCharacterContext();
    const { handleNextClick } = useCarousel();

    const handleClick = () => {
        setValue('itemIdx', selected === null ? NO_ITEM_IDX : selected);
        handleNextClick();
    };

    const handleSelect = (id: ItemId) => {
        setSelected((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <div className="h-[52px] w-full" />
            <Intro
                title={
                    <span>
                        <span className="text-[#8B92A0]">{'(선택) '}</span>
                        <span className="text-primary-500">또 다른 나</span>
                        {'의 능력을 올려줄\n아이템을 고르세요.'}
                    </span>
                }
            />
            <div className="flex flex-col gap-[16px]">
                {Items.map(({ id, name }) => (
                    <button
                        onClick={() => handleSelect(id)}
                        key={id}
                        className={`w-[329px] rounded-[16px] px-[24px] py-[20px] text-left text-[16px] font-[500] ${selected === id ? 'bg-primary-500 text-white' : 'bg-[#ECEFF5] text-[#707683]'}`}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <FixedBottomArea className="mb-[31px]">
                <CtaButton text="완료" onClick={handleClick} />
            </FixedBottomArea>
        </>
    );
}
